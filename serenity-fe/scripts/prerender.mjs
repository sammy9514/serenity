// vite builds one index.html for every route, so a crawler that does not run
// javascript sees the same empty shell everywhere. this writes a real html file
// per apartment after the build: correct title, description, canonical, preview
// image, structured data, and the copy itself inside <noscript>.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const SITE = "https://serenityspaceluxuryhomes.com";
const API = process.env.VITE_API_URL ?? "https://api.serenityspaceluxuryhomes.com";
const DIST = "dist";

const escape = (text = "") =>
  String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const wide = (url = "") =>
  url.replace(
    "/image/upload/",
    "/image/upload/c_fill,g_auto,w_1200,h_630,f_jpg,q_auto/",
  );

// prettier splits meta tags across lines, so match the attribute first and
// then the content that belongs to it, whitespace and newlines included
const setMeta = (html, attr, key, value) => {
  const tag = new RegExp(
    `(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`,
    "s",
  );
  return tag.test(html) ? html.replace(tag, `$1${escape(value)}$2`) : html;
};

const setTitle = (html, value) =>
  html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(value)}</title>`);

const setCanonical = (html, value) =>
  html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/s, `$1${value}$2`);

const pageFor = (shell, listing) => {
  const url = `${SITE}/apartments/${listing.slug}`;
  const title = `${listing.name} · Serenity Space Luxury Homes`;
  const description =
    listing.summary ?? listing.description?.[0]?.slice(0, 160) ?? "";
  const image = wide(listing.photos?.[0]?.url ?? "");

  let html = setTitle(shell, title);
  html = setCanonical(html, url);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "property", "og:title", listing.name);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", listing.name);
  html = setMeta(html, "name", "twitter:description", description);
  if (image) {
    html = setMeta(html, "property", "og:image", image);
    html = setMeta(html, "name", "twitter:image", image);
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    name: listing.name,
    description,
    url,
    image: image || undefined,
    numberOfBedrooms: listing.bedrooms,
    occupancy: { "@type": "QuantitativeValue", maxValue: listing.sleeps },
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.address?.town ?? "Northfleet",
      postalCode: listing.address?.postcode,
      addressRegion: "Kent",
      addressCountry: "GB",
    },
    offers: {
      "@type": "Offer",
      price: listing.pricePerNight,
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
    },
  };

  // what a crawler without javascript actually reads
  const fallback = `<noscript>
      <h1>${escape(listing.name)}</h1>
      <p>${escape(description)}</p>
      ${(listing.description ?? []).map((p) => `<p>${escape(p)}</p>`).join("\n      ")}
      <p>From £${listing.pricePerNight} per night, sleeps ${listing.sleeps}, ${listing.bedrooms} bedrooms, ${listing.bathrooms} bathrooms.</p>
      <p>${escape([listing.address?.town, listing.address?.postcode].filter(Boolean).join(", "))}</p>
    </noscript>`;

  return html
    .replace(
      "</head>",
      `  <script type="application/ld+json">${JSON.stringify(schema)}</script>\n  </head>`,
    )
    .replace('<div id="root"></div>', `<div id="root"></div>\n    ${fallback}`);
};

const run = async () => {
  let listings;
  try {
    const res = await fetch(`${API}/api/v1/listings`);
    if (!res.ok) throw new Error(`api responded ${res.status}`);
    listings = (await res.json()).data;
  } catch (error) {
    // never fail the build over this: the spa still works, it is just less
    // legible to crawlers
    console.warn(`prerender skipped: ${error.message}`);
    return;
  }

  const shell = await readFile(join(DIST, "index.html"), "utf8");

  for (const listing of listings) {
    const dir = join(DIST, "apartments", listing.slug);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, "index.html"), pageFor(shell, listing));
    console.log(`prerendered /apartments/${listing.slug}`);
  }
};

run();

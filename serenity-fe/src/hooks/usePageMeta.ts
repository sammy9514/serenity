import { useEffect } from "react";

const SITE = "https://serenityspaceluxuryhomes.com";

const setTag = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

// the html file ships one title and one canonical for every route, which tells
// google each apartment page is a duplicate of the home page. each page calls
// this to correct the record once it knows what it is showing.
export const usePageMeta = (meta: {
  title: string;
  description?: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}) => {
  const { title, description, path, image, noIndex } = meta;

  useEffect(() => {
    document.title = title;
    setTag('meta[property="og:title"]', "content", title);

    if (description) {
      setTag('meta[name="description"]', "content", description);
      setTag('meta[property="og:description"]', "content", description);
    }

    const url = `${SITE}${path}`;
    setTag('link[rel="canonical"]', "href", url);
    setTag('meta[property="og:url"]', "content", url);

    if (image) {
      setTag('meta[property="og:image"]', "content", image);
      setTag('meta[name="twitter:image"]', "content", image);
    }

    let robots = document.head.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute(
      "content",
      noIndex ? "noindex, nofollow" : "index, follow",
    );
  }, [title, description, path, image, noIndex]);
};

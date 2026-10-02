const Footer = () => {
  return (
    <footer id="contact" className="mt-20 scroll-mt-28 bg-ink text-cream">
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-8 flex-col gap-4 md:flex-row">
        <div className="flex flex-col ">
          <span className="text-sm md:text-xl tracking-widest">
            Serenity Space Luxury Homes
          </span>
          <span className="text-xs tracking-widest text-line">
            London ·{" "}
            <a
              href="mailto:info@serenityspaceluxuryhomes.com"
              className="underline underline-offset-4"
            >
              info@serenityspaceluxuryhomes.com
            </a>{" "}
            ·{" "}
            <a
              href="tel:+447700900000"
              className="underline underline-offset-4"
            >
              +44 7700 900000
            </a>
          </span>
        </div>
        <nav className="flex gap-5 text-taupe text-xs md:text-sm">
          <a
            href="https://www.instagram.com/serenity_space_luxury_homes/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cream"
          >
            Instagram
          </a>
          <a href="/#apartments" className="hover:text-cream">
            Apartments
          </a>
          <a
            href="mailto:info@serenityspaceluxuryhomes.com"
            className="hover:text-cream"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

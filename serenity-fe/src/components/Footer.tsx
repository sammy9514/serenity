const Footer = () => {
  return (
    <footer className="mt-20 bg-ink text-cream">
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-8 flex-col gap-4 md:flex-row">
        <div className="flex flex-col ">
          <span className="text-sm md:text-xl tracking-widest">
            Serenity Space Luxury Homes
          </span>
          <span className="text-xs tracking-widest text-line">
            London · Info@serenityspaceluxuryhomes.com · 077........
          </span>
        </div>
        <nav className="flex gap-5 text-taupe text-xs md:text-sm">
          <a href="#">Instagram</a>
          <a href="#">House Rules</a>
          <a href="#">Privacy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

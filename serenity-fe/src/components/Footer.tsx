const Footer = () => {
  return (
    <div className="mt-20 bg-ink text-cream font-body">
      <div className="mx-auto flex h-25 max-w-page items-center justify-between px-6">
        <div className="flex flex-col ">
          <h1 className="text-xl tracking-widest">
            Serenity Space Luxury Homes
          </h1>
          <h4 className="text-xs tracking-widest text-line">
            London·Email·Phone
          </h4>
        </div>
        <nav className="flex gap-5 text-taupe text-sm">
          <a href="#">Instagram</a>
          <a href="#">House Rules</a>
          <a href="#">Privacy</a>
        </nav>
      </div>
    </div>
  );
};

export default Footer;

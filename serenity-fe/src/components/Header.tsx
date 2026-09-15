const Header = () => {
  return (
    <div className="bg-ink text-cream font-body">
      <div className="mx-auto flex h-25 max-w-page items-center justify-between px-6">
        <div className="flex flex-col ">
          <h1 className="text-2xl tracking-widest">Serenity Space</h1>
          <h4 className="text-xs tracking-widest text-line">LUXURY HOMES</h4>
        </div>
        <nav className="flex gap-10 ">
          <a href="#">The Apartment</a>
          <a href="#">Amenities</a>
          <a href="#">Location</a>
          <a href="#">Contact</a>
        </nav>

        <button className="py-4 px-8 bg-taupe text-black font-medium ">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Header;

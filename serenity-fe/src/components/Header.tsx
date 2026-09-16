import { useState } from "react";
import Button from "./Button";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  const [menuOpen, setmenuOpen] = useState<boolean>(false);
  return (
    <header className="bg-ink text-cream relative">
      <div className="mx-auto flex h-25 max-w-page items-center justify-between px-6">
        <a href="/" className="flex flex-col ">
          <span className="text-2xl tracking-widest">Serenity Space</span>
          <span className="text-xs tracking-widest text-line">
            Luxury Homes
          </span>
        </a>
        <nav className="md:flex gap-10 hidden ">
          <a href="#">The Apartment</a>
          <a href="#">Amenities</a>
          <a href="#">Location</a>
          <a href="#">Contact</a>
        </nav>
        <div className="hidden md:block">
          <Button variant="onDark">Book Now</Button>
        </div>

        <button
          className="text-taupe text-3xl md:hidden"
          aria-label="Open-Menu"
          aria-expanded={menuOpen}
          onClick={() => setmenuOpen(!menuOpen)}
        >
          <RxHamburgerMenu />
        </button>
      </div>
      {menuOpen && (
        <nav className="flex flex-col md:hidden items-center gap-6 pb-6 ">
          <a href="#">The Apartment</a>
          <a href="#">Amenities</a>
          <a href="#">Location</a>
          <a href="#">Contact</a>
          <Button variant="onDark">Book Now</Button>
        </nav>
      )}
    </header>
  );
};

export default Header;

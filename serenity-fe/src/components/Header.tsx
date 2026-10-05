import { useState } from "react";
import { Link } from "react-router";
import Button from "./Button";
import { RxHamburgerMenu } from "react-icons/rx";

const links = [
  { label: "Apartments", href: "/#apartments" },
  { label: "Things to do", href: "/#things-to-do" },
  { label: "Contact", href: "/#contact" },
];

const Header = () => {
  const [menuOpen, setmenuOpen] = useState<boolean>(false);
  return (
    <header className="bg-ink text-cream relative">
      <div className="mx-auto flex h-25 max-w-page items-center justify-between px-6">
        <Link to="/" className="flex flex-col">
          <span className="text-2xl tracking-widest">Serenity Space</span>
          <span className="text-xs tracking-widest text-line">
            Luxury Homes
          </span>
        </Link>
        <nav className="hidden gap-10 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-taupe">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button variant="onDark" href="/#apartments">
            Book now
          </Button>
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
        <nav className="flex flex-col items-center gap-6 pb-6 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setmenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button variant="onDark" href="/#apartments">
            Book now
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;

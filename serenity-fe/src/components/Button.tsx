import { Link } from "react-router";

type Variant = "primary" | "secondary" | "onDark";

type Props = {
  variant?: Variant;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  /** renders a react-router Link instead of a button */
  to?: string;
  /** renders a plain anchor, for same-page anchors and external links */
  href?: string;
};

const variants: Record<Variant, string> = {
  primary: "bg-ink text-cream",
  secondary: "border border-ink text-ink",
  onDark: "bg-taupe text-ink",
};

const base =
  "inline-flex items-center justify-center gap-3 px-8 py-4 text-center font-medium disabled:opacity-50";

const Button = ({
  variant = "primary",
  children,
  type = "button",
  disabled = false,
  onClick,
  to,
  href,
}: Props) => {
  const className = `${base} ${variants[variant]}`;

  if (to)
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );

  if (href)
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );

  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

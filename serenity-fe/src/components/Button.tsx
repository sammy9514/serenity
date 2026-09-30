type Variant = "primary" | "secondary" | "onDark";

type Props = {
  variant?: Variant;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

const variants: Record<Variant, string> = {
  primary: "bg-ink text-cream",
  secondary: "border border-ink text-ink flex gap-3 items-center",
  onDark: "bg-taupe text-ink",
};
const Button = ({
  variant = "primary",
  children,
  type = "button",
  disabled = false,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`py-4 px-8 font-medium ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

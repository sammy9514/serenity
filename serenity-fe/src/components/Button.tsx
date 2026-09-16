type Variant = "primary" | "secondary" | "onDark";

type Props = {
  variant?: Variant;
  children: React.ReactNode;
};

const variants: Record<Variant, string> = {
  primary: "bg-ink text-cream",
  secondary: "border border-ink text-ink",
  onDark: "bg-taupe text-ink",
};
const Button = ({ variant = "primary", children }: Props) => {
  return (
    <button className={`py-4 px-8 font-medium ${variants[variant]} `}>
      {children}
    </button>
  );
};

export default Button;

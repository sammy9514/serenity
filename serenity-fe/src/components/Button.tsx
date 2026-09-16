type props = {
  variant: "primary" | "secondary";
  children: React.ReactNode;
};

const Button = ({ variant = "primary", children }: props) => {
  const styles =
    variant === "primary" ? "bg-ink text-cream" : "border border-ink text-ink";
  return (
    <button className={`py-4 px-8 font-medium ${styles} `}>{children}</button>
  );
};

export default Button;

import type { ReactNode } from "react";
import { ArrowLink } from "./ArrowLink";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "inverse" | "ghost";
  icon?: boolean;
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  onClick,
}: ButtonProps) {
  const tone = variant === "inverse" || variant === "ghost" ? "dark" : "light";

  return (
    <ArrowLink
      href={href}
      tone={tone}
      className={className}
      external={external}
      onClick={onClick}
    >
      {children}
    </ArrowLink>
  );
}

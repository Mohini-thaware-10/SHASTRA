import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "light"
  | "outline-light";

export type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type LinkButtonProps = ButtonBaseProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type NativeButtonProps = ButtonBaseProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(115deg,#2b234c_0%,#362b5e_48%,#4a3b8f_100%)] text-white shadow-[0_18px_40px_-20px_rgba(36,30,61,0.75)] hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-20px_rgba(64,51,138,0.72)] active:translate-y-0",
  secondary:
    "border border-line-strong bg-white/70 text-ink backdrop-blur-sm hover:-translate-y-0.5 hover:border-violet/35 hover:bg-white active:translate-y-0",
  ghost: "text-ink-soft hover:bg-ink/[0.045] hover:text-ink",
  light:
    "bg-white text-plum shadow-[0_18px_36px_-22px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 hover:bg-cream active:translate-y-0",
  "outline-light":
    "border border-white/20 bg-white/[0.06] text-white hover:border-white/35 hover:bg-white/[0.12]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 gap-2 px-4 text-[0.8125rem]",
  md: "h-12 gap-2.5 px-5 text-sm",
  lg: "h-14 gap-3 px-6 text-[0.95rem] sm:px-7",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "right",
    fullWidth = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "group inline-flex select-none items-center justify-center rounded-full font-semibold tracking-[-0.01em] transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet-strong disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {icon && iconPosition === "left" ? (
        <span className="shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? (
        <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      ) : null}
    </>
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorProps } = rest;

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}

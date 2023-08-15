import { cn } from "@/utility/cn";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import React from "react";

const buttonVariants = cva("activate:scale-95 inline-flex items-center", {
  variants: {
    intent: {
      primary: ["bg-blue-500", "text-white"],
      secondary: ["bg-white", "text-gray-800"],
      red: ["bg-red-600"],
      blue: ["bg-blue-600"],
      cyan: ["bg-cyan-600"],
    },
    variant: {
      default: ["hover:bg-slate-700"],
      outline: [
        "bg-transparent",
        "border",
        "border-slate-200",
        "hover:bg-amber-100",
        "light:border-amber-700",
        "light:text-slate-100",
        "dark:bg-cyan-700",
        "dark:border-slate-700",
        "dark:text-slate-100",
        "dark:hover:bg-cyan-500",
      ],
      link: ["bg-transparent", "text-slate-900", "underline-offset-4", "hover:underline", "dark:text-slate-300"],
    },
    size: {
      default: ["h-10", "py-2", "px-4"],
      sm: ["h-9", "px-2", "rounded-md"],
      md: ["h-10", "px-5", "rounded-md"],
      lg: ["h-11", "px-8", "rounded-md"],
    },
  },
  compoundVariants: [
    {
      intent: "primary",
      size: "sm",
      className: "uppercase",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, variant, size, intent, ...props }, ref) => {
    if (href) {
      return (
        <Link href={href}>
          <button className={cn(buttonVariants({ intent, variant, size, className }))} {...props}>
            {children}
          </button>
        </Link>
      );
    } else {
      return (
        <button className={cn(buttonVariants({ intent, variant, size, className }))} ref={ref} {...props}>
          {children}
        </button>
      );
    }
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

import { cn } from "@/utility/cn";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const buttonVariants = cva("activate:scale-95 inline-flex items-center", {
  variants: {
    intent: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-white text-gray-800",
    },
    variant: {
      default: "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900",
      destructive: "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
      outline: `bg-transparent border border-slate-200 
        hover:bg-amber-100
        light:border-amber-700 light:text-slate-100 
        dark:bg-cyan-700 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-cyan-500
        `,
      subtle: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
      ghost:
        "bg-transparent dark:bg-transparent dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
      link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-300 hover:bg-transparent dark:hover:bg-transparent",
    },
    size: {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-2 rounded-md",
      md: "h-10 px-5 rounded-md",
      lg: "h-11 px-8 rounded-md",
    },
  },
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
  ({ className, children, href, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

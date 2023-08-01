import { cn } from "@/utility/cn";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const columnVariants = cva("flex flex-col", {
  variants: {
    intent: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-white text-gray-800",
    },
    variant: {
      default: "",
      screen: "w-screen",
    },
    size: {
      default: "",
      w_half: "w-1/2",
      w_full: "w-full",
      h_half: "h-1/2",
      h_full: "h-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ColumnProps extends React.ObjectHTMLAttributes<HTMLDivElement>, VariantProps<typeof columnVariants> {}

const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  ({ className, children, variant, size, ...props }, ref) => {
    return (
      <div className={cn(columnVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
Column.displayName = "Column";

export { Column, columnVariants };

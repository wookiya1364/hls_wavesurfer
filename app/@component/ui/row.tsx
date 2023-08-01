import { cn } from "@/utility/cn";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const rowVariants = cva("flex flex-row", {
  variants: {
    intent: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-white text-gray-800",
    },
    variant: {
      default: "",
      screen: "h-screen",
    },
    size: {
      default: "",
      half: "w-1/2",
      full: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface RowProps extends React.ObjectHTMLAttributes<HTMLDivElement>, VariantProps<typeof rowVariants> {}

const Row = React.forwardRef<HTMLDivElement, RowProps>(({ className, children, variant, size, ...props }, ref) => {
  return (
    <div className={cn(rowVariants({ variant, size, className }))} ref={ref} {...props}>
      {children}
    </div>
  );
});
Row.displayName = "Row";

export { Row, rowVariants };

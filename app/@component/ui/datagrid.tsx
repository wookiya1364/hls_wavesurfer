import { cn } from "@/utility/cn";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const datagridVariants = cva("flex flex-col", {
  variants: {
    variant: {
      default: "",
      screen: "w-screen",
      h_20: "h-20vh",
      h_80: "h-80vh",
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

export interface DatagridProps
  extends React.ObjectHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof datagridVariants> {
  datalist: Array<any>;
  datanames: Array<string>;
  render: "bar" | "grid";
}

const Datagrid = React.forwardRef<HTMLDivElement, DatagridProps>(
  ({ className, variant, size, datalist, datanames, render, ...props }, ref) => {
    if (render === "bar") {
      return (
        <article className={cn(datagridVariants({ variant, size, className }))} ref={ref} {...props}>
          {datalist.map((item: any, idx: number) => {
            return (
              <div className='datagrid-bar' key={idx}>
                {datanames.map((name: any, nameIdx: number) => {
                  return (
                    <div key={nameIdx} className='flex min-w-100px h-20 bg-zinc-600 justify-center items-center'>
                      {item[name]}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </article>
      );
    } else if (render === "grid") {
    }
  }
);
Datagrid.displayName = "Datagrid";

export { Datagrid, datagridVariants };

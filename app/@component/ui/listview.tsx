"use client";
import { cn } from "@/utility/cn";
import { VariantProps, cva } from "class-variance-authority";
import React, { useEffect } from "react";
import { Column } from "./column";

const listVariants = cva("flex", {
  variants: {
    variant: {
      default: "",
      row: "flex-row",
      column: "flex-col",
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

const ObserverComponent = ({ datalist, datanames }: { datalist: Array<any>; datanames: Array<string> }) => {
  new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    console.log(datalist);
    console.log(datanames);
    entries.forEach((entry: IntersectionObserverEntry) => {
      // const list = document.querySelector(".list") as HTMLDivElement;
      // const listEnd = document.querySelector(".list-end") as HTMLPreElement;
      // const listCount = list.childElementCount - 2;
      // const loopDiv = document.querySelectorAll(".loop-div");
      // const loopLastChild = loopDiv[loopDiv.length - 1] as HTMLDivElement;
      // // 타겟 요소와 루트 요소가 교차하면
      // if (entry.isIntersecting) {
      // }
    });
  }, {});
  console.log(datalist);
  console.log(datanames);
  return (
    <Column className='w-full'>
      {datalist.map((item: any, idx: number) => {
        return (
          <article key={idx}>
            {datanames.map((name: any, nameIdx: number) => {
              return <div key={nameIdx}>{item[datanames[nameIdx]]}</div>;
            })}
          </article>
        );
      })}
    </Column>
  );
};

export interface ListProps extends React.ObjectHTMLAttributes<HTMLDivElement>, VariantProps<typeof listVariants> {
  datalist: Array<any>;
  datanames: Array<string>;
  id: string;
}

const ListView = React.forwardRef<HTMLDivElement, ListProps>(
  ({ className, children, variant, size, datalist, datanames, id, ...props }, ref) => {
    return (
      <article>
        <div className={cn(listVariants({ variant, size, className }))} ref={ref} {...props}>
          <p className={`${id}_list-start`}></p>
          <ObserverComponent datalist={datalist} datanames={datanames}></ObserverComponent>
          <p className={`${id}_list-end`}></p>
        </div>
      </article>
    );
  }
);
ListView.displayName = "ListView";

export { ListView, listVariants };

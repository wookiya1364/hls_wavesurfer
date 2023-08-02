"use client";
import { cn } from "@/utility/cn";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC, useEffect, useRef } from "react";
import { Column } from "./column";
import { Datagrid } from "./datagrid";

const listVariants = cva("flex overflow-auto", {
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

const ObserverComponent = ({
  datalist,
  datanames,
  observerRef,
  observerStartRef,
  observerEndRef,
}: {
  datalist: Array<any>;
  datanames: Array<string>;
  observerRef: React.RefObject<HTMLDivElement>;
  observerStartRef: React.RefObject<HTMLDivElement>;
  observerEndRef: React.RefObject<HTMLDivElement>;
}) => {
  const datagridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observerOptions = {
      root: observerRef.current,
      rootMargin: "0px 0px 50px 0px",
      threshold: 0.5,
      // rootMargin: "200px",
      // threshold: 0.1,
    };
    // console.log(observerOptions);
    // console.log(observerStartRef);
    // console.log(observerEndRef);
    const endObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          // const listview = observerRef.current;
          // const listviewCount = listview?.childElementCount;
          const listviewEnd = observerEndRef.current;
          const datagridCount = datagridRef.current?.childElementCount;
          if (entry.isIntersecting) {
            console.log(listviewEnd, datagridCount);
          }
          // const list = document.querySelector(".list") as HTMLDivElement;
          // const listEnd = document.querySelector(".list-end") as HTMLPreElement;
          // const listCount = list.childElementCount - 2;
          // const loopDiv = document.querySelectorAll(".loop-div");
          // const loopLastChild = loopDiv[loopDiv.length - 1] as HTMLDivElement;
          // // 타겟 요소와 루트 요소가 교차하면
          // if (entry.isIntersecting) {
          // }
        });
      },
      observerOptions
    );

    endObserver.observe(observerEndRef.current as Element);
  }, [datalist, datanames, observerEndRef, observerRef, observerStartRef]);

  return (
    <Column size={"w_full"} variant={"pad"}>
      <Datagrid ref={datagridRef} render='bar' datalist={datalist} datanames={datanames}></Datagrid>
    </Column>
  );
};

export interface ListProps extends React.ObjectHTMLAttributes<HTMLDivElement>, VariantProps<typeof listVariants> {
  datalist: Array<any>;
  datanames: Array<string>;
  id: string;
}

const ListView: FC<ListProps> = ({ className, children, variant, size, datalist, datanames, id, ...props }) => {
  const listviewRef = useRef<HTMLDivElement>(null);
  const listviewStartRef = useRef<HTMLDivElement>(null);
  const listviewEndRef = useRef<HTMLDivElement>(null);
  return (
    <section className={cn(listVariants({ variant, size, className }))} ref={listviewRef} {...props}>
      <p ref={listviewStartRef} className={`${id}_list-start`}></p>
      <ObserverComponent
        datalist={datalist}
        datanames={datanames}
        observerRef={listviewRef}
        observerStartRef={listviewStartRef}
        observerEndRef={listviewEndRef}
      ></ObserverComponent>
      <p ref={listviewEndRef} className={`${id}_list-end`}></p>
    </section>
  );
};

ListView.displayName = "ListView";

export { ListView, listVariants };

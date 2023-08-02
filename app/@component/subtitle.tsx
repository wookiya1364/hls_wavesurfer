"use client";

import { useEffect, useRef } from "react";
import { Column } from "./ui/column";
import { ListView } from "./ui/listview";

export default function SubtitleComponent({ subtitle }: { subtitle: typeSubtitle[] }) {
  return (
    <Column variant={"screen"} size={"w_full"}>
      <ListView
        variant={"column"}
        size={"full"}
        id={"subtitle"}
        datalist={subtitle}
        datanames={["index", "start", "end", "content"]}
      />
    </Column>
  );
}

"use client";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export default function TestTube() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div>
      <button onClick={reactToPrintFn}>Print</button>
      <div ref={contentRef}>Content to print</div>
    </div>
  );
}

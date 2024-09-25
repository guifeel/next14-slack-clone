import { useEffect, useRef } from "react";

import Quill, { type QuillOptions } from "quill";
import "quill/dist/quill.snow.css";

const Editor = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
    };

    new Quill(editorContainer, options);
    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-300 rounded-md overflow-hidden bg-white focus-within:border-slate-300 focus-within:shadow-sm transition">
        <div ref={containerRef} />
      </div>
    </div>
  );
};

export default Editor;

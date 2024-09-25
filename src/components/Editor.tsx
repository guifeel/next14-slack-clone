import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import Quill, { type QuillOptions } from "quill";
import "quill/dist/quill.snow.css";

import { ImageIcon, Smile } from "lucide-react";
import { MdSend } from "react-icons/md";
import { PiTextAa } from "react-icons/pi";
import Hint from "./Hint";

interface EditorProps {
  variant?: "create" | "update";
}

const Editor = ({ variant = "create" }: EditorProps) => {
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
        <div ref={containerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-[5]">
          <Hint label="隐藏/显示">
            <Button
              disabled={false}
              size="iconSm"
              variant="ghost"
              onClick={() => {}}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <Hint label="表情">
            <Button
              disabled={false}
              size="iconSm"
              variant="ghost"
              onClick={() => {}}
            >
              <Smile className="size-4" />
            </Button>
          </Hint>
          {variant === "create" && (
            <Hint label="图片">
              <Button
                disabled={false}
                size="iconSm"
                variant="ghost"
                onClick={() => {}}
              >
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          )}

          {variant === "create" && (
            <Button
              disabled={false}
              size="iconSm"
              onClick={() => {}}
              className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
            >
              <MdSend className="size-4" />
            </Button>
          )}
          {variant === "update" && (
            <div className="ml-auto flex items-center justify-center gap-x-2">
              <Button
                variant="outline"
                disabled={false}
                size="sm"
                onClick={() => {}}
              >
                取消
              </Button>
              <Button
                disabled={false}
                size="sm"
                onClick={() => {}}
                className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                保存
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <p>
          <strong>Shift + Enter</strong> 进行换行操作
        </p>
      </div>
    </div>
  );
};

export default Editor;

import cn from "clsx";
import { Position } from "@/App";
import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import "./Note.css";

type Color = {
  nav: string;
  body: string;
};

export default function Note({
  color,
  body,
  position,
  setIsShown,
  onSuccess,
  onCancel,
}: {
  color: Color;
  body: string;
  position: Position;
  setIsShown: () => void;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const target = useRef(null);
  let initialX = null;
  let initialY = null;
  const mouseMove = (e) => {
    if (target.current) {
      const x = e.clientX - initialX;
      const y = e.clientY - initialY;
      console.log({ x, y });
      target.current.style.left = x + "px";
      target.current.style.top = y + "px";
    }
  };
  const mouseUp = (e) => {
    document.body.removeEventListener("mousemove", mouseMove);
    document.body.removeEventListener("mouseup", mouseMove);
  };
  const mouseDown = (e) => {
    const elms = document.querySelectorAll(".zIndex");
    elms.forEach((elm) => elm.classList.remove("zIndex"));
    if (target.current) {
      target.current.classList.add("zIndex");
      const rect = target.current.getBoundingClientRect();
      initialX = e.clientX - rect.x;
      initialY = e.clientY - rect.y;
    }
    document.body.addEventListener("mousemove", mouseMove);
    document.body.addEventListener("mouseup", mouseUp);
  };
  return (
    <>
      <div ref={target} className={cn("w-96 absolute")} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
        <div className={cn("flex rounded-t-sm px-4 py-2.5", [color.nav])} onMouseDown={mouseDown}>
          <button className="cursor-pointer" onClick={() => setIsShown(true)}>
            <Trash2 className="pointer-events-none" />
          </button>
        </div>
        <div contentEditable className={cn("rounded-b-sm p-4 outline-0", [color.body])}>
          {body}
        </div>
      </div>
    </>
  );
}

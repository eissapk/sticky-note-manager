import cn from "clsx";
import { Position } from "@/App";
import { Trash2 } from "lucide-react";
import { useRef } from "react";
import "./Note.css";

type Color = {
  nav: string;
  body: string;
};

export default function Note({ id, color, body, position, onDelete }: { id: number; color: Color; body: string; position: Position; onDelete: (id: number) => void }) {
  const target = useRef(null);
  let initialX: null | number = null;
  let initialY: null | number = null;

  const mouseMove = (e: any) => {
    if (target.current && initialX && initialY) {
      const x = e.clientX - initialX;
      const y = e.clientY - initialY;
      // console.log({ x, y });
      // @ts-expect-error -- todo
      target.current.style.left = x + "px";
      // @ts-expect-error -- todo
      target.current.style.top = y + "px";
    }
  };

  const mouseUp = () => {
    document.body.removeEventListener("mousemove", mouseMove);
    document.body.removeEventListener("mouseup", mouseMove);
  };

  const mouseDown = (e: any) => {
    const elms = document.querySelectorAll(".zIndex");
    elms.forEach((elm) => elm.classList.remove("zIndex"));
    if (target.current) {
      // @ts-expect-error -- todo
      target.current.classList.add("zIndex");
      // @ts-expect-error -- todo
      const rect = target.current.getBoundingClientRect();
      initialX = e.clientX - rect.x;
      initialY = e.clientY - rect.y;
    }
    document.body.addEventListener("mousemove", mouseMove);
    document.body.addEventListener("mouseup", mouseUp);
  };

  const onDeleteHandler = () => {
    onDelete(id);
  };

  return (
    <>
      <div ref={target} className={cn("w-96 absolute")} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
        <div className={cn("flex rounded-t-sm px-4 py-2.5", [color.nav])} onMouseDown={mouseDown}>
          <button className="cursor-pointer" onClick={onDeleteHandler}>
            <Trash2 className="pointer-events-none" />
          </button>
        </div>
        <div
          onFocus={(e) => e.target.classList.remove("truncateHeight")}
          onBlur={(e) => e.target.classList.add("truncateHeight")}
          contentEditable
          className={cn("rounded-b-sm p-4 outline-0 truncateHeight max-h-[80vh] overflow-auto", [color.body])}
        >
          {body}
        </div>
      </div>
    </>
  );
}

import cn from "clsx";
import { Pallet, PalletItem, Position } from "@/lib/types";
import { Trash2, ChevronsRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./Note.css";

export default function Note({
  id,
  color,
  body,
  position,
  pallet,
  onDelete,
  setLayerIsShown,
}: {
  id: number;
  color: PalletItem;
  body: string;
  position: Position;
  pallet: Pallet;
  onDelete: (id: number) => void;
  setLayerIsShown: (arg: boolean) => void;
}) {
  const oldBody = body;
  const oldTheme = color.nav;
  const target = useRef(null);
  const [currentTheme, setCurrentTheme] = useState(color);
  const [currentBody, setCurrentBody] = useState(body);
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

  const onColorChange = (e: React.ReactEventHandler, color: string) => {
    // @ts-expect-error -- todo
    const elm = e.target;
    if (elm) {
      const ul = elm?.parentElement;
      if (ul) {
        ul.classList.remove("colorsWrapperFullWidth");
      }
    }
    // @ts-expect-error -- todo
    setCurrentTheme(pallet[color]);
  };

  useEffect(() => {
    const nav = currentTheme.nav;
    const color = Object.keys(pallet).find((item) => pallet[item as keyof typeof pallet].nav === nav);

    const obj = {
      id,
      body: currentBody,
      color: color || "blue",
      position: { x: 10, y: 10 },
    };

    if (currentBody !== oldBody || nav !== oldTheme) {
      // @eissa -- crud operation -- update
      console.log("updated note", obj);
    }
  }, [currentTheme, currentBody]);

  return (
    <>
      <div ref={target} className={cn("w-96 absolute")} id={"note-" + id} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
        <div className={cn("flex rounded-t-sm px-4 py-2.5", [currentTheme.nav])} onMouseDown={mouseDown}>
          <button className="cursor-pointer" onClick={onDeleteHandler}>
            <Trash2 className="pointer-events-none" />
          </button>
          <div className="flex">
            <ul className="flex gap-2 items-center ms-4 w-0 overflow-hidden transition-all">
              {Object.keys(pallet).map((pal) => {
                if (currentTheme.body != pallet[pal as keyof typeof pallet].body) {
                  return (
                    <li
                      key={pal}
                      className={`${pallet[pal as keyof typeof pallet].body} w-5 h-5 rounded-full border border-zinc-400 cursor-pointer`}
                      // @ts-expect-error -- todo
                      onClick={(e) => onColorChange(e, pal)}
                    ></li>
                  );
                }
              })}
            </ul>
            <button
              className="cursor-pointer "
              onClick={(e) => {
                // @ts-expect-error -- todo
                const ul = e?.target?.previousElementSibling;
                if (ul) {
                  if (ul.classList.contains("colorsWrapperFullWidth")) {
                    ul.classList.remove("colorsWrapperFullWidth");
                  } else {
                    ul.classList.add("colorsWrapperFullWidth");
                  }
                }
              }}
            >
              <ChevronsRight className="w-4" />
            </button>
          </div>
        </div>
        <div
          onFocus={(e) => e.target.classList.remove("truncateHeight")}
          onBlur={(e) => {
            e.target.classList.add("truncateHeight");
            setLayerIsShown(false);
          }}
          // @ts-expect-error -- todo
          onInput={(e) => setCurrentBody(e.target.textContent)}
          // @ts-expect-error -- todo
          value={currentBody}
          contentEditable
          className={cn("min-h-[200px] rounded-b-sm p-4 outline-0 truncateHeight max-h-[80vh] overflow-auto", [currentTheme.body])}
        >
          {body}
        </div>
      </div>
    </>
  );
}

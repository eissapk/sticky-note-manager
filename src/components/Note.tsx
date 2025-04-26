import cn from "clsx";
import { Position } from "@/App";
import { Trash2 } from "lucide-react";

type Color = {
  nav: string;
  body: string;
};

export default function Note({ color, body, position }: { color: Color; body: string; position: Position }) {
  return (
    <div className={cn("w-96 absolute")} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
      <div className={cn("flex rounded-t-sm px-4 py-2.5", [color.nav])}>
        <button className="cursor-pointer" onClick={() => console.log("trash")}>
          <Trash2 className="pointer-events-none" />
        </button>
      </div>
      <div contentEditable className={cn("rounded-b-sm p-4 outline-0", [color.body])}>
        {body}
      </div>
    </div>
  );
}

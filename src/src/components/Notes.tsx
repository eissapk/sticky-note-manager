import { useEffect } from "react";
import Note from "@/components/Note";
import { pallet, randomizePieces } from "@/lib";
import { Data } from "@/lib/types";
let toggler: undefined | boolean;
// const data = [
//   {
//     id: 1,
//     body: "note one is the best",
//     color: "green",
//     position: { x: 10, y: 10 },
//   },
//   {
//     id: 2,
//     body: "note two is better",
//     color: "yellow",
//     position: { x: 10, y: 100 },
//   },
//   { id: 3, body: "note three is a quit good", color: "blue", position: { x: 10, y: 200 } },
//   { id: 4, body: "note four is the worest", color: "pink", position: { x: 10, y: 300 } },
// ];

function Notes({
  setIsOpen,
  setLayerIsShown,
  setCurrentNoteId,
  notes,
  setNotes,
}: {
  setIsOpen: (arg: boolean) => boolean;
  setLayerIsShown: (arg: boolean) => boolean;
  setCurrentNoteId: (arg: number) => number;
  setNotes: (arg: []) => [];
  notes: [];
}) {
  useEffect(() => {
    let updatedPieces = [];
    // @ts-expect-error -- todo
    let res = getNotes();
    // res = data; // browser
    if (res) {
      // randomize only once
      if (typeof toggler == "undefined") {
        updatedPieces = randomizePieces(res.notes, 384, 244);
        toggler = true;
        console.log("randomizePieces");
      } else {
        updatedPieces = res.notes;
        console.log("do NOT randomizePieces");
      }

      // @eissa -- crud operation -- get
      console.log("get notes");
      setNotes(updatedPieces);
    } else {
      console.error("Can't connect to notes db");
    }
  }, []);

  const onDelete = (id: number) => {
    setIsOpen(true);
    setCurrentNoteId(id);
  };
  return (
    <div className="min-h-[100vh] p-4">
      {notes?.length
        ? notes.map((item: Data) => (
            <Note
              setLayerIsShown={setLayerIsShown}
              onDelete={onDelete}
              id={item.id}
              key={item.id}
              body={item.body}
              pallet={pallet}
              color={{ ...pallet[item.color] }}
              position={item.position}
            />
          ))
        : ""}
    </div>
  );
}

export default Notes;

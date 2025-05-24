import { useEffect, useState } from "react";
import Note from "./components/Note";
import Popup from "./components/Popup";
import { pallet, randomizePieces } from "@/lib";
import { Search } from "./components/Search";
import { Data } from "./lib/types";
// @eissa -- crud operation -- get
const data = [
  {
    id: 1,
    body: "note one is the best",
    color: "green",
    position: { x: 10, y: 10 },
  },
  {
    id: 2,
    body: "note two is better",
    color: "yellow",
    position: { x: 10, y: 100 },
  },
  { id: 3, body: "note three is a quit good", color: "blue", position: { x: 10, y: 200 } },
  { id: 4, body: "note four is the worest", color: "pink", position: { x: 10, y: 300 } },
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [layerIsShown, setLayerIsShown] = useState(false);
  const [notes, setNotes] = useState<Data[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<null | number>(null);
  const popupTitle = "Warning!";
  const popupMessage = "This note will be deleted, Are you sure?";

  useEffect(() => {
    const updatedPieces = randomizePieces(data, 384, 244);
    setNotes(updatedPieces);
  }, []);

  const onDelete = (id: number) => {
    setIsOpen(true);
    setCurrentNoteId(id);
  };
  const onSuccess = () => {
    // Update UI
    if (currentNoteId && notes?.length && notes.find((item) => item.id == currentNoteId)) {
      setNotes((prevState) => {
        return prevState.filter((item) => item.id !== currentNoteId);
      });
      // Update DB
      // @eissa -- crud operation delete
      console.log("deleted note", currentNoteId);

      setIsOpen(false);
    }
  };

  const onSelect = (item: Data) => {
    const { id } = item;
    const note = document.getElementById(`note-${id}`);
    if (note) {
      const notes = document.querySelectorAll(".zIndex");
      notes.forEach((n) => n.classList.remove("zIndex"));
      const left = window.innerWidth / 2 - note.offsetWidth / 2;
      note.style.left = `${left}px`;
      note.style.top = "70px";
      note.classList.add("zIndex");
      setLayerIsShown(true);
    }
  };

  return (
    <>
      <Popup onSuccess={onSuccess} onCancel={() => setIsOpen(false)} isOpen={isOpen} onClose={() => setIsOpen(false)} title={popupTitle}>
        {popupMessage && <p className="">{popupMessage}</p>}
      </Popup>
      {layerIsShown && <div onClick={() => setLayerIsShown(false)} className="w-full h-screen bg-[rgba(0,0,0,0.7)] absolute left-0 top-0 z-10"></div>}
      <nav className="absolute top-2 mx-auto my-0 left-0 right-0 w-fit z-10">{notes?.length && <Search data={notes} onSelect={onSelect} />}</nav>
      <div className="min-h-[100vh] p-4">
        {notes?.length &&
          notes.map((item: Data) => (
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
          ))}
      </div>
    </>
  );
}

export default App;

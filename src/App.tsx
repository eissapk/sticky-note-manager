import { useEffect, useState } from "react";
import Note from "./components/Note";
import Popup from "./components/Popup";
import { randomizePieces } from "./lib";
const data = [
  { id: 1, body: "Any dummy content A1B2C3D4E5", color: "green", position: { x: 10, y: 10 } },
  {
    id: 2,
    body: "Any dummy content A1B2C3D4E5",
    color: "yellow",
    position: { x: 10, y: 100 },
  },
  { id: 3, body: "Any dummy content F6G7H8I9J0", color: "blue", position: { x: 10, y: 200 } },
  { id: 4, body: "Any dummy content P6Q7R8S9T0", color: "pink", position: { x: 10, y: 300 } },
];
export type Position = {
  x: number;
  y: number;
};
type Data = {
  id: number;
  body: string;
  color: string;
  position: Position;
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<null | object[]>(null);
  const [currentNoteId, setCurrentNoteId] = useState<null | number>(null);
  const popupTitle = "Warning!";
  const popupMessage = "Are you sure?, you want to delete this note!";
  const pallet = {
    green: { nav: "bg-[#b0da9e]", body: "bg-[#c2ddb6]" },
    yellow: { nav: "bg-[#fdf0bf]", body: "bg-[#fef5de]" },
    blue: { nav: "bg-[#9ad2de]", body: "bg-[#a7dce9]" },
    pink: { nav: "bg-[#fdd1fd]", body: "bg-[#ffe6fe]" },
  };

  useEffect(() => {
    const updatedPieces = randomizePieces(data, 384, 244);
    setNotes(updatedPieces);
  }, []);

  const onDelete = (id: number) => {
    setIsOpen(true);
    setCurrentNoteId(id);
  };
  const onSuccess = () => {
    if (currentNoteId && notes.find((item) => item.id == currentNoteId)) {
      setNotes((prevState) => {
        return prevState.filter((item) => item.id !== currentNoteId);
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <Popup onSuccess={onSuccess} onCancel={() => setIsOpen(false)} isOpen={isOpen} onClose={() => setIsOpen(false)} title={popupTitle}>
        {popupMessage}
      </Popup>
      <div className="min-h-[100vh] p-4">
        {notes?.length &&
          notes.map((item: Data) => <Note onDelete={onDelete} id={item.id} key={item.id} body={item.body} color={{ ...pallet[item.color] }} position={item.position} />)}
      </div>
    </>
  );
}

export default App;

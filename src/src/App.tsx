import { useState } from "react";
import Popup from "./components/Popup";
import { Data } from "./lib/types";
import Notes from "./components/Notes";
import NavBar from "./components/Nav/Nav";
import Layer from "./components/Layer";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [layerIsShown, setLayerIsShown] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState<null | number>(null);
  const [notes, setNotes] = useState<Data[]>([]);
  const popupTitle = "Warning!";
  const popupMessage = "This note will be deleted, Are you sure?";

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
      <Layer setLayerIsShown={setLayerIsShown} layerIsShown={layerIsShown} />
      <NavBar notes={notes} onSelect={onSelect} />
      <Notes setNotes={setNotes} notes={notes} setIsOpen={setIsOpen} setLayerIsShown={setLayerIsShown} setCurrentNoteId={setCurrentNoteId} />
    </>
  );
}

export default App;

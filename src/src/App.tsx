import { useState } from "react";
import Popup from "./components/Popup";
import { Data } from "./lib/types";
import Notes from "./components/Notes";
import NavBar from "./components/Nav";
import Layer from "./components/Layer";
import { Login } from "./components/Login";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [layerIsShown, setLayerIsShown] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState<null | number>(null);
  const [notes, setNotes] = useState<Data[]>([]);
  const [popupTitle] = useState("Warning!");
  const [popupMessage] = useState("This note will be deleted, Are you sure?");

  const onSuccess = () => {
    // Update UI
    if (currentNoteId && notes?.length && notes.find((item) => item.id == currentNoteId)) {
      setNotes((prevState) => {
        return prevState.filter((item) => item.id !== currentNoteId);
      });

      // Update DB
      // @eissa -- crud operation delete
      console.log("deleted note", currentNoteId);
      // @ts-expect-error -- todo
      removeNote(currentNoteId, (res) => {
        if (!res) return console.log("couldn't delete note #" + currentNoteId);
        console.log("Note " + currentNoteId + " deleted!");
      });

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
      {isLogged ? (
        <>
          {/* @ts-expect-error -- todo */}
          <NavBar setNotes={setNotes} notes={notes} onSelect={onSelect} />
          {/* @ts-expect-error -- todo */}
          <Notes setNotes={setNotes} notes={notes} setIsOpen={setIsOpen} setLayerIsShown={setLayerIsShown} setCurrentNoteId={setCurrentNoteId} />
        </>
      ) : (
        <Login setIsLogged={setIsLogged} />
      )}
    </>
  );
}

export default App;

import { Moon, Plus } from "lucide-react";
import { Search } from "../Search";
import { Button } from "../ui/button";
import { useState } from "react";
import { generateUniqueId } from "@/lib";

const NavBar = ({ notes, onSelect }: { notes: []; onSelect: () => void }) => {
  const [isDark, setIsDark] = useState(true);
  const toggleBg = () => {
    setIsDark(!isDark);
    //todo: use unsplash api to get random bg if isDark == false
  };
  const createNote = () => {
    const newNote = {
      id: generateUniqueId(),
      body: "",
      color: "yellow",
      position: { x: 10, y: 10 },
    };
    console.log("Create new note", newNote);

    // @eissa -- crud operation -- create
  };

  return (
    <nav className="absolute top-2 mx-auto my-0 left-0 right-0 w-fit z-10 flex gap-2">
      <Button variant={"secondary"} className="rounded-full bg-white py-0.5 box-content" onClick={toggleBg}>
        <Moon className={`${isDark ? "fill-indigo-500 text-indigo-500" : ""}`} />
      </Button>
      <Button variant={"secondary"} className="rounded-full bg-white py-0.5 box-content" onClick={createNote}>
        <Plus />
      </Button>
      {notes?.length && <Search data={notes} onSelect={onSelect} />}
    </nav>
  );
};
export default NavBar;

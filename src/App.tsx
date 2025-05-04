import { useState } from "react";
import Alert from "./components/Alert";
import Note from "./components/Note";
const data = [
  { id: 1, body: "Any dummy content A1B2C3D4E5", color: "green", position: { x: 70, y: 70 } },
  { id: 2, body: "Any dummy content F6G7H8I9J0", color: "yellow", position: { x: 200, y: 200 } },
  { id: 3, body: "Any dummy content K1L2M3N4O5", color: "blue", position: { x: 300, y: 300 } },
  { id: 4, body: "Any dummy content P6Q7R8S9T0", color: "pink", position: { x: 400, y: 400 } },
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
  const pallet = {
    green: { nav: "bg-[#b0da9e]", body: "bg-[#c2ddb6]" },
    yellow: { nav: "bg-[#fdf0bf]", body: "bg-[#fef5de]" },
    blue: { nav: "bg-[#9ad2de]", body: "bg-[#a7dce9]" },
    pink: { nav: "bg-[#fdd1fd]", body: "bg-[#ffe6fe]" },
  };
  const [isShown, setIsShown] = useState(false);
  const onCancel = () => {
    setIsShown(false);
    console.log("cancel");
  };
  const onSuccess = () => {
    setIsShown(false);
    console.log("success");
  };
  return (
    <>
      {isShown && <Alert title="Alert!" body={"Are you sure you want to delete this Note?"} onCancel={onCancel} onSuccess={onSuccess} />}
      <div className="min-h-[100vh] p-4">
        {data.map((item: Data) => (
          <Note setIsShown={setIsShown} onCancel={onCancel} onSuccess={onSuccess} key={item.id} body={item.body} color={{ ...pallet[item.color] }} position={item.position} />
        ))}
      </div>
    </>
  );
}

export default App;

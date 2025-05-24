export type PalletKey = "green" | "yellow" | "blue" | "pink";
export type PalletItem = {
  nav: string;
  body: string;
};

export type Pallet = {
  green: PalletItem;
  blue: PalletItem;
  yellow: PalletItem;
  pink: PalletItem;
};
export type Position = {
  x: number;
  y: number;
};
export type Data = {
  id: number;
  body: string;
  color: PalletKey;
  position: Position;
};

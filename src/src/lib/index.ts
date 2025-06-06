import { Pallet } from "./types";

const getProperLocations = (width: number, height: number) => {
  const sectorsNumX = Math.floor(window.innerWidth / width);
  const sectorsNumY = Math.floor(window.innerHeight / height);
  // console.warn({sectorsNumX, sectorsNumY});
  const validLocationsX = [0];
  const validLocationsY = [0];
  const pieceWidth = width;
  const pieceHeight = height;

  let startX = 0;
  let startY = 0;
  for (let i = 0; i < sectorsNumX * 2; i++) {
    startX += pieceWidth / 2;
    validLocationsX.push(startX);
  }

  for (let i = 0; i < sectorsNumY * 2; i++) {
    startY += pieceHeight / 2;
    validLocationsY.push(startY);
  }

  // fix last X,Y coords
  validLocationsX.pop();
  validLocationsX.pop();
  const lastY = validLocationsY[validLocationsY.length - 1];
  validLocationsY[validLocationsY.length - 1] = lastY - 45;

  // console.warn({ arrX: validLocationsX, arrY: validLocationsY });
  return { arrX: validLocationsX, arrY: validLocationsY };
};

export const randomizePieces = (dataArr: any[], width: number, height: number) => {
  const { arrX, arrY } = getProperLocations(width, height);
  dataArr.forEach((item) => {
    const coords = {
      x: arrX[Math.floor(Math.random() * arrX.length)],
      y: arrY[Math.floor(Math.random() * arrY.length)],
    };

    item.position.x = coords.x;
    item.position.y = coords.y;
  });
  return dataArr;
};

export const pallet: Pallet = {
  green: { nav: "bg-[#b0da9e]", body: "bg-[#c2ddb6]" },
  yellow: { nav: "bg-[#fdf0bf]", body: "bg-[#fef5de]" },
  blue: { nav: "bg-[#9ad2de]", body: "bg-[#a7dce9]" },
  pink: { nav: "bg-[#fdd1fd]", body: "bg-[#ffe6fe]" },
};

export function generateUniqueId() {
  return "id-" + Date.now().toString(36) + "-" + Math.random().toString(36).substr(2, 9);
}

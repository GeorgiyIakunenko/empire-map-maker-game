import { Cell } from "./cellClass.js";
import { mountainsData } from "../data/mountainsData.js";
import { Season } from "./seasonClass.js";

export function createGameTable(gameTable) {
  for (let i = 0; i < 11; i++) {
    gameTable.push([]);
    for (let j = 0; j < 11; j++) {
      gameTable[i].push(new Cell(i, j, "base"));
    }
  }

  // projecting the mountains
  mountainsData.forEach(([x, y]) => {
    if (x >= 0 && x < 11 && y >= 0 && y < 11) {
      gameTable[x - 1][y - 1] = new Cell(x - 1, y - 1, "mountain");
    }
  });
}

export function getSeasons() {
  return [
    new Season(0, "spring", "green", 0, ["A", "B"]),
    new Season(1, "summer", "yellow", 0, ["B", "C"]),
    new Season(2, "autumn", "red", 0, ["C", "D"]),
    new Season(3, "winter", "blue", 0, ["D", "A"]),
  ];
}

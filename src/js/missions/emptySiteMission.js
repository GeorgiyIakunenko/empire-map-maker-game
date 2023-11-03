import { Mission } from "./missionClass.js";

export class EmptySiteMission extends Mission {
  constructor(title, img, description) {
    super(title, img, description);
  }

  evaluateMission(gameTable) {
    let points = 0;

    const counted = [];

    for (let i = 0; i < gameTable.length; i++) {
      for (let j = 0; j < gameTable[i].length; j++) {
        if (gameTable[i][j].type === "village") {
          if (i > 0 && gameTable[i - 1][j].type === "base") {
            if (!counted.some((arr) => arr[0] === i - 1 && arr[1] === j)) {
              points += 2;
              counted.push([i - 1, j]);
            }
          }

          if (i < gameTable.length - 1 && gameTable[i + 1][j].type === "base") {
            if (!counted.some((arr) => arr[0] === i + 1 && arr[1] === j)) {
              points += 2;
              counted.push([i + 1, j]);
            }
          }

          if (j > 0 && gameTable[i][j - 1].type === "base") {
            if (!counted.some((arr) => arr[0] === i && arr[1] === j - 1)) {
              points += 2;
              counted.push([i, j - 1]);
            }
          }

          if (
            j < gameTable[i].length - 1 &&
            gameTable[i][j + 1].type === "base"
          ) {
            if (!counted.some((arr) => arr[0] === i && arr[1] === j + 1)) {
              points += 2;
              counted.push([i, j + 1]);
            }
          }
        }
      }
    }

    this.points = points;
    return points;
  }
}

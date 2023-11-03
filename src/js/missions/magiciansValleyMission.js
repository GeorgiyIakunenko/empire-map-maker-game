import { Mission } from "./missionClass.js";

export class MagiciansValleyMission extends Mission {
  constructor(title, img, description) {
    super(title, img, description);
  }

  evaluateMission(gameTable) {
    let points = 0;

    for (let i = 0; i < gameTable.length; i++) {
      for (let j = 0; j < gameTable[i].length; j++) {
        if (gameTable[i][j].type === "water") {
          if (
            (i > 0 && gameTable[i - 1][j].type === "mountain") ||
            (i < gameTable.length - 1 &&
              gameTable[i + 1][j].type === "mountain") ||
            (j > 0 && gameTable[i][j - 1].type === "mountain") ||
            (j < gameTable[i].length - 1 &&
              gameTable[i][j + 1].type === "mountain")
          ) {
            points += 3;
          }
        }
      }
    }

    this.points = points;
    return points;
  }
}

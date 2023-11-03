import { Mission } from "./missionClass.js";

export class SurroundedMountainMission extends Mission {
  constructor(title, img, description) {
    super(title, img, description);
  }

  evaluateMission(gameTable) {
    let points = 0;

    for (let i = 0; i < gameTable.length; i++) {
      for (let j = 0; j < gameTable[i].length; j++) {
        if (gameTable[i][j].type === "mountain") {
          if (
            i > 0 &&
            i < gameTable.length - 1 &&
            j > 0 &&
            j < gameTable[i].length - 1 &&
            gameTable[i - 1][j].type !== "base" &&
            gameTable[i + 1][j].type !== "base" &&
            gameTable[i][j - 1].type !== "base" &&
            gameTable[i][j + 1].type !== "base"
          ) {
            points += 1;
          }
        }
      }
    }

    this.points = points;
    return points;
  }
}

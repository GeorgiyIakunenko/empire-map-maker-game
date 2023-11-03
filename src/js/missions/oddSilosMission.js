import { Mission } from "./missionClass.js";

export class OddSilosMission extends Mission {
  constructor(title, img, description) {
    super(title, img, description);
  }

  evaluateMission(gameTable) {
    let points = 0;
    const numCols = gameTable[0].length;

    for (let j = 0; j < numCols; j += 2) {
      let isFullColumn = true;

      for (let i = 0; i < gameTable.length; i++) {
        if (gameTable[i][j].type === "base") {
          isFullColumn = false;
        }
      }

      if (isFullColumn) {
        points += 10;
      }
    }

    this.points = points;
    return points;
  }
}

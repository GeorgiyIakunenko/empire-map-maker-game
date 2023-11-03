import { Mission } from "./missionClass.js";

export class BorderlandsMission extends Mission {
  constructor(title, img, description) {
    super(title, img, description);
  }

  evaluateMission(gameTable) {
    let points = 0;

    for (let i = 0; i < gameTable.length; i++) {
      const isFullLine = gameTable[i].every((cell) => cell.type !== "base");

      if (isFullLine) {
        points += 6;
      }
    }

    for (let j = 0; j < gameTable[0].length; j++) {
      const isFullColumn = gameTable.every((row) => row[j].type !== "base");

      if (isFullColumn) {
        points += 6;
      }
    }

    this.points = points;
    return points;
  }
}

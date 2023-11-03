import { Mission } from "./missionClass.js";

export class TreeLineMission extends Mission {
  constructor(title, img, description) {
    super(title, img, description);
  }

  evaluateMission(gameTable) {
    let longestLen = 0;
    let currLen = 0;
    let longestCount = 0;
    let insideTreeLine = false;

    for (let j = 0; j < gameTable[0].length; j++) {
      for (let i = 0; i < gameTable.length; i++) {
        const cell = gameTable[i][j];
        if (cell.type === "forest" && !insideTreeLine) {
          insideTreeLine = true;
          currLen = 1;
        } else if (cell.type === "forest" && insideTreeLine) {
          currLen++;
        } else {
          insideTreeLine = false;

          if (currLen > longestLen) {
            longestLen = currLen;
            longestCount = 1;
          } else if (currLen === longestLen) {
            longestCount++;
          }
        }
      }
    }

    let points = 0;

    if (longestCount > 0) {
      points = longestLen * 2;
    } else {
      points = 0;
    }

    this.points = points;
    return points;
  }
}

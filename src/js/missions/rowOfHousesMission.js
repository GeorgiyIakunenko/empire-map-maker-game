import { Mission } from "./missionClass.js";

export class RowOfHousesMission extends Mission {
  constructor(title, img, description) {
    super(title, img, description);
  }

  evaluateMission(gameTable) {
    let points = 0;
    let currentVillLength = 0;
    let longestVillLength = 0;

    for (let i = 0; i < gameTable.length; i++) {
      for (let j = 0; j < gameTable[i].length; j++) {
        if (gameTable[i][j].type === "village") {
          currentVillLength++;
        } else {
          currentVillLength = 0;
        }

        if (currentVillLength > longestVillLength) {
          longestVillLength = currentVillLength;
        }
      }
    }

    points = longestVillLength * 2;

    this.points = points;
    return points;
  }
}

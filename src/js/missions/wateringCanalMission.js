import { Mission } from "./missionClass.js";

export class WateringCanalMission extends Mission {
  constructor(title, img, description) {
    super(title, img, description);
  }

  evaluateMission(gameTable) {
    let points = 0;

    for (let j = 0; j < gameTable[0].length; j++) {
      let farmCount = 0;
      let waterCount = 0;

      for (let i = 0; i < gameTable.length; i++) {
        const cell = gameTable[i][j];

        if (cell.type === "plains") {
          farmCount++;
        } else if (cell.type === "water") {
          waterCount++;
        }
      }

      if (farmCount > 0 && farmCount === waterCount) {
        points += 4;
      }
    }

    this.points = points;
    return points;
  }
}

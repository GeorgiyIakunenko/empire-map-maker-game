import { Mission } from "./missionClass.js";

export class SleepyValleyMission extends Mission {
  constructor(title, img, description) {
    super(title, img, description);
  }

  evaluateMission(gameTable) {
    let points = 0;

    for (let i = 0; i < gameTable.length; i++) {
      let forestCount = 0;

      for (let j = 0; j < gameTable[i].length; j++) {
        if (gameTable[i][j].type === "forest") {
          forestCount++;
        }
      }

      if (forestCount === 3) {
        points += 4;
      }
    }
    this.points = points;
    return points;
  }
}

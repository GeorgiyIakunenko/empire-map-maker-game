import { Mission } from "./missionClass.js";

export class EdgeOfTheForestMission extends Mission {
  constructor(title, img, description) {
    super(title, img, description);
  }

  evaluateMission(gameTable) {
    let points = 0;

    for (let i = 0; i < gameTable.length; i++) {
      for (let j = 0; j < gameTable[i].length; j++) {
        if (
          i === 0 ||
          i === gameTable.length - 1 ||
          j === 0 ||
          j === gameTable[i].length - 1
        ) {
          if (gameTable[i][j].type === "forest") {
            points++;
          }
        }
      }
    }
    this.points = points;
    return points;
  }
}

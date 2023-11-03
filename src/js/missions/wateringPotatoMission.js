import { Mission } from "./missionClass.js";

export class WateringPotatoMission extends Mission {
  constructor(title, img, description) {
    super(title, img, description);
  }

  evaluateMission(gameTable) {
    let points = 0;

    for (let i = 0; i < gameTable.length; i++) {
      for (let j = 0; j < gameTable[i].length; j++) {
        if (gameTable[i][j].type === "plains") {
          //console.log(i, j);
          if (i > 0 && gameTable[i - 1][j].type === "water") {
            points += 2;
          }
          if (
            i < gameTable.length - 1 &&
            gameTable[i + 1][j].type === "water"
          ) {
            points += 2;
          }
          if (j > 0 && gameTable[i][j - 1].type === "water") {
            points += 2;
          }
          if (
            j < gameTable[i].length - 1 &&
            gameTable[i][j + 1].type === "water"
          ) {
            points += 2;
          }
        }
      }
    }

    this.points = points;
    return points;
  }
}

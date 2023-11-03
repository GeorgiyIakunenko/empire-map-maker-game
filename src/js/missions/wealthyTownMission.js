import { Mission } from "./missionClass.js";

export class WealthyTownMission extends Mission {
  constructor(title, img, description) {
    super(title, img, description);
  }

  evaluateMission(gameTable) {
    let points = 0;

    for (let i = 0; i < gameTable.length; i++) {
      for (let j = 0; j < gameTable[i].length; j++) {
        if (gameTable[i][j].type === "village") {
          let terrainTypes = [];

          if (i > 0 && !terrainTypes.includes(gameTable[i - 1][j].type)) {
            terrainTypes.push(gameTable[i - 1][j].type);
          }
          if (
            i < gameTable.length - 1 &&
            !terrainTypes.includes(gameTable[i + 1][j].type)
          ) {
            terrainTypes.push(gameTable[i + 1][j].type);
          }
          if (j > 0 && !terrainTypes.includes(gameTable[i][j - 1].type)) {
            terrainTypes.push(gameTable[i][j - 1].type);
          }
          if (
            j < gameTable[i].length - 1 &&
            !terrainTypes.includes(gameTable[i][j + 1].type)
          ) {
            terrainTypes.push(gameTable[i][j + 1].type);
          }

          if (terrainTypes.length >= 3) {
            points += 3;
          }
        }
      }
    }

    this.points = points;
    return points;
  }
}

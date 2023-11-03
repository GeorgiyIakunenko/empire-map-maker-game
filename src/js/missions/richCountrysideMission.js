import { Mission } from "./missionClass.js";

export class RichCountrysideMission extends Mission {
  constructor(title, img, description) {
    super(title, img, description);
  }

  evaluateMission(gameTable) {
    let points = 0;

    for (let i = 0; i < gameTable.length; i++) {
      let terrainTypes = [];

      for (let j = 0; j < gameTable[i].length; j++) {
        const terrainType = gameTable[i][j].type;

        if (!terrainTypes.includes(terrainType)) {
          terrainTypes.push(terrainType);
        }
      }

      if (terrainTypes.length >= 5) {
        points += 4;
      }
    }

    this.points = points;
    return points;
  }
}

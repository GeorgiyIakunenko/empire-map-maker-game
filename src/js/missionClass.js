class Mission {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.points = 0;
  }

  evaluateMission(gameTable) {}
}

export class BorderlandsMission extends Mission {
  constructor(id, title, description) {
    super(id, title, description);
  }

  evaluateMission(gameTable) {
    let points = 0;

    for (let i = 0; i < gameTable.length; i++) {
      const isFullLine = gameTable[i].every((cell) => cell.type !== "base");

      if (isFullLine) {
        points += 6; // Add 6 points for a full row
      }
    }

    // Check columns
    for (let j = 0; j < gameTable[0].length; j++) {
      const isFullColumn = gameTable.every((row) => row[j].type !== "base");

      if (isFullColumn) {
        points += 6; // Add 6 points for a full column
      }
    }

    this.points = points;
    return points;
  }
}

export const borderlandsMission = new BorderlandsMission(
  1,
  "Borderlands",
  "For each full row or column, you get six points.",
);

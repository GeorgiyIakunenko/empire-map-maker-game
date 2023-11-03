export class Season {
  constructor(id, name, color, points, missionsLetters = ["A", "B"]) {
    this.id = id;
    this.name = name;
    this.points = 0;
    this.color = color;
    this.missionsLatters = missionsLetters;
  }

  getLayout() {
    return this.name + " (" + this.missionsLatters.join(" ") + ")";
  }
}

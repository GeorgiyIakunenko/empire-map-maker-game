export class Season {
  constructor(id, name, color, points, missionsLetters = ["A", "B"]) {
    this.id = id;
    this.name = name;
    this.points = 0;
    this.color = color;
    this.missionsLatters = missionsLetters;
  }

  getStringLayout() {
    return this.name + " (" + this.missionsLatters.join(" ") + ")";
  }

  getLayout(currentSeason) {
    let border =
      currentSeason.name === this.name ? "border-4 border-black" : "";
    return `<div class="season rounded-xl text-sm p-4 w-24 h-24 flex gap-2 flex-col ${border} ${this.color}"><div>${this.name}</div><div>${this.points} Points</div></div>`;
  }
}

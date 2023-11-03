export class Cell {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  getLayout() {
    return `<img class="cell cursor-pointer row-${this.x} col-${this.y}" src="images/${this.type}_tile.svg" data-row="${this.x}" data-col="${this.y}" alt="${this.type}">`;
  }
}

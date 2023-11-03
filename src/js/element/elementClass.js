export class Element {
  time;
  type;
  shape;
  rotation;
  mirrored;
  constructor(time, type, shape, rotation, mirrored) {
    this.time = time;
    this.type = type;
    this.shape = shape;
    this.rotation = rotation;
    this.mirrored = mirrored;
  }

  flipElement() {
    this.mirrored = !this.mirrored;
    this.shape = this.shape.map((row) => row.reverse());
  }

  rotateElement() {
    const size = this.shape.length;
    const rotatedShape = new Array(size)
      .fill(0)
      .map(() => new Array(size).fill(0));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        rotatedShape[i][j] = this.shape[size - 1 - j][i];
      }
    }

    this.shape = rotatedShape;
    this.rotation = (this.rotation + 1) % 4;
  }

  getLayout() {
    let itemsElements = "";
    this.shape.forEach((item) => {
      item.forEach((item) => {
        if (item === 1) {
          itemsElements += `<img class="cell cursor-pointer" src="images/${this.type}_tile.svg" alt="${this.type}">`;
        } else {
          itemsElements += `<div class="cell"></div>`;
        }
      });
    });
    return `<div class="cursor-pointer flex flex-wrap gap-1 mb-3 w-40">${itemsElements}</div>`;
  }
}

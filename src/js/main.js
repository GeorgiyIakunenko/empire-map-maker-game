import { elementsData } from "./data.js";
import { shuffle } from "./shuffleArray.js";
import {
  addElementToBoard,
  deletePreviewElementFromBoard,
  previewElementOnBoard,
} from "./elementsFunctions.js";

const gameTable = document.querySelector(".game-table");
const elementDiv = document.querySelector(".element");
const elementTimeDiv = document.querySelector(".element-time");

// action buttons

const flipButton = document.querySelector(".flip-button");
const rotateButton = document.querySelector(".rotate-button");

class Cell {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
}

class game {
  gameTable;
  elements;
  currentElement;

  constructor(el) {
    this.gameTable = [];
    for (let i = 0; i < 11; i++) {
      this.gameTable.push([]);
      for (let j = 0; j < 11; j++) {
        // Create instances of the Cell class for the game table
        this.gameTable[i].push(new Cell(i, j, "base"));
      }
    }

    // projecting the mountains
    let mountains = [
      [2, 2],
      [4, 9],
      [6, 4],
      [9, 10],
      [10, 6],
    ];

    mountains.forEach(([x, y]) => {
      if (x >= 0 && x < 11 && y >= 0 && y < 11) {
        this.gameTable[x - 1][y - 1] = new Cell(x - 1, y - 1, "mountain");
      }
    });

    this.elements = el;
  }

  defineGameTable() {
    this.gameTable.forEach((row) => {
      row.forEach((cell) => {
        gameTable.innerHTML += `<img class="cell cursor-pointer row-${cell.x} col-${cell.y}" src="images/${cell.type}_tile.svg" data-row="${cell.x}" data-col="${cell.y}" alt="${cell.type}"></img>`;
      });
    });
  }

  flipElement() {
    this.currentElement.mirrored = !this.currentElement.mirrored;
    this.currentElement.shape = this.currentElement.shape.map((row) =>
      row.reverse(),
    );
  }

  rotateElement() {
    const shape = this.currentElement.shape;
    const size = shape.length;
    const rotatedShape = new Array(size)
      .fill(0)
      .map(() => new Array(size).fill(0));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        rotatedShape[i][j] = shape[size - 1 - j][i];
      }
    }

    this.currentElement.shape = rotatedShape;
    this.currentElement.rotation = (this.currentElement.rotation + 1) % 4;
  }

  getNextElement() {
    this.currentElement = this.elements.pop();
  }

  defineListeners() {
    flipButton.addEventListener("click", () => {
      newGame.flipElement();
      newGame.defineNextElement();
    });

    rotateButton.addEventListener("click", () => {
      newGame.rotateElement();
      newGame.defineNextElement();
    });

    gameTable.addEventListener("mousemove", (event) => {
      previewElementOnBoard(event, this.currentElement, this.gameTable);
    });

    gameTable.addEventListener("mouseout", (event) => {
      deletePreviewElementFromBoard(event, this.currentElement, this.gameTable);
    });

    gameTable.addEventListener("click", (event) => {
      addElementToBoard(event, this.currentElement, this.gameTable);
    });
  }

  defineNextElement() {
    elementDiv.innerHTML = "";
    elementTimeDiv.innerHTML = "";
    let itemsElements = "";
    this.currentElement.shape.forEach((item) => {
      item.forEach((item) => {
        if (item === 1) {
          itemsElements += `<img class="cell cursor-pointer" src="images/${this.currentElement.type}_tile.svg" alt="${this.currentElement.type}"></img>`;
        } else {
          itemsElements += `<div class="cell"></div>`;
        }
      });
    });
    elementDiv.innerHTML += `<div class="mission cursor-pointer flex flex-wrap gap-1 mb-3 w-40">${itemsElements}</div>`;
    elementTimeDiv.innerHTML += `${this.currentElement.time}`;
  }
}

const newGame = new game(shuffle(elementsData));
newGame.defineGameTable();
newGame.defineListeners();
newGame.getNextElement();
newGame.defineNextElement();

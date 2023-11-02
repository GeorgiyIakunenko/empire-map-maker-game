import { elementsData, missionsData } from "./data.js";
import { shuffle } from "./utils/shuffleArray.js";
import {
  addElementToBoard,
  deletePreviewElementFromBoard,
  previewElementOnBoard,
} from "./elementsFunctions.js";

import { Missions } from "./missions.js";

const gameTable = document.querySelector(".game-table");
const elementDiv = document.querySelector(".element");
const elementTimeDiv = document.querySelector(".element-time");
const seasonsDiv = document.querySelector(".seasons");
const currentSeason = document.querySelector(".current-season");

// action buttons

const flipButton = document.querySelector(".flip-button");
const rotateButton = document.querySelector(".rotate-button");
const elapsedTime = document.querySelector(".elapsed-time");

class Cell {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
}

class Season {
  constructor(id, name, color, missionsLetters = ["A", "B"]) {
    this.id = id;
    this.name = name;
    this.points = 0;
    this.color = color;
    this.missionsLatters = missionsLetters;
  }
}

class game {
  gameTable;
  elements;
  currentElement;
  currentSeason;
  seasons;
  timePoints;

  constructor(el) {
    this.gameTable = [];
    for (let i = 0; i < 11; i++) {
      this.gameTable.push([]);
      for (let j = 0; j < 11; j++) {
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
    this.seasons = [
      new Season(0, "spring", "green", ["A", "B"]),
      new Season(1, "summer", "yellow", ["B", "C"]),
      new Season(2, "autumn", "red", ["C", "D"]),
      new Season(3, "winter", "blue", ["D", "A"]),
    ];
    this.currentSeason = this.seasons[0];
    this.timePoints = 0;
  }

  defineGameTable() {
    this.gameTable.forEach((row) => {
      row.forEach((cell) => {
        gameTable.innerHTML += `<img class="cell cursor-pointer row-${cell.x} col-${cell.y}" src="images/${cell.type}_tile.svg" data-row="${cell.x}" data-col="${cell.y}" alt="${cell.type}">`;
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
      let res = addElementToBoard(event, this.currentElement, this.gameTable);
      if (res) {
        this.timePoints += this.currentElement.time;
        elapsedTime.innerHTML = this.timePoints % 7;
        this.getNextElement();
        this.defineNextElement();
        this.defineSeasons();
      }
    });
  }

  defineSeasons() {
    let seasonsLayout = "";
    const currentSeasonIndex = Math.floor(this.timePoints / 7) % 4;
    console.log(currentSeasonIndex);
    this.currentSeason = this.seasons[currentSeasonIndex];
    this.seasons.forEach((season) => {
      let border = this.currentSeason.name === season.name ? "border-4" : "";
      seasonsLayout += `<div class="season rounded-xl p-4 w-28 h-28 flex flex-col ${border} ${season.color}"><div>${season.name}</div><div>${season.points} Points</div></div>`;
    });
    seasonsDiv.innerHTML = seasonsLayout;
    currentSeason.innerHTML = this.currentSeason.name;
  }

  defineNextElement() {
    elementDiv.innerHTML = "";
    elementTimeDiv.innerHTML = "";
    let itemsElements = "";
    this.currentElement.shape.forEach((item) => {
      item.forEach((item) => {
        if (item === 1) {
          itemsElements += `<img class="cell cursor-pointer" src="images/${this.currentElement.type}_tile.svg" alt="${this.currentElement.type}">`;
        } else {
          itemsElements += `<div class="cell"></div>`;
        }
      });
    });
    elementDiv.innerHTML += `<div class="cursor-pointer flex flex-wrap gap-1 mb-3 w-40">${itemsElements}</div>`;
    elementTimeDiv.innerHTML += `${this.currentElement.time}`;
  }
}

let missions = new Missions(missionsData);
missions.defineMission();

const newGame = new game(shuffle(elementsData));
newGame.defineGameTable();
newGame.defineListeners();
newGame.getNextElement();
newGame.defineNextElement();
newGame.defineSeasons();

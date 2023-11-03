import {
  addElementToBoard,
  deletePreviewElementFromBoard,
  previewElementOnBoard,
} from "../elementsFunctions.js";
import { Season } from "./seasonClass.js";
import { Cell } from "./cellClass.js";
import { Element } from "../element/elementClass.js";
import { mountainsData } from "../data/mountainsData.js";

const gameTable = document.querySelector(".game-table");
const elementDiv = document.querySelector(".element");
const elementTimeDiv = document.querySelector(".element-time");
const seasonsDiv = document.querySelector(".seasons");
const currentSeason = document.querySelector(".current-season");
const totalPointsDiv = document.querySelector(".total-points");
const missionDiv = document.querySelector(".missions");

// action buttons

const flipButton = document.querySelector(".flip-button");
const rotateButton = document.querySelector(".rotate-button");
const elapsedTime = document.querySelector(".elapsed-time");

export class Game {
  gameTable;
  missions;
  currentElement;
  elements;
  currentSeason;
  seasons;
  timePoints;

  constructor(el, missions) {
    this.gameTable = [];
    this.missions = missions;
    for (let i = 0; i < 11; i++) {
      this.gameTable.push([]);
      for (let j = 0; j < 11; j++) {
        this.gameTable[i].push(new Cell(i, j, "base"));
      }
    }

    // projecting the mountains
    mountainsData.forEach(([x, y]) => {
      if (x >= 0 && x < 11 && y >= 0 && y < 11) {
        this.gameTable[x - 1][y - 1] = new Cell(x - 1, y - 1, "mountain");
      }
    });

    this.elements = el;
    this.seasons = [
      new Season(0, "spring", "green", 0, ["A", "B"]),
      new Season(1, "summer", "yellow", 0, ["B", "C"]),
      new Season(2, "autumn", "red", 0, ["C", "D"]),
      new Season(3, "winter", "blue", 0, ["D", "A"]),
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

  getNextElement() {
    let el = this.elements.pop();
    this.currentElement = new Element(
      el.time,
      el.type,
      el.shape,
      el.rotation,
      el.mirrored,
    );
  }

  defineListeners() {
    flipButton.addEventListener("click", () => {
      this.currentElement.flipElement();
      this.defineNextElement();
    });

    rotateButton.addEventListener("click", () => {
      this.currentElement.rotateElement();
      this.defineNextElement();
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
        this.defineMissions();
      }
    });
  }

  defineSeasons() {
    let seasonsLayout = "";
    const currentSeasonIndex = Math.floor(this.timePoints / 7) % 4;
    console.log(currentSeasonIndex);
    this.currentSeason = this.seasons[currentSeasonIndex];
    this.seasons.forEach((season) => {
      let border =
        this.currentSeason.name === season.name ? "border-4 border-black" : "";
      seasonsLayout += `<div class="season rounded-xl text-sm p-4 w-24 h-24 flex gap-2 flex-col ${border} ${season.color}"><div>${season.name}</div><div>${season.points} Points</div></div>`;
    });
    seasonsDiv.innerHTML = seasonsLayout;
    currentSeason.innerHTML = this.currentSeason.getLayout();
    totalPointsDiv.innerHTML = this.currentSeason.points;
  }

  defineNextElement() {
    elementDiv.innerHTML = "";
    elementTimeDiv.innerHTML = "";
    elementDiv.innerHTML += this.currentElement.getLayout();
    elementTimeDiv.innerHTML += `${this.currentElement.time}`;
  }

  // todo define latter's for missions and highlight them when the season is appropriate

  defineMissions() {
    let missionsElement = "";
    this.missions.forEach((currentMission) => {
      console.log(currentMission);
      currentMission.evaluateMission(this.gameTable);
      missionsElement += currentMission.getLayout();
    });

    missionDiv.innerHTML = missionsElement;
  }
}

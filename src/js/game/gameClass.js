import {
  addElementToBoard,
  deletePreviewElementFromBoard,
  previewElementOnBoard,
} from "../elementsFunctions.js";
import { createGameTable, getSeasons } from "./helpers.js";
import { Element } from "../element/elementClass.js";

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

    createGameTable(this.gameTable);

    this.elements = el;
    this.seasons = getSeasons();
    this.currentSeason = this.seasons[0];
    this.timePoints = 0;
  }

  defineGameTable() {
    this.gameTable.forEach((row) => {
      row.forEach((cell) => {
        gameTable.innerHTML += cell.getLayout();
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
    this.currentSeason = this.seasons[currentSeasonIndex];
    this.seasons.forEach((season) => {
      seasonsLayout += season.getLayout(this.currentSeason);
    });
    seasonsDiv.innerHTML = seasonsLayout;
    currentSeason.innerHTML = this.currentSeason.getStringLayout();
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

  start() {
    this.defineGameTable();
    this.defineListeners();
    this.getNextElement();
    this.defineNextElement();
    this.defineSeasons();
    this.defineMissions();
  }
}

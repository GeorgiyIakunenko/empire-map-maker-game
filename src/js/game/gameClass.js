import {
  addElementToBoard,
  deletePreviewElementFromBoard,
  previewElementOnBoard,
} from "../elementsFunctions.js";
import { createGameTable, getSeasons } from "./helpers.js";
import { Element } from "../element/elementClass.js";
import { shuffle } from "../utils/shuffleArray.js";
import { elementsData } from "../data/elementsData.js";
import {
  missionsDefined,
  surroundedMountainMission,
} from "../missions/missions.js";

const gameTable = document.querySelector(".game-table");
const elementDiv = document.querySelector(".element");
const elementTimeDiv = document.querySelector(".element-time");
const seasonsDiv = document.querySelector(".seasons");
const currentSeason = document.querySelector(".current-season");
const totalPointsDiv = document.querySelector(".total-points");
const elapsedTime = document.querySelector(".elapsed-time");
const missionDiv = document.querySelector(".missions");
const modalFull = document.querySelector(".modal-full");
const modalContent = document.querySelector(".modal-content");
const surroundedMountainPointsDiv = document.querySelector(
  ".surrounded-mountain-points",
);

// action buttons
const closeModalBtn = document.querySelector(".close-modal-btn");
const flipButton = document.querySelector(".flip-button");
const rotateButton = document.querySelector(".rotate-button");

export class Game {
  gameTable;
  missions;
  currentElement;
  elements;
  currentSeason;
  seasons;
  timePoints;
  totalPoints;
  surroundedMountainMission;

  constructor() {
    this.initialize();
  }

  initialize() {
    this.gameTable = [];
    this.missions = shuffle(missionsDefined).slice(0, 4);
    createGameTable(this.gameTable);
    this.elements = shuffle(elementsData);
    this.seasons = getSeasons();
    this.currentSeason = this.seasons[0];
    this.timePoints = 0;
    this.totalPoints = 0;
    this.surroundedMountainMission = surroundedMountainMission;
  }

  defineGameTable() {
    gameTable.innerHTML = "";
    this.gameTable.forEach((row) => {
      row.forEach((cell) => {
        gameTable.innerHTML += cell.getLayout();
      });
    });
  }

  getNextElement() {
    if (this.elements.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.elements.length);
      const el = this.elements[randomIndex];
      this.currentElement = new Element(
        el.time,
        el.type,
        el.shape,
        el.rotation,
        el.mirrored,
      );
    }
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
        this.checkIsEnd();
      }
    });

    modalFull.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal-full")) {
        modalFull.classList.add("hidden");
        this.restart();
      }
    });

    closeModalBtn.addEventListener("click", () => {
      modalFull.classList.add("hidden");
      this.restart();
    });
  }

  defineSeasons() {
    let seasonsLayout = "";
    const currentSeasonIndex = Math.floor(this.timePoints / 7) % 4;
    if (
      currentSeasonIndex > this.currentSeason.id ||
      (currentSeasonIndex === 0 && this.currentSeason.id === 3)
    ) {
      // in case of new year (currentSeasonIndex === 0 && this.currentSeason.id === 3)
      // calculate points
      this.calculatePoints();
    }
    this.currentSeason = this.seasons[currentSeasonIndex];
    this.seasons.forEach((season) => {
      seasonsLayout += season.getLayout(this.currentSeason);
    });
    seasonsDiv.innerHTML = seasonsLayout;
    currentSeason.innerHTML = this.currentSeason.getStringLayout();
    totalPointsDiv.innerHTML = this.totalPoints;
  }

  checkIsEnd() {
    if (this.timePoints >= 28) {
      modalContent.innerHTML = `Your score is ${this.totalPoints}`;
      modalFull.classList.remove("hidden");
    }
  }

  restart() {
    this.initialize();
    this.defineGameTable();
    // not needed, because listeners are defined
    //this.defineListeners();
    this.getNextElement();
    this.defineNextElement();
    this.defineSeasons();
    this.defineMissions();
  }

  calculatePoints() {
    this.missions.forEach((currentMission) => {
      if (this.currentSeason.missionsLatters.includes(currentMission.season)) {
        currentMission.evaluateMission(this.gameTable);
        this.currentSeason.points += currentMission.points;
        this.totalPoints += currentMission.points;
      }
    });
  }

  defineNextElement() {
    elementDiv.innerHTML = "";
    elementTimeDiv.innerHTML = "";
    elementDiv.innerHTML += this.currentElement.getLayout();
    elementTimeDiv.innerHTML += `${this.currentElement.time}`;
  }

  defineMissions() {
    let missionsElement = "";
    this.missions.forEach((currentMission, index) => {
      //console.log(currentMission);
      currentMission.setSeason(this.seasons[index].missionsLatters[0]);
      currentMission.evaluateMission(this.gameTable);
      missionsElement += currentMission.getLayout(this.currentSeason);
    });
    missionDiv.innerHTML = missionsElement;

    // surrounded mountain mission evaluation

    this.surroundedMountainMission.evaluateMission(this.gameTable);
    surroundedMountainPointsDiv.innerHTML =
      this.surroundedMountainMission.points;
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

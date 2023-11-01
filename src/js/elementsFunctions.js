function previewElementOnBoard(event, currentElement, gameTable) {
  const target = event.target;

  if (target.classList.contains("cell")) {
    const x = parseInt(target.dataset.row);
    const y = parseInt(target.dataset.col);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        //console.log(x + i, y + j);
        const element = document.querySelector(`.row-${x + i}.col-${y + j}`);
        if (element) {
          if (currentElement.shape[i][j] === 1) {
            console.log(gameTable[x + i][y + j]);
            if (gameTable[x + i][y + j].type === "base") {
              element.style.opacity = 0.5;
              element.src = `images/${currentElement.type}_tile.svg`;
            } else {
              element.style.opacity = 0.75;
              element.src = `images/wrong.svg`;
            }
          }
        }
      }
    }
  }
}

function deletePreviewElementFromBoard(event, currentElement, gameTable) {
  const target = event.target;
  if (target.classList.contains("cell")) {
    const x = parseInt(target.dataset.row);
    const y = parseInt(target.dataset.col);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const element = document.querySelector(`.row-${x + i}.col-${y + j}`);
        if (element) {
          element.style.opacity = 1;
          element.src = `images/${gameTable[x + i][y + j].type}_tile.svg`;
        }
      }
    }
  }
}

function addElementToBoard(event, currentElement, gameTable) {
  const target = event.target;
  if (target.classList.contains("cell")) {
    const x = parseInt(target.dataset.row);
    const y = parseInt(target.dataset.col);
    console.log(x, y);
    if (!isValidPlacement(currentElement, gameTable, x, y)) {
      return;
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let cell = gameTable[x + i][y + j];
        if (cell) {
          if (currentElement.shape[i][j] === 1) {
            cell.type = currentElement.type;
          }
        }
      }
    }
  }
}

function isValidPlacement(currentElement, gameTable, x, y) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = gameTable[x + i][y + j];
      if (cell) {
        if (currentElement.shape[i][j] === 1 && cell.type !== "base") {
          return false;
        }
      }
    }
  }
  return true; // Valid placement
}

export {
  previewElementOnBoard,
  deletePreviewElementFromBoard,
  addElementToBoard,
};

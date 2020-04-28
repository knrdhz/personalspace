---
title: Game of Life
date: 2020-04-17
tags:
- Generative
- Algorithms
layout: layout
style: GameOfLife.css
---

<div id="container">
	<button id="startButton">Start</button>
	<button id="pauseButton">Pause</button>
	<br>
	<span id="generationNumber">Generation: 0</span>
	<br>
	<div id="cellContainer"></div>
</div>

<script>
const grid = {};
let cellRows;
let cellColumns;
let paused = false;
let generationNumber = 0;
let generationCounter;

grid.getCell = function (column, row) {
  return grid[`${column}x${row}`];
};

function startGame() {
  console.log("Game Started");
  paused = false;
  let interval = setInterval(nextGeneration, 1);
  generationCounter = document.getElementById("generationNumber");
}

function pauseGame() {
  paused = true;
}

function nextGeneration() {
  if (paused) {
    return;
  }
  const cellsCoordinates = Object.keys(grid);

  for (let i = 0; i < Object.keys(grid).length; i++) {
    let cell = grid[cellsCoordinates[i]];
    let aliveNeighbors = checkNeighbors(cell.column, cell.row);
    if (cell.alive) {
      if (aliveNeighbors < 2) {
        cell.alive = false;
        deactivateCell(cell.column, cell.row);
      } else if (aliveNeighbors > 3) {
        cell.alive = false;
        deactivateCell(cell.column, cell.row);
      }
    } else if (!cell.alive && aliveNeighbors === 3) {
      cell.alive = true;
      activateCell(cell.column, cell.row);
    }
  }

  generationNumber = generationNumber + 1;
  generationCounter.innerHTML = `Generation: ${generationNumber}`;
}

function onClickActivateCell(event) {
  cell = event.target;
  cell.className = "cell alive";
  populateAliveCellsList(cell.column, cell.row);
  checkNeighbors(cell.column, cell.row);
}

function deactivateCell(column, row) {
  document.getElementById(`${column}x${row}`).className = "cell dead";
}

function activateCell(column, row) {
  document.getElementById(`${column}x${row}`).className = "cell alive";
}

function populateAliveCellsList(column, row) {
  grid.getCell(column, row).alive = true;
}

function checkNeighbors(j, i) {
  let aliveNeighbors = 0;
  let neighbors = [
    [j - 1, i - 1],
    [j - 1, i],
    [j - 1, i + 1],
    [j, i - 1],
    [j, i + 1],
    [j + 1, i - 1],
    [j + 1, i],
    [j + 1, i + 1],
  ];

  for (let k = 0; k < neighbors.length; k++) {
    if (
      neighbors[k][0] >= 0 &&
      neighbors[k][0] < cellRows &&
      neighbors[k][1] >= 0 &&
      neighbors[k][1] < cellColumns
    ) {
      let neighborToCheck = grid.getCell(neighbors[k][0], neighbors[k][1]);
      if (neighborToCheck.alive === true) {
        aliveNeighbors++;
      }
    }
  }
  return aliveNeighbors;
}

/* Generate cells */
window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cellContainer");
  const width = container.clientWidth;
  const height = container.clientHeight;
  console.log(`Container dimensions: ${width} x ${height}`);

  const cellsNumber = (width / 10) * (height / 10);
  console.log(`Total number of cells generated: ${cellsNumber}`);
  cellRows = width / 10;
  cellColumns = height / 10;

  for (let i = 0; i < cellRows; i++) {
    for (let j = 0; j < cellColumns; j++) {
      let cell = document.createElement("div");
      cell.id = j + "x" + i;
      cell.column = j;
      cell.row = i;

      /* all cells are dead at the time of generation */
      cell.className = "cell dead";
      cell.clientHeight = height / 10;
      cell.clientWidth = width / 10;
      cell.addEventListener("click", onClickActivateCell, false);
      container.appendChild(cell);

      /* Add cell to grid array */
      const cellGrid = {
        column: j,
        row: i,
        alive: false,
      };
      grid[`${j}x${i}`] = cellGrid;
    }
  }

  document
    .getElementById("startButton")
    .addEventListener("click", startGame, false);

  document
    .getElementById("pauseButton")
    .addEventListener("click", pauseGame, false);
});
</script>

---
title: Game of Life
date: 2020-04-28
tags:
- Generative
- Algorithms
layout: layout
style: game-of-life.css
---

<div id="container">
	<button id="startButton">Start</button>
	<button id="pauseButton">Pause</button>
	<button id="nextGeneration">Next generation</button>
	<br>
	<span id="generationNumber">Generation: 0</span>
	<br>
	<div id="cellContainer"></div>
</div>

Earlier this month a great mathematician [John Conway](https://en.wikipedia.org/wiki/John_Horton_Conway) passed away due to COVID-19. Since few months (years) I wanted to implement his famous Game of Life. It is a cellular automation that is based on the initial state (therefore it's called a zero-player game). Here's a quick recap of the rules:
- It takes place on an infinite 2D grid
- Each square represents a cell
- Each cell can represent one of two states: alive or dead

Now, the lifecycle of the cells is defined by strict rules that define whether it will survive the next turn (generation). They are quite simple but provide the game with unexpected results and shapes. I will just copy-paste them here from [Game of Life Wikipedia page](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life):

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Here's a basic (and highly inefficient) implementation of Conways's **Game of Life**. It is based on a grid of divs representing the cells. It is surprisingly small, as in this particular implementation each generation starts with a thorough check of every single cell (and there are 400 of them!). Click some squares to make the cells 'alive' and press the start button. 

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

function manualNextGeneration() {
	paused = false;
	nextGeneration();
	paused = true;
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
  generationCounter = document.getElementById("generationNumber");
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
    .getElementById("nextGeneration")
    .addEventListener("click", manualNextGeneration, false);

  document
    .getElementById("pauseButton")
    .addEventListener("click", pauseGame, false);
});
</script>

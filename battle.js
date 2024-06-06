const board = document.querySelector("#board");
const boards = [document.querySelector("#board1"), document.querySelector("#board2"), document.querySelector("#board3")];
const position = document.querySelectorAll(".position");
let matrix = [];
let matrices = [[], [], []];
const sizeShip = [5, 4, 3, 2];
const positionArray = ["horizontal", "vertical"];
let quantityShip = [1, 1, 1, 2];
let ship = {};

//Función para creación de tableros
function createMatrix(boardType, matrixType, func, type) {
    for (let i = 0; i < 8; i++) {
        let list = []
        let row = document.createElement("div");
        boardType.appendChild(row);
        row.className = "myRow"
        for (let j = 0; j < 8; j++) {
            let grid = document.createElement("div");
            row.appendChild(grid);
            grid.className = "grid";
            grid.id = i + "," + j + "," + type;
            grid.addEventListener("click", func);
            list.push("");
        }
        matrixType.push(list)
    }
}

//Función para seleccionar barco
function selectShip(event) {
    shipData = event.target.className.split(" ");
    ship.position = shipData[0];
    ship.size = sizeShip[shipData[1]];
    ship.quantity = quantityShip[shipData[1]];
    ship.id = shipData[1];
}

//Creación de tablero jugador
createMatrix(board, matrix, selectPosition, "player");

//Creación de barcos
for (let i = 0; i < position.length; i++) {
    let horizontal = document.createElement("div");
    position[i].appendChild(horizontal);
    horizontal.className = "horizontal " + i;
    horizontal.addEventListener("click", selectShip)
    let vertical = document.createElement("div");
    position[i].appendChild(vertical);
    vertical.className = "vertical " + i;
    vertical.addEventListener("click", selectShip)
}

//Función para seleccionar posición de los barcos
function selectPosition(event) {
    if (ship.quantity > 0) {
        let grid = event.target
        let gridID = grid.id.split(",");
        let x = parseInt(gridID[0]);
        let y = parseInt(gridID[1]);
        if (ship.position === "horizontal") {
            if ((y + (ship.size - 1)) < 10) {
                for (let i = y; i < (y + ship.size); i++) {
                    matrix[x][i] = "ship";
                    document.getElementById(x + "," + i + "," + "player").className += " selected";
                }
                quantityShip[ship.id] -= 1;
                ship = {}
            } else {
                alert("Selecciona una posición válida");
            }
        } else if (ship.position === "vertical") {
            if ((x + (ship.size - 1)) < 10) {
                for (let i = x; i < (x + ship.size); i++) {
                    matrix[i][y] = "ship";
                    document.getElementById(i + "," + y + "," + "player").className += " selected";
                }
                quantityShip[ship.id] -= 1;
                ship = {}
            } else {
                alert("Selecciona una posición válida");
            }
        }
    } else {
        alert("Debes seleccionar un barco disponible");
    }
}

// Guardar configuraciones en archivos .txt
function saveConfiguration() {
    const fs = require('fs');

    // Guardar configuración del tablero del jugador
    fs.writeFileSync('player_board.txt', JSON.stringify(matrix));

    // Guardar configuraciones de los otros tableros
    for (let i = 0; i < 3; i++) {
        fs.writeFileSync(`board${i + 1}_config.txt`, JSON.stringify(matrices[i]));
    }
}

// Crear tableros adicionales desde archivos .txt
function loadBoardConfigurations() {
    const fs = require('fs');

    for (let i = 0; i < 3; i++) {
        let boardConfig = JSON.parse(fs.readFileSync(`board${i + 1}_config.txt`, 'utf8'));
        createMatrix(boards[i], matrices[i], () => {}, `board${i + 1}`);
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                if (boardConfig[x][y] === "ship") {
                    document.getElementById(`${x},${y},board${i + 1}`).className += " selected";
                }
            }
        }
    }
}

// Botón para guardar configuración
document.querySelector("#saveButton").addEventListener("click", saveConfiguration);

// Cargar configuraciones al inicio
loadBoardConfigurations();

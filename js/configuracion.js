document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("matrix-container");

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            //cell.textContent = `${i},${j}`;
            container.appendChild(cell);
        }
    }
});

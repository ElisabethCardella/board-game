import { generateRandomNumber } from './generateRandomNumber.js'

export class Board {
    generate() {
        const numberOfRows = 10;
        const numberOfColums = 10;

        for (let rowIndex = 1; rowIndex <= numberOfRows; rowIndex++) {
            const rowElement = $("<tr></tr>");

            $("#board").append(rowElement);

            for (let cellIndex = 1; cellIndex <= numberOfColums; cellIndex++) {
                const cellElement = $("<td></td>");
                cellElement.prop("id", rowIndex + '-' + cellIndex)
                rowElement.append(cellElement);
            }
        }
    }

    generateObstacles() {
        for (let obstacleIndex = 1; obstacleIndex <= 10; obstacleIndex++) {
            const cellElement = $("#" + generateRandomNumber(1, 10) + "-" + generateRandomNumber(1, 10))
            if (!cellElement.hasClass("inaccessible")) {
                cellElement.addClass("inaccessible")
            }
        }
    }
}
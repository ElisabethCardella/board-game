import { generateRandomNumber } from './generateRandomNumber.js'

export class Board {
    constructor() {
        this.arms = [];
    }

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

    addArm(arm) {
        this.arms.push(arm);
    }

    removeArm(armToBeRemoved) {
        this.arms = this.arms.filter((arm) => arm.name !== armToBeRemoved.name)
    }

    getArm(row, column) {
        return this.arms.find((arm) => arm.row === row && arm.column === column);

    }
}
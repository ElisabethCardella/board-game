import { generateRandomNumber } from './generateRandomNumber.js'

export class Player {
    constructor(name, points, image) {
        this.name = name;
        this.points = points;
        this.image = image;
    }

    create(rowMin, rowMax) {
        const row = generateRandomNumber(rowMin, rowMax);
        const column = generateRandomNumber(1, 10);
        const cellElement = $("#" + row + "-" + column);
        const canCreatePlayer = !cellElement.hasClass("inaccessible") && !cellElement.hasClass("arm");
        if (canCreatePlayer) {
            this.row = row;
            this.column = column;
            cellElement.addClass("player")
            cellElement.css('background-image', "url(" + this.image + ")")
        } else {
            this.create(rowMin, rowMax);
        }
    }

    beginTurn() {
        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row + offset) + "-" + (this.column))
            if (!cellElement.hasClass("inaccessible") && !cellElement.hasClass("player")) {
                cellElement.addClass("clickable")
                cellElement.click((() => {
                    console.log("row " + (this.row + offset));
                    console.log("column " + (this.column));
                }).bind(this));
            } else {
                break
            }
        }

        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row - offset) + "-" + (this.column))
            if (cellElement.hasClass("inaccessible") && cellElement.hasClass("player")) {
                break
            }
            cellElement.addClass("clickable")
        }

        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row) + "-" + (this.column + offset))
            if (cellElement.hasClass("inaccessible") && cellElement.hasClass("player")) {
                break
            }
            cellElement.addClass("clickable")
        }

        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row) + "-" + (this.column - offset))
            if (cellElement.hasClass("inaccessible") && cellElement.hasClass("player")) {
                break
            }
            cellElement.addClass("clickable")
        }
    }
}
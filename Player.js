import { generateRandomNumber } from './generateRandomNumber.js'


export class Player {
    constructor(name, points, image, Arm) {
        this.name = name;
        this.points = points;
        this.image = image;
        this.Arm = Arm;

    }

    setOtherPlayer(otherPlayer) {
        this.otherPlayer = otherPlayer;
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
            cellElement.attr
        } else {
            this.create(rowMin, rowMax);
        }
    }

    beginTurn() {

        // boucle pour mettre en classe cliquable les 3 avant et après de la player"

        //boucle pour aller en haut //

        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row + offset) + "-" + (this.column))
            if (!cellElement.hasClass("inaccessible") && !cellElement.hasClass("player")) {
                cellElement.addClass("clickable")
                cellElement.click((() => {
                    const playerCellElement = $("#" + this.row + "-" + this.column);
                    playerCellElement.removeClass("player");
                    playerCellElement.css('background-image', "none")
                    this.endTurn();

                    const playerNewCellElement = $("#" + (this.row + offset) + "-" + this.column);
                    playerNewCellElement.addClass("player")
                    playerNewCellElement.css('background-image', "url(" + this.image + ")")

                    this.row = this.row + offset;
                    this.column = this.column;
                    console.log("row " + (this.row + offset));
                    console.log("column " + (this.column));


                }).bind(this));
            } else {
                break
            }
        }

        //boucle pour aller en bas //
        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row - offset) + "-" + (this.column))
            if (cellElement.hasClass("inaccessible") && cellElement.hasClass("player")) {
                break
            }
            cellElement.addClass("clickable")
            cellElement.click((() => {
                const playerCellElement = $("#" + this.row + "-" + this.column);
                playerCellElement.removeClass("player");
                playerCellElement.css('background-image', "none")
                this.endTurn();

                const playerNewCellElement = $("#" + (this.row - offset) + "-" + this.column);
                playerNewCellElement.addClass("player")
                playerNewCellElement.css('background-image', "url(" + this.image + ")")

                this.row = this.row - offset;
                this.column = this.column;
                console.log("row " + (this.row - offset));
                console.log("column " + (this.column));

            }).bind(this));
        }

        //boucle pour aller à droite //
        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row) + "-" + (this.column + offset))
            if (cellElement.hasClass("inaccessible") && cellElement.hasClass("player")) {
                break
            }
            cellElement.addClass("clickable")
            cellElement.click((() => {
                const playerCellElement = $("#" + this.row + "-" + this.column);
                playerCellElement.removeClass("player");
                playerCellElement.css('background-image', "none")
                this.endTurn();

                const playerNewCellElement = $("#" + (this.row) + "-" + this.column + offset);
                playerNewCellElement.addClass("player")
                playerNewCellElement.css('background-image', "url(" + this.image + ")")

                this.row = this.row;
                this.column = this.column + offset;
                console.log("row " + (this.row));
                console.log("column " + (this.column + offset));

            }).bind(this));

        }

        //boucle pour aller à gauche //
        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row) + "-" + (this.column - offset))
            if (cellElement.hasClass("inaccessible") && cellElement.hasClass("player")) {
                break
            }
            cellElement.addClass("clickable")
            cellElement.click((() => {
                const playerCellElement = $("#" + this.row + "-" + this.column);
                playerCellElement.removeClass("player");
                playerCellElement.css('background-image', "none")
                this.endTurn();

                const playerNewCellElement = $("#" + (this.row) + "-" + (this.column - offset));
                playerNewCellElement.addClass("player")
                playerNewCellElement.css('background-image', "url(" + this.image + ")")

                this.row = this.row;
                this.column = this.column - offset;
                console.log("row " + (this.row + offset));
                console.log("column " + (this.column - offset));
            }).bind(this));
        }
    }


    endTurn() {

        // boucle pour mettre en classe non cliquable les 3 avant et après de la player"

        //boucle pour aller en haut //
        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row + offset) + "-" + (this.column))
            if (!cellElement.hasClass("inaccessible") && !cellElement.hasClass("player")) {
                cellElement.removeClass("clickable");
                cellElement.off("click");
            }
        }

        //boucle pour aller en bas //
        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row - offset) + "-" + (this.column))
            if (cellElement.hasClass("inaccessible") && cellElement.hasClass("player")) {
                break
            }
            cellElement.removeClass("clickable");
            cellElement.off("click");
        }

        //boucle pour aller à droite //
        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row) + "-" + (this.column + offset))
            if (cellElement.hasClass("inaccessible") && cellElement.hasClass("player")) {
                break
            }
            cellElement.removeClass("clickable");
            cellElement.off("click");
        }

        //boucle pour aller à gauche //
        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row) + "-" + (this.column - offset))
            if (cellElement.hasClass("inaccessible") && cellElement.hasClass("player")) {
                break
            }
            cellElement.removeClass("clickable");
            cellElement.off("click");
        }

        this.otherPlayer.beginTurn();
    }
}
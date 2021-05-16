import { generateRandomNumber } from './generateRandomNumber.js'


export class Player {
    constructor(name, points, image, arm, board) {
        this.name = name;
        this.points = points;
        this.image = image;
        this.arm = arm;
        this.board = board;
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

        } else {
            this.create(rowMin, rowMax);
        }
    }

    movePlayer(newRow, newColumn) {
        const playerCellElement = $("#" + this.row + "-" + this.column);
        playerCellElement.removeClass("player");
        playerCellElement.css('background-image', "none")



        const arm = this.board.getArm(newRow, newColumn);
        if (arm) {
            this.arm = arm;

            var playerArmImageElement = document.getElementById(this.name + 'ArmImage');
            playerArmImageElement.src = arm.image;

            this.board.removeArm(arm);
        }
        this.endTurn(); /*Enlève le fait que qu'on puisse cliquer*/

        const playerNewCellElement = $("#" + (newRow) + "-" + newColumn);
        playerNewCellElement.addClass("player")
        playerNewCellElement.css('background-image', "url(" + this.image + ")")

        this.row = newRow;
        this.column = newColumn;

        this.otherPlayer.beginTurn();
    }

    /*attack() {
        alert("atackalert");
        /*this.otherPlayer.points = this.otherPlayer.points - this.arm.damage;
    };

    defense() {
        alert("defensealert");
        this.otherPlayer.points = this.otherPlayer.points - this.arm.damage;
    };*/



    tryToAttack() {
        console.log(this.name + "le tour est à" + this.otherPlayer.arm.damage)
        const isOtherPlayerBelow = ((this.row + 1) === this.otherPlayer.row) && ((this.column) === this.otherPlayer.column);
        const isOtherPlayerAbove = ((this.row - 1) === this.otherPlayer.row) && ((this.column) === this.otherPlayer.column);
        const isOtherPlayertoTheRight = ((this.row) === this.otherPlayer.row) && ((this.column + 1) === this.otherPlayer.column);
        const isOtherPlayerToTheLeft = ((this.row) === this.otherPlayer.row) && ((this.column - 1) === this.otherPlayer.column);

        if (isOtherPlayerBelow || isOtherPlayerAbove || isOtherPlayertoTheRight || isOtherPlayerToTheLeft) {
            $('#myModal').modal("show");
            var actualPlayer = document.getElementById("actualPlayer");
            actualPlayer.innerHTML = this.name;

            var attackButton = document.getElementById("attackbutton");
            var attackButtonHandler = (function() {
                attackButton.removeEventListener("click", attackButtonHandler)
                defenseButton.removeEventListener("click", defenseButtonHandler)
                this.isDefending = false;
                this.otherPlayer.hurt(this.arm.damage);
                if (this.otherPlayer.points <= 0) {
                    alert(this.name + " " + "a gagné le combat")
                    return
                }
                this.otherPlayer.tryToAttack();
            }).bind(this)
            attackButton.addEventListener("click", attackButtonHandler);


            var defenseButton = document.getElementById("defensebutton");
            var defenseButtonHandler = (function() {
                defenseButton.removeEventListener("click", defenseButtonHandler)
                attackButton.removeEventListener("click", attackButtonHandler)
                this.isDefending = true;
                this.otherPlayer.tryToAttack();
            }).bind(this)
            defenseButton.addEventListener("click", defenseButtonHandler);
        }
    }

    hurt(damage) {
        /*if (this.otherPlayer = this.player1 && this.isDefending) {
            this.arm.damage = this.arm.damage / 2;
        } else if (this.otherPlayer = this.player2 && this.isDefending) {
            this.arm.damage = this.arm.damage / 2;
        }*/

        if (this.isDefending) {
            this.arm.damage = this.arm.damage / 2;
        }
        this.points = this.points - this.arm.damage;


        var playerPoints = document.getElementById(this.name + 'Points');
        playerPoints.innerHTML = (this.points);
    }

    beginTurn() {
        this.tryToAttack();


        // boucle pour mettre en classe cliquable les 3 avant et après de la player //

        //boucle pour aller en haut //

        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row + offset) + "-" + (this.column))
            if (!cellElement.hasClass("inaccessible") && !cellElement.hasClass("player")) {
                cellElement.addClass("clickable")
                cellElement.click((() => {

                    this.movePlayer(this.row + offset, this.column)

                }).bind(this));
            } else {
                break
            }
        }

        //boucle pour aller en bas //
        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row - offset) + "-" + (this.column))
            if (cellElement.hasClass("inaccessible") || cellElement.hasClass("player")) {
                break
            }
            cellElement.addClass("clickable")
            cellElement.click((() => {
                this.movePlayer(this.row - offset, this.column)

            }).bind(this));
        }

        //boucle pour aller à droite //
        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row) + "-" + (this.column + offset))
            if (cellElement.hasClass("inaccessible") || cellElement.hasClass("player")) {
                break
            }
            cellElement.addClass("clickable")
            cellElement.click((() => {
                this.movePlayer(this.row, this.column + offset)
            }).bind(this));

        }

        //boucle pour aller à gauche //
        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row) + "-" + (this.column - offset))
            if (cellElement.hasClass("inaccessible") || cellElement.hasClass("player")) {
                break
            }
            cellElement.addClass("clickable")
            cellElement.click((() => {
                this.movePlayer(this.row, this.column - offset)
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
            if (cellElement.hasClass("inaccessible") || cellElement.hasClass("player")) {
                break
            }
            cellElement.removeClass("clickable");
            cellElement.off("click");
        }

        //boucle pour aller à droite //
        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row) + "-" + (this.column + offset))
            if (cellElement.hasClass("inaccessible") || cellElement.hasClass("player")) {
                break
            }
            cellElement.removeClass("clickable");
            cellElement.off("click");
        }

        //boucle pour aller à gauche //
        for (let offset = 1; offset <= 3; offset++) {
            const cellElement = $("#" + (this.row) + "-" + (this.column - offset))
            if (cellElement.hasClass("inaccessible") || cellElement.hasClass("player")) {
                break
            }
            cellElement.removeClass("clickable");
            cellElement.off("click");
        }


    }
}
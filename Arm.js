import { generateRandomNumber } from './generateRandomNumber.js'

export class Arm {
    constructor(name, damage, image) {
        this.name = name;
        this.damage = damage;
        this.image = image;
    }

    create() {
        const cellElement = $("#" + generateRandomNumber(1, 10) + "-" + generateRandomNumber(1, 10));
        const canCreateArm = !cellElement.hasClass("inaccessible") && !cellElement.hasClass("arm");
        if (canCreateArm) {
            cellElement.addClass("arm")
            cellElement.css('background-image', "url(" + this.image + ")")
        } else {
            this.create();
        }
    }
}
import { generateRandomNumber } from "./generateRandomNumber.js";

export class Arm {
  constructor(name, damage, image) {
    this.name = name;
    this.damage = damage;
    this.image = image;
  }

  create() {
    const row = generateRandomNumber(1, 10);
    const column = generateRandomNumber(1, 10);
    const cellElement = $("#" + row + "-" + column);
    const canCreateArm =
      !cellElement.hasClass("inaccessible") && !cellElement.hasClass("arm");

    if (canCreateArm) {
      cellElement.addClass("arm");
      cellElement.css("background-image", "url(" + this.image + ")");
      this.row = row;
      this.column = column;
    } else {
      this.create();
    }
  }
}

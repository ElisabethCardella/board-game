import { Board } from './Board.js'
import { Arm } from './Arm.js'
import { Player } from './Player.js'

$(document).ready(function() {
    const board = new Board();
    board.generate();
    board.generateObstacles();


    const pistolet = new Arm("pistolet", 2, 'images/pistolet.png');
    pistolet.create();

    const bombe = new Arm("bombe", 4, 'images/bombe.jpg')
    bombe.create();

    const mitraillette = new Arm("mitraillette", 5, "images/mitraillette.jpg")
    mitraillette.create();

    const couteau = new Arm("couteau", 5, "images/couteau.jpg")
    couteau.create();

    const player1 = new Player("player1", 100, "images/player1.jpg");
    player1.create(1, 3);
    player1.beginTurn();


    const player2 = new Player("player2", 100, "images/player2.png");
    player2.create(7, 10);

})
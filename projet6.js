import { Board } from './Board.js'
import { Arm } from './Arm.js'
import { Player } from './Player.js'

$(document).ready(function() {
    const board = new Board();
    board.generate();
    board.generateObstacles();

    const pistolet = new Arm("pistolet", 10, 'images/pistolet.png');
    board.addArm(pistolet);

    const bombe = new Arm("bombe", 10, 'images/bombe.jpg')
    board.addArm(bombe);

    const mitraillette = new Arm("mitraillette", 40, "images/mitraillette.jpg")
    mitraillette.create();
    board.addArm(mitraillette);

    const couteau = new Arm("couteau", 30, "images/couteau.jpg")
    couteau.create();
    board.addArm(couteau);


    const player1 = new Player("Wonderwoman", 100, "images/player1.jpg", pistolet, board);
    player1.create(1, 3);

    const player2 = new Player("Wonderman", 100, "images/player2.png", bombe, board);
    player2.create(7, 10);

    player1.setOtherPlayer(player2);

    player2.setOtherPlayer(player1);

    player1.beginTurn();

    player1.tryToAttack();

    var imgPlayer1 = document.getElementById("WonderwomanArmImage");
    imgPlayer1.src = player1.arm.image;

    var imgPlayer2 = document.getElementById("WondermanArmImage");
    imgPlayer2.src = player2.arm.image;

    var player1points = document.getElementById("WonderwomanPoints");
    player1points.innerHTML = Number(player1.points);

    var player2points = document.getElementById("WondermanPoints");
    player2points.innerHTML = Number(player2.points);

})
# board-game
This project consists of creating an online game in JavaScript in which 2 players take turns to compete. As in Highlander, there can only be one!

1: generation of the map
Start by randomly generating the game map. Each box can be either: Empty Inaccessible (grayed out)
On the map, a limited number of weapons (4 maximum) will be placed randomly and can be collected by players who pass over them. You will invent at least 4 types of weapons in the game, with different damage. The default weapon that equips players is to deal 10 damage. Each weapon has a name and an associated visual. The placement of the two players is also random on the map when the game is loaded. They must not touch each other (they cannot be side by side).

Step 2: the movements
Each turn, a player can move one to three squares (horizontally or vertically) before ending their turn. He obviously cannot pass through an obstacle. >If a player passes over a square containing a weapon, he leaves his current weapon there and replaces it with the new one.

Step 3: the fight!
If players cross paths on adjacent squares (horizontally or vertically), a fight to the death ensues. During a fight, the operation of the game is as follows: Each in turn attacks The damage inflicted depends on the weapon possessed by the player The player can choose to attack or defend against the next shot When the player defends himself, he takes 50% less damage than normal As soon as a player's health (initially 100) drops to 0, that player has lost. A message appears and the game is over.

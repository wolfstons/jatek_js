// Ez a program belépési pontja
// Itt példányosítjuk és indítjuk a játékot

import GameField from "./GameField.js";

// Játék létrehozása (pl. 10x10-es pálya)
const game = new GameField(10, 10);

// Inicializálás meghívása
game.init();
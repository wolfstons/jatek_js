// GameField osztály
// Ez a "játék motor", itt történik minden vezérlés

import Player from "./Player.js";

export default class GameField {
    constructor(width, height) {

        // Pálya mérete (grid)
        this.width = width;
        this.height = height;

        // Játékos létrehozása kezdő pozícióval
        this.player = new Player(0, 0);

        // Tárgyak listája (később töltjük fel)
        this.items = [];

        // HTML elemek lekérése
        this.gameElement = document.getElementById("game");
        this.infoElement = document.getElementById("info");
    }

    // Inicializálás (belépési logika a GameField-en belül)
    init() {
        console.log("Játék inicializálva");

        // Első render meghívása
        this.render();
    }

    // Kirajzolás (egyelőre csak alap infó)
    render() {

        // Játéktér törlése (később ide jön a grid)
        this.gameElement.innerHTML = "";

        // Infó panel frissítése
        this.infoElement.innerHTML = `
            <p>Pozíció: (${this.player.x}, ${this.player.y})</p>
            <p>Inventory méret: ${this.player.inventory.length}</p>
        `;
    }
}
// Player osztály
// A játékos adatait és alap működését tárolja

export default class Player {
    constructor(x, y) {
        // Játékos aktuális pozíciója a pályán
        this.x = x;
        this.y = y;

        // Inventory (felvett tárgyak listája)
        this.inventory = [];

        // A karakter képe (API-ból fog jönni később)
        this.image = null;
    }
}
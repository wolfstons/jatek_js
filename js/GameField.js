import Player from "./Player.js";

export default class GameField {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.player = new Player(0, 0);
    this.items = [];

    this.gameElement = document.getElementById("game");
    this.infoElement = document.getElementById("info");
  }

  async init() {
    console.log("Játék inicializálva");

    this.gameElement.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;

    // 🔹 API betöltése
    await this.fetchCharacter();

    // 🔹 eseménykezelő
    document.addEventListener("keydown", (event) => {
      this.handleInput(event);
    });

    // 🔹 tárgyak
    this.spawnItems(5);

    // 🔹 első render
    this.render();
  }

  render() {
    // 🔹 játéktér törlése
    this.gameElement.innerHTML = "";

    // 🔹 végigmegyünk a grid-en
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // 🔹 cella létrehozása
        const cell = document.createElement("div");
        cell.classList.add("cell");

        // 🔹 van-e itt tárgy?
        const itemHere = this.items.find(
          (item) => item.x === x && item.y === y,
        );

        if (itemHere) {
          cell.textContent = "O";
        }

        // 🔹 itt van-e a játékos?
        // FONTOS: ez legyen a végén
        if (this.player.x === x && this.player.y === y) {
          cell.classList.add("player");

          const img = document.createElement("img");

          // 🔹 aktuális irányhoz tartozó kép
          img.src = this.player.images[this.player.direction];

          img.style.width = "100%";
          img.style.height = "100%";

          // 🔹 BALRA TÜKRÖZÉS
          if (this.player.direction === "left") {
            img.style.transform = "scaleX(-1)";
          }

          cell.appendChild(img);
        }

        // 🔹 hozzáadás a DOM-hoz
        this.gameElement.appendChild(cell);
      }
    }

    // 🔹 infó panel frissítés
    this.infoElement.innerHTML = `
        <p>Pozíció: (${this.player.x}, ${this.player.y})</p>
        <p>Felvett tárgyak: ${this.player.inventory.length}</p>
    `;
  }
  handleInput(event) {
    // 🔹 új pozíció ideiglenes változókba
    let newX = this.player.x;
    let newY = this.player.y;

    // 🔹 billentyű alapján irány meghatározása
    switch (event.key) {
      case "ArrowUp":
        newY--;
        this.player.direction = "up";
        break;

      case "ArrowDown":
        newY++;
        this.player.direction = "down";
        break;

      case "ArrowLeft":
        newX--;
        this.player.direction = "left";
        break;

      case "ArrowRight":
        newX++;
        this.player.direction = "right";
        break;
      default:
        return; // más gombokat ignorálunk
    }

    // 🔹 pályahatár ellenőrzés
    if (this.isInside(newX, newY)) {
      // 🔹 játékos pozíció frissítése
      this.player.x = newX;
      this.player.y = newY;

      // 🔹 megnézzük, van-e itt tárgy
      const index = this.items.findIndex(
        (item) => item.x === newX && item.y === newY,
      );

      if (index !== -1) {
        // 🔹 tárgy hozzáadása inventory-hoz
        this.player.inventory.push(this.items[index]);

        // 🔹 törlés a pályáról
        this.items.splice(index, 1);
      }

      // 🔹 újrarajzolás
      this.render();
    }
  }
  isInside(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }
  spawnItems(count) {
    this.items = [];

    for (let i = 0; i < count; i++) {
      let x, y;

      do {
        x = Math.floor(Math.random() * this.width);
        y = Math.floor(Math.random() * this.height);

        // addig generálunk, amíg nem jó hely
      } while (
        // ne legyen a játékoson
        (x === this.player.x && y === this.player.y) ||
        // ne legyen másik tárgyon
        this.items.some((item) => item.x === x && item.y === y)
      );

      this.items.push({ x, y });
    }
  }
  async fetchCharacter() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon-form/12");
      const data = await response.json();

      // 🔹 több sprite eltárolása
      this.player.images = {
        down: data.sprites.front_default,
        up: data.sprites.back_default,
        right: data.sprites.front_default,
        left: data.sprites.front_default,
      };
    } catch (error) {
      console.error("Hiba:", error);
    }
  }
}

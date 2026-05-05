# 🎮 JavaScript játék projekt

## 📌 Projekt leírás

Ez a projekt egy egyszerű, 2D rács alapú játék, amely HTML, CSS és JavaScript segítségével készült.
A játékos egy karaktert irányít a pályán, miközben véletlenszerűen megjelenő tárgyakat gyűjt össze.

A karakter megjelenése külső API-ból érkezik (PokéAPI), így a játék dinamikusan tölti be a játékos kinézetét.

---

## 🎯 Fő funkciók

* 2D rács alapú játéktér
* Billentyűzettel irányítható karakter (nyilak)
* Véletlenszerűen generált tárgyak
* Tárgyak felvétele és tárolása (inventory)
* Információs panel a játékos adataival
* Külső API használata karakter megjelenítéshez

---

## 🎮 Irányítás

* ⬆️ Fel: felfelé mozgás
* ⬇️ Le: lefelé mozgás
* ⬅️ Bal: balra mozgás
* ➡️ Jobb: jobbra mozgás

---

## 🌐 API használat

A játék a következő API-t használja:

* PokéAPI

A lekérdezés során a program egy Pokémon adatait tölti be, és annak sprite-ját jeleníti meg a játéktéren.

Felhasznált adatok:

* front_default (előre néző kép)
* back_default (hátra néző kép)

Az irányok kezelése:

* fel → hátulnézet
* le → elölnézet
* bal → tükrözött kép
* jobb → alap kép

---

## 🧱 Program felépítése

A program objektumorientált módon készült, két fő osztállyal:

### 🎮 GameField osztály

Feladata:

* játéktér kezelése
* renderelés (megjelenítés)
* input (billentyűk) kezelése
* tárgyak generálása
* API hívás kezelése

### 🧍 Player osztály

Feladata:

* játékos pozíció tárolása
* mozgás kezelése
* inventory kezelése
* karakter megjelenítéséhez szükséges adatok tárolása

---

## 🧩 Működés

1. A játék inicializáláskor létrehozza a játéktért
2. Betölti a karaktert az API-ból
3. Véletlenszerűen elhelyez tárgyakat a pályán
4. A játékos mozog a pályán billentyűkkel
5. Ha a játékos egy tárgyra lép:

   * a tárgy eltűnik
   * bekerül az inventory-ba
6. A játéktér minden lépés után újrarajzolódik

---

## ▶️ Futtatás

1. Nyisd meg az `index.html` fájlt böngészőben
2. Használd a nyílbillentyűket a mozgáshoz

Nincs szükség külön telepítésre.

---

## 📁 Fájlstruktúra

```
projekt/
│
├── index.html
├── style.css
│
└── js/
    ├── index.js
    ├── GameField.js
    └── Player.js
```

---

## 📝 Megjegyzés

A projekt célja a JavaScript alapú játékfejlesztés és az objektumorientált programozás gyakorlása, valamint külső API használatának bemutatása volt.

```mermaid
classDiagram

class GameField {
  - width: number
  - height: number
  - items: Array
  - player: Player
  - gameElement: HTMLElement
  - infoElement: HTMLElement

  + init()
  + render()
  + handleInput(e)
  + isInside(x, y)
  + spawnItems(n)
  + fetchCharacter()
}
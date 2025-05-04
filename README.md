# 🃏 TCG Memory League

**TCG Memory League** is an expanded take on The Odin Project’s memory card game project. Instead of just avoiding duplicate clicks, players **collect cards** by clearing rounds, aiming to complete entire TCG sets.

---

## 📖 Features

* **Collectible Gameplay Loop**
  Progress through 10,000+ Pokémon TCG cards, collecting them by completing memory rounds.

* **Unlockable Sets & Endless Mode**
  Each set unlocks when you’ve collected 75% of the current one; finish a set to unlock endless mode.

* **Dynamic Difficulty**
  Card count scales with progress — from 6 up to 16 cards in normal mode, and beyond in endless mode.

* **Interactive Collection Page**
  View and interact with your collected cards using [react-parallax-tilt](https://www.npmjs.com/package/react-parallax-tilt).

* **Dynamic Audio**
  Page-specific background music and sound effects powered by [Howler.js](https://howlerjs.com/).

* **Local Save System**
  Game progress is saved in your browser’s `localStorage`.
  ⚠ **Note:** Saves are device- and browser-specific; switching devices or browsers won’t transfer progress.

---

## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/tcg-memory-league.git
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173` (or the port shown in your terminal).

---

## ⚙️ Tech Stack

* **React** (with hooks)
* **Tailwind CSS**
* **Howler.js** (audio)
* **React-Parallax-Tilt** (interactive card effects)
* **Vite** (dev server and bundling)

---

## 📌 Gameplay Summary

* Start screen: see 40 random Pokémon TCG cards.
* Choose to play a game or view your collection (initially empty).
* Win rounds by selecting unique cards without repeating clicks.
* Collect cards and unlock new sets as you progress.
* Endless mode offers increasing challenges.
* All progress is saved locally.

---

## 💡 Future Ideas

* Leaderboard / High Scores
* Card details viewer (hover or click)
* Custom themes or card backs

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the game.

---

## 🙌 Acknowledgments

* [The Odin Project](https://www.theodinproject.com/) for the original project idea
* [Pokémon TCG API](https://pokemontcg.io/) for the card data
* All open-source package maintainers whose work made this project possible

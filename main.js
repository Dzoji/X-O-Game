const app = Vue.createApp({
  data() {
    return {
      currentPlayer: "X",
      boxes: Array(9).fill(""),
      highlightedBoxes: [],
      winner: null,
      message: null,
    };
  },
  methods: {
    insertSymbol(index) {
      if (!this.boxes[index] && !this.winner) {
        this.boxes[index] = this.currentPlayer;
        this.checkWinner();
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      }
    },
    checkWinner() {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
          this.boxes[a] &&
          this.boxes[a] === this.boxes[b] &&
          this.boxes[a] === this.boxes[c]
        ) {
          this.highlightedBoxes = lines[i];
          this.winner = this.boxes[a];
          this.message = `Player ${this.winner} has won!`;
          return;
        }
      }

      if (!this.boxes.includes("")) {
        this.message = "It's a tie!";
      }
    },
    reset() {
      this.currentPlayer = "X";
      this.boxes = Array(9).fill("");
      this.highlightedBoxes = [];
      this.winner = null;
      this.message = null;
    },
  },
});

app.mount("#app");

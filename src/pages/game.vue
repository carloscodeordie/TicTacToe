<style>
.container {
  margin: 10rem 0;
}
.board {
  margin: auto auto;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  justify-content: center;
}
.result,
.title {
  text-align: center;
}
</style>

<template>
  <div class="container">
    <div class="title">
      <h1>TIC TAC TOE</h1>
    </div>
    <div class="board">
      <div v-for="(n, i) in 3" :key="i">
        <div v-for="(n, j) in 3" :key="j">
          <space @click="tickCell(i, j)" :value="board.spaces[i][j]"></space>
        </div>
      </div>
    </div>
    <div class="result" v-if="isEnded">
      <h2>{{ resultLabel }}</h2>
    </div>
  </div>
</template>

<script>
import Board from "../components/Board";
import {
  DRAW_TEXT,
  LOSE_TEXT,
  PLAYER_1,
  PLAYER_2,
  WIN_TEXT
} from "../utils/constants";
export default {
  data() {
    return {
      isEnded: false,
      resultLabel: "",
      board: new Board()
    };
  },
  methods: {
    tickCell(x, y) {
      if (this.board.spaces[x][y] !== "") {
        return;
      }

      this.board.spaces[x][y] = PLAYER_1;

      if (this.board.isGameOver()) {
        this.isEnded = true;
        this.resultLabel = this.board.validatePlayerWins(PLAYER_1)
          ? WIN_TEXT
          : DRAW_TEXT;
        return;
      }

      let aiMove = this.calculateAiMove(this.board.clone());
      this.board.move(aiMove.move.x, aiMove.move.y, PLAYER_2);

      if (this.board.isGameOver()) {
        this.isEnded = true;
        this.resultLabel = this.board.validatePlayerWins(PLAYER_2)
          ? LOSE_TEXT
          : DRAW_TEXT;
      }

      this.$forceUpdate();
    },

    calculateAiMove(board) {
      if (board.isGameOver()) {
        return {
          move: null
        };
      }

      let bestMove = null;

      let moves = board.getRemainingSpaces();

      let isValidSpace = true;
      while (isValidSpace) {
        const randomIndex = Math.floor(Math.random() * 9);
        if (moves[randomIndex]) {
          bestMove = moves[randomIndex];
          isValidSpace = false;
        }
      }

      return {
        move: bestMove
      };
    }
  }
};
</script>

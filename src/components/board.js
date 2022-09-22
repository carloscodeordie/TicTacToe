import { PLAYER_1, PLAYER_2 } from "../utils/constants";

export default class Board {
  constructor() {
    this.spaces = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
  }

  move(x, y, player) {
    if (this.spaces[x][y] !== "") {
      return false;
    }

    this.spaces[x][y] = player;
    return true;
  }

  getScore() {
    let score = 0;
    if (this.validatePlayerWins(PLAYER_1)) {
      score -= 100;
    }
    if (this.validatePlayerWins(PLAYER_2)) {
      score += 100;
    }
    return score;
  }

  validatePlayerWins(player) {
    for (let i = 0; i < 3; i++) {
      if (
        this.spaces[0][i] === player &&
        this.spaces[1][i] === player &&
        this.spaces[2][i] === player
      ) {
        return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        this.spaces[i][0] === player &&
        this.spaces[i][1] === player &&
        this.spaces[i][2] === player
      ) {
        return true;
      }
    }

    if (
      this.spaces[0][0] === player &&
      this.spaces[1][1] === player &&
      this.spaces[2][2] === player
    ) {
      return true;
    }
    if (
      this.spaces[0][2] === player &&
      this.spaces[1][1] === player &&
      this.spaces[2][0] === player
    ) {
      return true;
    }

    return false;
  }

  isGameOver() {
    const noMoreMoves = this.getRemainingSpaces().length === 0;
    const player1Wins = this.validatePlayerWins(PLAYER_1);
    const player2Wins = this.validatePlayerWins(PLAYER_2);
    return noMoreMoves || player1Wins || player2Wins;
  }

  clone() {
    let clone = new Board();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        clone.spaces[i][j] = this.spaces[i][j];
      }
    }
    return clone;
  }

  getRemainingSpaces() {
    let moves = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.spaces[i][j] === "") {
          moves.push({ x: i, y: j });
        }
      }
    }
    return moves;
  }
}

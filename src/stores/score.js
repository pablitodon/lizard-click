import { updateScore } from "@/api/app";
import debounce from "lodash.debounce";
import { defineStore } from "pinia";

const baseLevelScore = 25;

const levels = new Array(15)
  .fill(0)
  .map((_, i) => baseLevelScore * Math.pow(2, i));

const levelScores = levels.map((_, level) => {
  const index = levels.findIndex((_, i) => i >= level);
  return levels.slice(0, index + 1).reduce((a, b) => a + b, 0);
});

const computeLevelByScore = (score) => {
  for (const [index, value] of levelScores.entries()) {
    if (score <= value) {
      return {
        level: index,
        value: levels[index],
      };
    }
  }
};

export const useScoreStore = defineStore("score", {
  state: () => ({
    score: 0,
    debounceUpdateScore: debounce((score) => updateScore(score), 500),
  }),
  getters: {
    level: (state) => computeLevelByScore(state.score),
    currentScore(state) {
      if (this.level.level === 0) {
        return state.score;
      }
      return state.score - levelScores[this.level.level - 1];
    },
  },
  actions: {
    add(score = 1) {
      this.score += score;
      this.debounceUpdateScore(this.score);
    },
    setScore(score) {
      this.score = score;
    },
  },
});

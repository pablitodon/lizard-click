import {
  completeTask,
  getOrCreateUser,
  registerRef,
  fetchTasks,
} from "@/api/app";
import { defineStore } from "pinia";
import { useScoreStore } from "./score";

export const useAppStore = defineStore("app", {
  state: () => ({
    user: {},
    tasks: [],
  }),
  actions: {
    async init(ref) {
      this.user = await getOrCreateUser();
      const score = useScoreStore();
      score.setScore(this.user.score);

      if (ref && +ref !== +this.user.telegram) {
        await registerRef(this.first_name, ref);
      }
    },
    async completeTask(task) {
      await completeTask(this.user, task);
    },
    async fetchTasks() {
      this.tasks = await fetchTasks();
    },
  },
});

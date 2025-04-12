<template>
  <div class="text-content">
    <h1>Your Friends</h1>

    <div class="center">
      <button class="referal" @click="copy">{{ referalText }}</button>
    </div>

    <h3 v-if="friends.length === 0">No friends yet</h3>

    <ul class="list">
      <li v-for="friend in friends" :key="friend.id" class="list-item">
        {{ friend.name }}
        <span class="list-btn done">50</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
import { useTelegram } from "@/services/telegram";
import { computed, ref } from "vue";

const app = useAppStore();
const { user } = useTelegram();
console.log(app);

const referalText = ref("Your referal");
//
const friends = computed(() =>
  Object.keys(app.user.friends).map((id) => ({
    id,
    name: app.user.friends[id],
  }))
);

const copy = () => {
  navigator.clipboard.writeText(
    `https://t.me/LizardClacClaclClickerBot?start=${user?.id}`
  );
  referalText.value = "Copied!";
};
</script>

<template>
  <div class="game-container">
    <ScoreProgress />
    <div class="header">
      <img src="../assets/coin.png" alt="coin" />
      <h2 class="score" id="score">{{ store.score }}</h2>
    </div>
    <div class="circle">
      <img @click="increment" ref="img" id="circle" :src="imgSrc" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ScoreProgress from "@/components/ScoreProgress.vue";
import { useScoreStore } from "../stores/score";
const img = ref(null);
import frog from "@/assets/frog.png";
import lizzard from "@/assets/lizzard.png";

const imgSrc = computed(() => (store.score > 25 ? lizzard : frog));

const store = useScoreStore();
function increment(event) {
  store.add(1);
  //Получаем позицию и размер элемента
  const rect = event.target.getBoundingClientRect();
  // Вычисляем смещение клика от центра элемента
  const offfsetX = event.clientX - rect.left - rect.width / 2;
  const offfsetY = event.clientY - rect.top - rect.height / 2;

  const DEG = 40;
  const tiltX = (offfsetY / rect.height) * DEG; // Наклон по вертикали
  const tiltY = (offfsetX / rect.width) * -DEG; // Наклон по горизонтали (с инверсией)

  img.value.style.setProperty("--tiltX", `${tiltX}deg`);
  img.value.style.setProperty("--tiltY", `${tiltY}deg`);

  // Возвращаем картинку в исходное положение
  setTimeout(() => {
    img.value.style.setProperty("--tiltX", `0deg`);
    img.value.style.setProperty("--tiltY", `0deg`);
  }, 300);

  // Создаём эффект "+1" в месте клика
  const plusOne = document.createElement("div");
  plusOne.classList.add("plus-one");
  plusOne.textContent = "+1";
  plusOne.style.left = `${event.clientX - rect.left}px`; // Позиция X внутри элемента
  plusOne.style.top = `${event.clientY - rect.top}px`; // Позиция Y внутри элемента
  img.value.parentElement.appendChild(plusOne);

  // Удаляем "+1"
  setTimeout(() => plusOne.remove(), 2000);
}
</script>

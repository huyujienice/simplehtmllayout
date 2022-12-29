export const txt1 = `<template simplehtmllayout>
<PageCommonFrame @onPullDownRefresh="onPullDownRefresh">
  <div class="home">
    <h1>preload page</h1>
    <h2 @click.stop="backtoHome">back to home page</h2>
    <div class="list_main" id="scrollListMian">
      <p v-for="n in 20" :key="n">{{ n }}</p>
    </div>
    <template>
      <div class="w-100.2 h-100.1 test1 sticky-200.2-99.9-0.1-10-1"></div>
    </template>
    <div class="w-200 h-200.1"></div>
  </div>
</PageCommonFrame>
</template>

<script setup lang="ts">
import PageCommonFrame from "@/components/PageCommonFrame/pageCommonFrame.vue";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const bottomDistance = 100;
let isInBottom = false;
let bottomCounter;

let maxTopDistance = 60;
let isInTop = false;
let topCounter;
let scrollTop = 0;

function backtoHome(): void {
router.back();
}
function onPullDownRefresh() {
}

onMounted(() => {
const query = route.query;
});
</script>
<style lang="scss" scoped>
.list_main {
width: 100px;
height: 500px;
overflow-y: auto;
p {
  background-color: azure;
}
}
.test1 {
background-color: aqua;
}
.h-100_1 {
height: 100px;
}
</style>

`;

<script setup lang="ts">
import Navigation from "./components/nav/navigation.vue";
</script>

<template>
  <div class="app">
    <navigation></navigation>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "style";
.app{
  display: flex;
  flex-direction: column;
}
</style>

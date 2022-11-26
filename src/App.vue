<script setup lang="ts">
import Navigation from "./components/nav/navigation.vue";
</script>

<template>
  <div class="app">
    <navigation></navigation>
    <router-view v-slot="{ Component, route}">
      <keep-alive>
        <component
            :is="Component"
            :key="$route.name" 
            v-if="$route.meta.keepAlive"
        />
      </keep-alive>
      <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
    </router-view>
  </div>
</template>

<style lang="scss">
@import "style";
.app{
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <div class="bannerContainer">
    <banner-item1></banner-item1>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import BannerItem1 from "./bannerItem1.vue";

export default defineComponent({
  components: {BannerItem1},
  setup() {

    return {}
  }
})
</script>

<style scoped lang="scss">
.bannerContainer{
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
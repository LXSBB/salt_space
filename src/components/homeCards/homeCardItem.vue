<template>
  <div :class="{'homeCardItemWrap':true,'isHover':isHover}">
    <div class="homeCardTitleWrap" @mouseenter="isHover = true" @mouseleave="isHover = false">
      <my-title1 :title="`JavaScript base`"></my-title1>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import MyTitle1 from "../myTitle/myTitle1.vue";

export default defineComponent({
  components: {MyTitle1},
  setup() {
    let isHover = ref(false)
    return {isHover}
  }
})
</script>

<style scoped lang="scss">
.homeCardItemWrap{
  height: 300px;
  border: 1px solid #e1dfdf;
  border-radius: 5px;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all .3s;
  .homeCardTitleWrap{
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
.isHover{
  box-shadow:  0 3px 8px  rgba(0,0,0,0.24);
  transform: translateY(-2%);
}
@media screen and (max-width: 1350px) {
  .homeCardItemWrap {
   height: 400px;
  }
}



</style>
<template>
  <div class="bannerContainer">
    <span>Welcome!</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  setup() {

    return {}
  }
})
</script>

<style scoped lang="scss">
.bannerContainer{
  width: 100%;
  height: 250px;
  background: linear-gradient(to right, #feac5e, #c779d0, #4bc0c8);
  background-size: 400% 400%;
  animation: Gradient 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;

  //background-image: url("../../assets/image/mountains.jpg");
  //background-size: 100% ;
  //background-repeat: no-repeat;
  span{
    width: 100%;
    font-size: 8vw;
    text-align: center;
    background:linear-gradient(to right, #feac5e, #c779d0, #4bc0c8) ;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
}
@keyframes Gradient {
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
}

</style>
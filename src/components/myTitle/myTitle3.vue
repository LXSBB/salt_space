<template>
  <div class="myTitleContainer">
    <div class="titleSpan" v-rainBow="props.title"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  props:{
    title:String
  },
  setup(props) {

    return {props}
  }
})
</script>

<style scoped lang="scss">
.myTitleContainer{
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #feac5e, #c779d0, #4bc0c8);
  background-size: 400% 400%;
  animation: Gradient 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  .titleSpan{
    width: 100%;
    font-size: 20px;
    text-align: center;
    //ackground:linear-gradient(to right, #feac5e, #c779d0, #4bc0c8) ;
    //-webkit-text-fill-color: transparent;
    //-webkit-background-clip: text;
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
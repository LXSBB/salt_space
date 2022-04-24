<template>
  <div class="myTitle2Container">
    <span class="textSpan">{{props.title}}</span>
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
.myTitle2Container{
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  .textSpan{
    user-select: none;
    text-align: center;
    font-size: 20px;
    color: white;
    text-shadow: -1px -1px 0 #ff004f,  1px 1px 0 cyan;
    letter-spacing: 0.05em;
    animation: run 0.8s cubic-bezier(1,-1.91,0,2.79) 0s infinite normal  ;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  @keyframes run {
    33% {
      text-shadow: 1px -1px 0 #ff004f,-1px 1px 0 #00f7ef
    }
    66% {
      text-shadow: -1px 1px 0 #ff004f,1px -1px 0 #00f7ef
    }
    100% {
      text-shadow: 1px 1px 0 #ff004f,-1px -1px 0 #00f7ef
    }
  }
}
</style>
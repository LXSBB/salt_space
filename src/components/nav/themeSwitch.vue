<template>
  <div class="daySwitchWrap">
    <div class="daySwitch" @click="themeChange">
      <div class="star star1" v-if="themeComputed === 'dark'"></div>
      <div class="star star2" v-if="themeComputed === 'dark'"></div>
      <div class="star star3" v-if="themeComputed === 'dark'"></div>
      <div class="star star4" v-if="themeComputed === 'dark'"></div>
      <div class="star star5" v-if="themeComputed === 'dark'"></div>
      <svg-icon  name="cloud" color="rgba(228, 238, 241, 0.73)" v-if="themeComputed === 'light'"></svg-icon>
      <div :class="[ 'sky' ,themeComputed === 'light'?'skyLight': 'skyDark']"></div>
      <div
          :class="{'sunMoon': true, 'sun':themeComputed === 'light', 'moon': themeComputed === 'dark'}"
      >
        <svg-icon class="sun" name="sun" v-if="themeComputed === 'light'"></svg-icon>
        <div class="crater crater1"></div>
        <div class="crater crater2"></div>
        <div class="crater crater3"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, computed, onMounted} from 'vue'
import { useRouter } from 'vue-router';
import {homeStore} from "@/store/home_store";
const router = useRouter();
const useHomeStore = homeStore();

const themeComputed = computed(() => {
  return useHomeStore.theme
})
onMounted(() => {
  //初始化主题
  const theme = localStorage.getItem('theme')
  useHomeStore.theme = theme
  document.documentElement.setAttribute('data-theme', theme || 'light');

})
//切换主题
function themeChange() {
  useHomeStore.theme = useHomeStore.theme === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', useHomeStore.theme)
  document.documentElement.setAttribute('data-theme', useHomeStore.theme);
}

</script>

<style scoped lang="scss">
.daySwitchWrap{
  opacity: .65;
  .daySwitch{
    width: 65px;
    height: 26px;
    border-radius: 25px;
    box-shadow: 0 15px 10px -10px rgb(0 0 0 / 20%), 0 5px 10px rgb(0 0 0 / 10%);
    overflow: hidden;
    position: relative;
    z-index: 4;
    cursor: pointer;
    .sky{
      width: 65px;
      height: 26px;
      border-radius: 25px;
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(0,0);
      transition: all .5s;
    }
    .skyLight{
      background: #5ebedb;
    }
    .skyDark{
      left: 50%;
      top: 10%;
      width: 5px;
      height: 5px;
      border-radius: 5px;
      transform: translate(20px,5px);
      background: #5ebedb;
      animation: skyAnim 3s -.4s linear infinite;
    }
    .sunMoon{
      position: absolute;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
      transition: all .3s;
    }
    .sun{
      //background: #ffdf61;
      //border: 2px solid #d9b31c;
      left: calc(100% - 25px);
    }
    .icon-cloud{
      height: 20px;
      width: 20px;
      position: absolute;
      z-index: 5;
      top: 25%;
      animation: cloudAnim 5s linear infinite;
    }
    .sunMoon{
      .svg-icon{
        height: 20px;
        width: 20px;
        animation: sunAnim 5s linear infinite;
      }
    }
    .moon{
      background: #f0e1a5;
      border: 5px;
      left: 5px;
      .crater{
        background: #ccc091;
        width: 5px;
        height: 5px;
        border-radius: 13px;
        position: absolute;
      }
      .crater1{
        left: 30%;
        top: 45%;
        transform: scale(.5);
      }
      .crater2{
        left: 55%;
        top: 60%;
        transform: scale(.7);
      }
      .crater3{
        left: 50%;
        top: 20%;
        transform: scale(1);
      }
    }
    .star{
      background: #5ebedb;
      width: 7px;
      height: 7px;
      border-radius: 7px;
      position: absolute;
      left: 50%;
      top: 10%;
    }
    .star1{
      transform: translate(10px,15px) scale(.3);
      animation: starAnim1 3s -2.4s linear infinite;
    }
    .star2{
      transform: translate(15px,-7px) scale(.6);
      animation: starAnim2 3s -1.1s linear infinite;
    }
    .star3{
      transform: translate(35px,-12px) scale(.9);
      animation: starAnim3 3s -1.5s linear infinite;
    }
    .star4{
      transform: translate(30px,12px) scale(.4);
      animation: starAnim4 3s -1.9s linear infinite;
    }
    .star5{
      transform: translate(0,0) scale(.6);
      animation: starAnim5 3s -2.8s linear infinite;
    }
  }
}
@keyframes sunAnim {
  0%{
    transform: rotate(0) scale(1);
  }
  50%{
    transform: rotate(180deg) scale(1.2);
  }
  100%{
    transform: rotate(360deg) scale(1);
  }
}
@keyframes cloudAnim {
  0%{
    left: -20px;
    opacity:.5;
  }
  50%{
    left: 60%;
    opacity:.7;
  }
  100%{
    left: 100%;
    opacity:1;
  }
}
@keyframes skyAnim {
  0% {
    transform: translate(15px,30px) scale(1);
  }
  20% {
    transform: translate(18px,17px) scale(1);
  }
  50% {
    transform: translate(20px,0) scale(1);
  }
  80% {
    transform: translate(18px,-17px) scale(1);
  }
  100% {
    transform: translate(15px,-30px) scale(1);
  }
}
@keyframes starAnim1 {
  0% {
    transform: translate(5px,30px) scale(.3)
  }
  20% {
    transform: translate(8px,17px) scale(.3);
  }
  50% {
    transform: translate(10px,0) scale(.3);
  }
  80% {
    transform: translate(8px,-17px) scale(.3)
  }
  100% {
    transform: translate(5px,-30px) scale(.3)
  }
}
@keyframes starAnim2 {
  0% {
    transform: translate(10px,30px) scale(.6);
  }
  20% {
    transform: translate(13px,17px) scale(.6);
  }
  50% {
    transform: translate(15px,0) scale(.6);
  }
  80% {
    transform: translate(13px,-17px) scale(.6);
  }
  100% {
    transform: translate(10px,-30px) scale(.6);
  }
}
@keyframes starAnim3 {
  0% {
    transform: translate(30px,30px) scale(.9);
  }
  20% {
    transform: translate(33px,17px) scale(.9);
  }
  50% {
    transform: translate(35px,0) scale(.9);
  }
  80% {
    transform: translate(33px,-17px) scale(.9);
  }
  100% {
    transform: translate(30px,-30px) scale(.9);
  }
}
@keyframes starAnim4 {
  0% {
    transform: translate(25px,30px) scale(.4);
  }
  20% {
    transform: translate(28px,17px) scale(.4);
  }
  50% {
    transform: translate(30px,0) scale(.4);
  }
  80% {
    transform: translate(28px,-17px) scale(.4);
  }
  100% {
    transform: translate(25px,-30px) scale(.4);
  }
}
@keyframes starAnim5 {
  0% {
    transform: translate(0,30px) scale(.6);
  }
  20% {
    transform: translate(3px,17px) scale(.6);
  }
  50% {
    transform: translate(5px,0) scale(.6);
  }
  80% {
    transform: translate(3px,-17px) scale(.6);
  }
  100% {
    transform: translate(0,-30px) scale(.6);
  }
}
</style>
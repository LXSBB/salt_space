<template>
  <div :class="{'navContainer':true,'navContainerDown':!isTop}">
    <div class="iconWrap">
      <img class="navIcon" src="../../assets/image/icon.png" alt="">
      <span :class="{'iconText':true,'iconTextTop':isTop}">Salt-Space</span>
    </div>
    <div class="contentWrap">
      <div class="linkWrap">
        <span :class="{'inTopSpan':isTop}">Home</span>
        <div class="hoverBox _center"></div>
        <div :class="{'hoverBox':true,'hoverBoxTop':isTop}"></div>
      </div>
<!--      <div class="linkWrap">-->
<!--        <span :class="{'inTopSpan':isTop}">LifeStyle</span>-->
<!--        <div class="hoverBox _center"></div>-->
<!--        <div :class="{'hoverBox':true,'hoverBoxTop':isTop}"></div>-->
<!--      </div>-->
<!--      <div class="linkWrap">-->
<!--        <span :class="{'inTopSpan':isTop}">GameCenter</span>-->
<!--        <div class="hoverBox _center"></div>-->
<!--        <div :class="{'hoverBox':true,'hoverBoxTop':isTop}"></div>-->
<!--      </div>-->
<!--      <div class="linkWrap">-->
<!--        <span :class="{'inTopSpan':isTop}">Study</span>-->
<!--        <div class="hoverBox _center"></div>-->
<!--        <div :class="{'hoverBox':true,'hoverBoxTop':isTop}"></div>-->
<!--      </div>-->
      <div class="linkWrap" @click="clickShowLgoInBox">
        <span :class="{'inTopSpan':isTop}">Log in</span>
        <div class="hoverBox _center"></div>
        <div :class="{'hoverBox':true,'hoverBoxTop':isTop}"></div>
      </div>
    </div>
    <log-in-box v-if="showLgoInBox"></log-in-box>
  </div>
</template>

<script lang="ts">
import {defineComponent,onMounted,ref} from 'vue';
import bus from 'vue3-eventbus'
import LogInBox from "./logInBox.vue";

export default defineComponent({
  components: {LogInBox},
  setup() {
    let isTop = ref(true)
    onMounted(()=>{
      bus.on('closeLoginBox',()=>{
        showLgoInBox.value = false
      })
      window.addEventListener('scroll',() => {
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        isTop.value = scrollTop <= 30
      })
    })
    let showLgoInBox = ref(false)
    function clickShowLgoInBox() {
      showLgoInBox.value = true
    }
    return {
      showLgoInBox,
      clickShowLgoInBox,
      isTop
    }
  }
})
</script>

<style scoped lang="scss">
@import "src/style/universal";
.navContainer{
  min-width: 1000px;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 9999;
  transition: all .3s;
  .iconWrap{
    height: 40px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    .navIcon{
      height: 40px;
      width: 40px;
    }
    .iconText{
      transition: all .5s;
      font-size: 16px;
      margin-left: 5px;
    }
    .iconTextTop{
      color: white;
    }
  }
  .contentWrap{
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 20px;
    .linkWrap{
      margin: 0 10px;
      cursor: pointer;
      font-size: 16px;
      span{
        transition: all .5s;
      }
      .hoverBox{
        height: 0;
        background-color: black;
        transition: height .2s;
        transform-origin: bottom;
      }
      .hoverBoxTop{
        background-color: white;
      }
      ._center{
        background-color: rgba(255, 255, 255, 0);
      }
    }
    .linkWrap:hover {
      .hoverBox{
        height: 3px;
      }
    }
  }
}
.inTopSpan{
  color: white;
}
.navContainerDown{
  box-shadow: 0 3px 5px  rgba(0,0,0,0.04);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background-color: rgba(108, 107, 107, 0.1);
}
</style>
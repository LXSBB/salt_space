<template>
  <div class="navContainer">
    <div class="iconWrap"></div>
    <div class="contentWrap">
      <div class="linkWrap">
        <span>PhotoWall</span>
        <div class="hoverBox _center"></div>
        <div class="hoverBox "></div>
      </div>
      <div class="linkWrap">
        <span>GameCenter</span>
        <div class="hoverBox _center"></div>
        <div class="hoverBox "></div>
      </div>
      <div class="linkWrap">
        <span>Study</span>
        <div class="hoverBox _center"></div>
        <div class="hoverBox "></div>
      </div>
      <div class="linkWrap" @click="clickShowLgoInBox">
        <span>Log in</span>
        <div class="hoverBox _center"></div>
        <div class="hoverBox "></div>
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
    onMounted(()=>{
      bus.on('closeLoginBox',()=>{
        showLgoInBox.value = false
      })
    })
    let showLgoInBox = ref(false)
    function clickShowLgoInBox() {
      showLgoInBox.value = true
    }
    return {
      showLgoInBox,
      clickShowLgoInBox
    }
  }
})
</script>

<style scoped lang="scss">
.navContainer{
  width: 100%;
  height: 70px;
  border: 1px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .iconWrap{
    height: 40px;
    width: 100px;
    border: 1px solid red;
    margin-left: 20px;
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
      }
      .hoverBox{
        height: 0;
        background-color: black;
        transition: height .2s;
        transform-origin: bottom;
      }
      ._center{
        background-color: white;
      }
    }
    .linkWrap:hover {
      .hoverBox{
        height: 3px;
      }
    }
  }
}
</style>
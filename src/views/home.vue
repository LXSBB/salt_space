<template>
  <div class="homeContainer">
      <div class="articleNavWrap">
        <div class="userInfoWrap">

        </div>
        <div class="articleTitleWrap">

        </div>
        <div class="articleTitleWrap">

        </div>
      </div>
      <div class="articleContent">
        <div class="articleCard">

        </div>
        <div class="articleCard">

        </div>
        <div class="articleCard">

        </div>
        <div class="articleCard">

        </div>
        <div class="articleCard">

        </div>
        <div class="articleCard">

        </div>
        <div class="articleCard">

        </div>
        <div class="articleCard">

        </div>
        <div class="articleCard">

        </div>
      </div>
      <div class="labelNavWrap">
        <div class="topicCanvasWrap">
          <span class="topicCanvasTitle">Click Me! (✿◡‿◡)</span>
          <tag-canvas/>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import {defineComponent,ref} from 'vue';
import {useHomeStore} from "../store/home_store";
import bus from 'vue3-eventbus'
import HeaderBanner from "../components/headerBanner/headerBanner.vue";
import HomeFooter from "../components/homeComponent/homeFooter/homeFooter.vue";
import HomeCards from "../components/homeComponent/homeCards/homeCards.vue";
import TagCanvas from "@/components/homeComponent/tagCanvas.vue";

export default defineComponent({
  components: {TagCanvas, HomeCards, HomeFooter, HeaderBanner},
  setup() {
    const homeStore:any = useHomeStore()
    const myNum = ref(1)

    // function click() {
    //   bus.emit('kkk',111)
    //   // homeStore.$patch((state:any) => {
    //   //   state.num++
    //   //   myNum.value = state.num
    //   // })
    //
    //   //homeStore.num++
    //   // homeStore.countPlusOne(100)
    // }

    return {
      homeStore,
      myNum,
      //click
    }
  }
})
</script>

<style scoped lang="scss">
@import "src/style/universal";
.homeContainer{
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: $background-color;
  padding-top: 100px;
  padding-left: 40px;
  padding-right: 40px;
  .articleNavWrap{
    position: fixed;
    top: 100px;
    max-height: 80vh;
    left: 120px;
    width: 300px;
    display: flex;
    flex-direction:column ;
    .articleTitleWrap{
      width: 100%;
      height: 30vh;
      background-color: $card-background-color;
      border-radius: 5px;
      box-shadow: 1px 3px 12px 9px rgba(0,0,0,0.04);
      margin-bottom: 20px ;
    }
    .userInfoWrap{
      @extend .articleTitleWrap;
      height: 15vh;
    }

  }
  .articleContent{
    width: 1000px;
    margin: 0 40px;
    .articleCard{
      width: 100%;
      background-color: $card-background-color;
      border-radius: 5px;
      box-shadow: 1px 3px 12px 9px rgba(0,0,0,0.04);
      margin-bottom: 20px ;
      height: 160px;
    }
  }
  .labelNavWrap{
    position: fixed;
    top: 100px;
    right: 120px;
    width: 300px;
    .topicCanvasWrap{
      width: 100%;
      background-color: $card-background-color;
      border-radius: 5px;
      box-shadow: 1px 3px 12px 9px rgba(0,0,0,0.04);
      margin-bottom: 20px ;
      height: 45vh;
      display: flex;
      flex-direction: column;
      .topicCanvasTitle{
        display: inline-block;
        height: 20px;
        margin: 10px 0 0 10px;
        color: #524db7;
      }
    }
  }
}
</style>
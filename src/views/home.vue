<template>
  <div class="homeContainer">
      <div class="articleNavWrap">
        <div class="userInfoWrap">
          <div class="userName">
            <img src="../assets/image/icon.png" alt="">
            <div class="userNameSpan">
              <b>LXSSG</b>
              <span>前端</span>
            </div>
          </div>
          <div class="userContent">
            <div class="userinfoArea">
              <span class="userinfoAreaNumber">100</span>
              <span class="userinfoAreaType">文章</span>
            </div>
            <div class="userinfoArea">
              <span class="userinfoAreaNumber">100</span>
              <span class="userinfoAreaType">点赞</span>
            </div>
            <div class="userinfoArea">
              <span class="userinfoAreaNumber">100</span>
              <span class="userinfoAreaType">访问</span>
            </div>
          </div>
        </div>
        <div class="articleTitleWrap">
          <div class="articleTitleNav">
            <img src="../assets/image/new.png" alt="">
            <span>最新文章</span>
          </div>
          <div class="articleTitleTo"
               :style="{backgroundColor:index % 2 === 1 ? 'rgba(178, 176, 176, 0.1)' : ''}"
               v-for="(item,index) in 8">
            <span>JavaScript高级程序设计随笔(一)</span>
          </div>
        </div>
        <div class="articleTitleWrap">
          <div class="articleTitleNav">
            <img src="../assets/image/hot.png" alt="">
            <span>最热文章</span>
          </div>
          <div class="articleTitleTo"
               :style="{backgroundColor:index % 2 === 1 ? 'rgba(178, 176, 176, 0.1)' : ''}"
               v-for="(item,index) in 8">
            <span>JavaScript高级程序设计随笔(一)</span>
          </div>
        </div>
      </div>
      <div class="articleContent">
        <workentry-card v-for="item in 10"></workentry-card>
      </div>
      <div class="labelNavWrap">
        <div class="topicCanvasWrap">
          <tag-canvas/>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {useHomeStore} from "../store/home_store";
import bus from 'vue3-eventbus'
import HeaderBanner from "../components/headerBanner/headerBanner.vue";
import HomeFooter from "../components/homeComponent/homeFooter/homeFooter.vue";
import HomeCards from "../components/homeComponent/homeCards/homeCards.vue";
import TagCanvas from "@/components/homeComponent/tagCanvas.vue";
import WorkentryCard from "@/components/homeComponent/workentryCard.vue";
import {UserService} from "@/api/userService";

export default defineComponent({
  components: {WorkentryCard, TagCanvas, HomeCards, HomeFooter, HeaderBanner},
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
    onMounted(() => {
      UserService.login({username:"zdf",password:"12345678"})
        .then(res => {
          // console.log(JSON.parse(res.data))
          console.log(res.data)
        })
    })
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
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .articleTitleNav{
        height: 12%;
        width: 100%;
        background-color: $card-background-color-b;
        display: flex;
        align-items: center;
        padding-left: 20px;
        img{
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }
      .articleTitleTo{
        width: 100%;
        height: 11%;
        border-bottom:1px dashed #b3b3c5;
        display: flex;
        align-items: center;
        padding-left: 25px;
        color: #666666;
      }
    }
    .userInfoWrap{
      @extend .articleTitleWrap;
      height: 15vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .userName{
        width: 100%;
        height: 45%;
        display: flex;
        justify-content: space-between;
        padding: 10px 30px 0 30px;
        img{
          width: 50px;
          height: 50px;
          border: 1px solid black;
          border-radius: 50%;
        }
        .userNameSpan{
          display: flex;
          width: 150px;
          height: 50px;
          justify-content: center;
          flex-direction: column;
          b{
            font-size: 16px;
          }
        }
      }
      .userContent{
        width: 100%;
        height: 35%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40px 10px 40px;
        .userinfoArea{
          display: flex;
          flex-direction: column;
          align-items: center;
          span{
            font-size: 14px;
          }
        }
      }
    }

  }
  .articleContent{
    width: 1000px;
    margin: 0 40px;
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
    }
  }
}
</style>
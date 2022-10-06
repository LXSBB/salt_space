<template>
  <div class="homeContainer">
      <div class="articleNavWrap">
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
        <workentry-card v-for="item in articlesList" :info="item" :key="item.id"></workentry-card>
      </div>
      <div class="labelNavWrap">
        <div class="topicCanvasWrap">
          <tag-canvas/>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, ref} from 'vue';
import {useHomeStore} from "../store/home_store";
import bus from 'vue3-eventbus'
import HeaderBanner from "../components/headerBanner/headerBanner.vue";
import HomeFooter from "../components/homeComponent/homeFooter/homeFooter.vue";
import HomeCards from "../components/homeComponent/homeCards/homeCards.vue";
import TagCanvas from "@/components/homeComponent/tagCanvas.vue";
import WorkentryCard from "@/components/homeComponent/workentryCard.vue";
import { HomeService } from '@/api/homeService';

export default defineComponent({
  components: {WorkentryCard, TagCanvas, HomeCards, HomeFooter, HeaderBanner},
  setup() {
    const homeStore:any = useHomeStore()
    const myNum = ref(1)

    //文章列表
    let articlesList: any = ref([])

    //获取到的页数
    let pageNum: any = ref(1)
    //总页数
    let total: any = ref('')

    //获取文章列表
    async function getArticleList () {
      const data: any = await HomeService.getArticleList({
        pageNum: pageNum.value,
        pageSize: 8
      })
      if (data) {
        articlesList.value = articlesList.value.concat(data.data.Articles)
        pageNum.value = data.data.PageNo
        total.value = data.data.Total
      }
    }

    async function scrollGetList() {
      //scrollTop是滚动条滚动时，距离顶部的距离
      let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
      //windowHeight是可视区的高度
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      //scrollHeight是滚动条的总高度
      let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
      //滚动条到底部的条件
      if(scrollTop + windowHeight == scrollHeight){
        console.log()
        if (articlesList.value.length < total.value) {
          pageNum.value ++
          await  getArticleList()
        }
      }
    }
    onMounted(async () => {
      await getArticleList()
      window.addEventListener('scroll', scrollGetList)
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', scrollGetList)
    })
    return {
      homeStore,
      myNum,
      articlesList
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
    //max-height: 80vh;
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
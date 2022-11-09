<template>
  <div class="homeContainer">
      <div class="articleNavWrap">
        <div :class="{'articleTitleWrap': true, 'articleTitleWrapDark':themeComputed === 'dark'}">
          <div class="articleTitleNav">
            <svg-icon name="new" color="#eeac07"></svg-icon>
            <span>最新文章</span>
          </div>
          <div class="articleTitleTo"
               :style="{backgroundColor:index % 2 === 1 ? 'rgba(178, 176, 176, 0.1)' : ''}"
               v-for="(item,index) in 8">
            <span class="articleTitleTo_span">JavaScript高级程序设计随笔(一)</span>
          </div>
        </div>
        <div :class="{'articleTitleWrap': true, 'articleTitleWrapDark':themeComputed === 'dark'}">
          <div class="articleTitleNav">
            <svg-icon name="hot" color="#e73e3e"></svg-icon>
            <span>最热文章</span>
          </div>
          <div class="articleTitleTo"
               :style="{backgroundColor:index % 2 === 1 ? 'rgba(178, 176, 176, 0.1)' : ''}"
               v-for="(item,index) in 8">
            <span class="articleTitleTo_span">JavaScript高级程序设计随笔(一)</span>
          </div>
        </div>
      </div>
      <div class="articleContent">
        <workentry-card v-for="item in articlesList" :info="item" :key="item.id"></workentry-card>
      </div>
      <div class="labelNavWrap">
        <div :class="{'topicCanvasWrap': true, 'topicCanvasWrapDark':themeComputed === 'dark'}">
          <tag-canvas/>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {homeStore} from "@/store/home_store";
import bus from 'vue3-eventbus'
import TagCanvas from "@/components/homeComponent/tagCanvas.vue";
import WorkentryCard from "@/components/homeComponent/workentryCard.vue";
import { HomeService } from '@/api/homeService';
import { Search } from '@element-plus/icons-vue'
import { useUserStore } from "@/store/user_store";

const userStore = useUserStore()
const useHomeStore:any = homeStore()
const myNum = ref(1)

const themeComputed = computed(() => {
  return useHomeStore.theme
})

//文章列表
let articlesList: any = ref([])

//获取到的页数
let pageNum: any = ref(1)
//总页数
let total: any = ref('')

let searchVal:any = ref('')

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

</script>

<style scoped lang="scss">
@import "src/style/universal";
.homeContainer{
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: var(--background-home);
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
      border-radius: 5px;
      box-shadow:
          4px 4px 6px var(--shadow-left),
          -4px -4px 6px var(--shadow-right);
      margin-bottom: 20px ;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background-color: var(--background);
      .articleTitleNav{
        height: 12%;
        width: 100%;
        color: var(--font-color-bold);
        background-color: rgba(178, 176, 176, 0.1);
        display: flex;
        align-items: center;
        padding-left: 20px;
      }
      .articleTitleTo{
        width: 100%;
        height: 11%;
        border-bottom:1px dashed #b3b3c5;
        display: flex;
        align-items: center;
        padding-left: 25px;
        font-size: 12px;
        cursor: pointer;
        .articleTitleTo_span{
          color: var(--font-color);
          transition:all .3s;
          &:hover{
            transform: scale(1.1);
            color: var(--theme-color);
          }
        }
        &:nth-last-child(1){
          border: none;
        }
      }
    }
    .articleTitleWrapDark{
      box-shadow: none;
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
    background-color: var(--background) ;
    .topicCanvasWrap{
      width: 100%;
      border-radius: 5px;
      box-shadow:
          4px 4px 6px var(--shadow-left),
          -4px -4px 6px var(--shadow-right);
      height: 300px;
      display: flex;
      flex-direction: column;
    }
    .topicCanvasWrapDark{
      box-shadow: none;
    }
  }
  .svg-icon{
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }
}
</style>
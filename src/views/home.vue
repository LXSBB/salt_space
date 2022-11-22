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
    <!-- list  -->
    <div class="articleContent">
      <workentry-card v-for="item in articlesList" :info="item" :key="item.id"></workentry-card>
      <div v-if="showSkeleton" class="listSkeleton">
        <el-skeleton  :rows="2" animated />
      </div>
      <div class="noDataImg" v-if="noData">
        <svg-icon name="noData"></svg-icon>
        <span>- 暂无数据 -</span>
      </div>
    </div>
    <!-- 右侧分类   -->
      <div class="labelNavWrap">
        <div
            class="labelClassifyWrap"
            :style="labelClassifyStyle"
            @click="changeLabelClassify"
        >
          <div
              :class="{'labelClassifyBut': true ,'labelClassifyButActive': tagIndex === 0}"
              labelTag="综合"
          >
            综合
          </div>
          <div
              v-for="(item, index) in categoriesList"
              :class="{'labelClassifyBut': true ,'labelClassifyButActive': tagIndex === index + 1}"
              :labelTag="item.name"
          >
            {{item.name}}
          </div>
        </div>
        <!--  云图  -->
        <div :class="{'topicCanvasWrap': true, 'topicCanvasWrapDark':themeComputed === 'dark'}">
          <tag-canvas/>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, nextTick, onMounted, onUnmounted, reactive, ref} from 'vue';
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

let tagIndex = ref(0)

//切换分类
function changeLabelClassify(e: any) {
  const tag = e.target.getAttribute('labelTag')
  if (!tag) return
  if (tag === '综合') {
    tagIndex.value = 0
  } else {
    categoriesList.value.forEach((item: any, index) => {
      if (tag === item.name) {
        tagIndex.value = index + 1
      }
    })
  }
  //调整滑块位置
  labelClassifySlider()
}


const labelClassifyStyle: any = reactive({
  '--label-width': 0,
  '--label-height': 0,
  '--label-left': 0,
  '--label-top': 0,
})

//分类滑块移动
function labelClassifySlider() {
  nextTick(() => {
    const labelClassifyWrap: any = document.querySelector('.labelClassifyWrap')
    const labelClassifyBut: any = labelClassifyWrap.querySelectorAll('.labelClassifyBut')
    const {offsetHeight,offsetWidth,offsetLeft,offsetTop} = labelClassifyBut[tagIndex.value]
    labelClassifyWrap.setAttribute('data-width', offsetWidth)
    labelClassifyWrap.setAttribute('data-height', offsetHeight)
    labelClassifyStyle['--label-width'] = offsetWidth + 'px'
    labelClassifyStyle['--label-height'] = offsetHeight + 'px'
    labelClassifyStyle['--label-left'] = offsetLeft + 'px'
    labelClassifyStyle['--label-top'] = offsetTop + 'px'
  })
}

//开屏显示骨架屏
let showSkeleton = ref(false)
//显示无数据提示
let noData = ref(false)
//获取文章列表
async function getArticleList () {
  if (articlesList.value.length === 0) {
    showSkeleton.value = true
  }
  try {
    const data: any = await HomeService.getArticleList({
      pageNum: pageNum.value,
      pageSize: 8
    })
    showSkeleton.value = false
    if (data) {
      articlesList.value = articlesList.value.concat(data.data.Articles)
      if (articlesList.value.length === 0) {
        noData.value = true
      }
      pageNum.value = data.data.PageNo
      total.value = data.data.Total
    } else {
      noData.value = true
    }
  } catch (e) {
    showSkeleton.value = false
    noData.value = true
  }
}

const categoriesList = ref([])
async function getLabelList() {
  const {data}: any = await HomeService.getLabelList()
  if (data) {
    categoriesList.value = data.categories
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
  if(Math.ceil(scrollTop) + Math.ceil(windowHeight) === scrollHeight){
    if (articlesList.value.length < total.value) {
      pageNum.value ++
      await  getArticleList()
    }
  }
}

function homeResize() {
  labelClassifySlider()
}

onMounted(async () => {
  await getLabelList()
  await getArticleList()
  labelClassifySlider()
  window.addEventListener('scroll', scrollGetList)
  window.addEventListener('resize', homeResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollGetList)
  window.removeEventListener('resize', homeResize)
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
      border: 1px solid rgba(179, 179, 197, 0.5);
      //box-shadow:
      //    4px 4px 6px var(--shadow-left),
      //    -4px -4px 6px var(--shadow-right);
      box-shadow: 0 9px 0 -5px var(--theme-color), 0 15px 0 -7px var(--theme-color-1);
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
        .svg-icon{
          width: 20px;
          height: 20px;
          margin-right: 6px;
        }
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
    position: relative;
    :deep(.listSkeleton){
      width: 100%;
      height: 160px;
      border-radius: 5px;
      box-shadow: 0 4px 8px 6px rgba(7,17,27,.06);
      padding: 20px;
      background-color: var(--background);
      .el-skeleton__item{
        background: linear-gradient(90deg,var(--Skeleton-1) 25%,
            var(--Skeleton-2) 37%,var(--Skeleton-1) 63%);
        background-size: 400% 100%;
      }
    }
    .noDataImg{
      position: absolute;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      .svg-icon{
        width: 100px;
        height: 100px;
      }
      span{
        margin-top: 10px;
        font-size: 16px;
        color: var(--font-color);
      }
    }
  }
  .labelNavWrap{
    position: fixed;
    top: 100px;
    right: 120px;
    width: 300px;
    background-color: var(--background-home) ;
    .topicCanvasWrap{
      width: 100%;
      border-radius: 10px;
      background-color: var(--background-home-label);
      box-shadow: -10px -10px 15px var(--shadow-home-label-1), 10px 10px 15px var(--shadow-home-label-2);
      height: 300px;
      display: flex;
      flex-direction: column;
    }
    .topicCanvasWrapDark{
      box-shadow: none;
    }
    .labelClassifyWrap{
      margin-bottom: 30px;
      width: 100%;
      padding: 12px 16px;
      border-radius: 12px; // 圆角
      overflow: hidden; // 超出隐藏
      background-color: var(--background-home-label);
      box-shadow: -10px -10px 15px var(--shadow-home-label-1), 10px 10px 15px var(--shadow-home-label-2);
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      position: relative;
      .labelClassifyBut{
        font-size: 14px;
        padding: 0 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        border-radius: 12px;
        text-align: center;
        color: var(--font-color);
        cursor: pointer;
        transition: all .5s;
        user-select: none;
      }
      .labelClassifyButActive{
        transform: scale(1);
        color: var(--theme-color);
        animation: txtOutScale .5s;
      }
      @keyframes txtOutScale {
        0% {
          color: var(--font-color);
        }
        80% {
          color: var(--theme-color);
        }
        100% {
          color: var(--theme-color);
        }
      }
    }
    .labelClassifyWrap::after{
      transition: all .5s;
      content: "";
      border-radius: 12px;
      position: absolute;
      width: var(--label-width);
      height: var(--label-height);
      left: var(--label-left);
      top: var(--label-top);
      background-color: var(--home-label-active);
      box-shadow: inset 8px 8px 6px var(--shadow-home-label-2),
      inset -5px -5px 15px var(--shadow-home-label-1),
      inset -5px -5px 15px var(--shadow-home-label-1),
      inset 7px 7px 6px var(--shadow-home-label-2);
    }
  }
}
</style>
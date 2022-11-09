<template>
  <div class="articleInfoContainer">
    <div class="articleContent">
      <!--    左侧按钮    -->
      <div class="optionsArea">
        <div class="leftBarBut likesBut">
          <svg-icon name="good_info"></svg-icon>
        </div>
        <div class="leftBarBut collectBut">
          <svg-icon name="collect"></svg-icon>
        </div>
        <div class="leftBarBut commentBut">
          <svg-icon name="comment"></svg-icon>
        </div>
      </div>
      <!--    文章内容    -->
      <div class="infoArea">
        <div class="vMdWrap">
          <v-md-preview ref="preview" :text="text"></v-md-preview>
        </div>
        <article-comment></article-comment>
      </div>
      <!--    右侧内容    -->
      <div class="funArea">
        <!--    作者信息    -->
        <div class="authorInfoCard">
          <div class="authorInfo">
            <img src="../assets/image/icon.png" alt="">
            <div class="authorNameSpan">
              <b>LXSSG</b>
              <span>前端</span>
            </div>
          </div>
          <span class="line"></span>
          <div class="articleInfo">
            <div class="articleInfoNum">
              <div class="imgWrap">
                <img src="../assets/image/good_info.png" alt="">
              </div>
              <span>获得点赞</span>
              <span>100</span>
            </div>
            <div class="articleInfoNum">
              <div class="imgWrap">
                <img src="../assets/image/read_info.png" alt="">
              </div>
              <span>文章被阅读</span>
              <span>100</span>
            </div>
          </div>
        </div>
        <!--    文章锚点    -->
        <div class="navWrap">
          <div
              class="navWrapListItem"
              v-for="anchor in titles"
              @click="handleAnchorClick(anchor)"
          >
            <div :class="{'navSlider':true, 'active':tagIndex === anchor.lineIndex}"></div>
            <a :class="{'tag':true, 'active':tagIndex === anchor.lineIndex}"
               :attr_tag="anchor.lineIndex"
               :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
            >{{ anchor.title }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed, watchEffect, onMounted, onUnmounted} from 'vue';
import markdownTxt from '@/mork/知识总结.md?raw';
import _ from 'lodash'
import ArticleComment from "@/components/infoComponent/articleComment.vue";
import { useRoute } from 'vue-router'
import {ArticleInfoService} from "@/api/articleInfoService";

const route = useRoute()
//标题锚点集合
let titles: any = ref([])
//当前锚点index
let tagIndex: any = ref(0)
const preview: any = ref();
const navWrap: any = ref();

let text: any = ref('')
/*
* 点击右侧标题导航
* */
const handleAnchorClick = (anchor: any) => {
  const { lineIndex } = anchor;
  tagIndex.value = lineIndex
  const heading = preview.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
  if (heading) {
    preview.value.scrollToTarget({
      target: heading,
      scrollContainer: window,
      top: 120,
    });
  }
}
/*
* 监听滚动条,动态切换描点高亮
* */
let throttleTimer: any
const watchScroll = (e: any) => {
  if (!throttleTimer) {
    throttleTimer = setTimeout(() => {
      throttleTimer = null
      const navWrap: any = document.querySelector('.navWrap')
      let targetTag
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      for(let i = 0; i < titles.value.length; i++) {
        if (scrollTop  >= titles.value[i]['offsetTop']) {
          tagIndex.value = titles.value[i]['lineIndex']
          targetTag = navWrap.querySelector(`a[attr_tag = '${tagIndex.value}']`)
        }
      }
      //控制滚动条保证选中锚点在可视区域内
      const offsetNav = navWrap?.getBoundingClientRect()
      navWrap.scrollTop = targetTag?.parentNode?.offsetTop - offsetNav?.height/2
    }, 200)
  }
}
/*
* 渲染右侧导航
* */
const renderNav = () => {
  //获取md中所有标题
  const anchors = preview.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
  //去除空值
  titles.value = Array.from(anchors).filter((title: any) => !!title.innerText.trim());
  //第一个锚点距离视口高度
  let firstTagScrollTop = Math.floor(titles.value[0]?.getBoundingClientRect()?.top) || 0
  if (!titles.value.length) {
    titles = [];
    return;
  }
  //提取所有标签名,确定层级
  const hTags = Array.from(new Set(titles.value.map((title: any) => title.tagName))).sort();
  titles.value = titles.value.map((el: any) => ({
    title: el.innerText,
    lineIndex: el.getAttribute('data-v-md-line'),
    offsetTop: el.offsetTop - firstTagScrollTop,
    //层级
    indent: hTags.indexOf(el.tagName),
  }));
  //设置初始锚点
  tagIndex.value = titles.value[0]['lineIndex']
}

/*
* 获取文章
* */
async function getArticle() {
  const id = + (route.query.articleId as string)
  let data: any = await ArticleInfoService.articlePreview({articleId: id})
  if (data.code === 0) {
    text.value = data.data.content
  }
}

onMounted(async () => {
  await getArticle()
  renderNav()
  addEventListener('scroll', watchScroll)
})
onUnmounted(() => {
  removeEventListener('scroll', watchScroll)
})
</script>

<style lang="scss" scoped>
@import "src/style/universal";
.articleInfoContainer{
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: $background-color;
  padding-top: 100px;
  padding-left: 40px;
  padding-right: 40px;
  .articleContent{
    width: 1140px;
    display: flex;
    position: relative;
    justify-content: space-between;
    .optionsArea{
      width: 50px;
      height: 50vh;
      position: fixed;
      z-index: 2;
      left: 290px;
      top: 180px;
      display: flex;
      flex-direction: column;
      .leftBarBut{
        border-radius: 50%;
        width: 100%;
        height: 50px;
        background-color: $card-background-color;
        margin-bottom: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        img{
          width: 25px;
          height: 25px;
        }
        .svg-icon{
          width: 25px;
          height: 25px;
        }
        &::after{
          content: '111';
          position: absolute;
          top: 0;
          left: 75%;
          height: 17px;
          line-height: 17px;
          padding: 0 5px;
          border-radius: 9px;
          font-size: 11px;
          text-align: center;
          white-space: nowrap;
          background-color: rgba(184, 162, 246, .8);
          color: #fff
        }
        .svg-icon{
          color: $card-background-hover;
          transition: all .3s;
        }
      }
      .leftBarBut:hover{
        .svg-icon{
          color: $background-color;
        }
      }
    }
    .infoArea{
      display: inline-block;
      width: 820px;
      min-height: 100vh;
      border-radius: 5px;
      .vMdWrap{
        border-radius: 5px;
        overflow: hidden;
      }
    }
    .funArea{
      width: 300px;
      display: flex;
      flex-direction: column;
      .authorInfoCard{
        width: 100%;
        height: 180px;
        background-color: $card-background-color;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
        margin-bottom: 20px;
        .authorInfo{
          width: 100%;
          height: 90px;
          display: flex;
          justify-content: flex-start;
          padding-top: 20px;
          img{
            width: 50px;
            height: 50px;
            border: 1px solid black;
            border-radius: 50%;
            margin-left: 30px;
            margin-right: 30px;
          }
          .authorNameSpan{
            display: flex;
            height: 50px;
            justify-content: center;
            flex-direction: column;
            b{
              font-size: 16px;
            }
          }
        }
        .line{
          width: 80%;
          border-bottom: 1px solid $background-color;
        }
        .articleInfo{
          margin-top: 10px;
          width: 100%;
          padding-left: 30px;
          display: flex;
          flex-direction: column;
          .imgWrap{
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background-color: $card-background-color-b;
            margin-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
              width: 15px;
              height: 15px;
            }
          }
          .articleInfoNum{
            display: flex;
            font-size: 14px;
            align-items: center;
            margin-bottom: 5px;
            :nth-child(2){
              margin-right: 10px;
            }
          }
        }
      }
      .navWrap{
        width: 100%;
        min-height: 300px;
        max-height: 50vh;
        overflow-y: scroll;
        background-color: $card-background-color;
        border-radius: 5px;
        position: sticky;
        top: 80px;
        .navWrapListItem{
          display: flex;
          align-items: center;
          .navSlider{
            width: 4px;
            height: 16px;
            border-radius: 0 4px 4px 0;
            background-color: transparent;
            &.active{
              background-color: $card-background-hover;
            }
          }
          .tag{
            cursor: pointer;
            font-size: 12px;
            margin-left: 10px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
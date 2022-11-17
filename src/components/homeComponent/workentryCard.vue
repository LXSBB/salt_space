<template>
  <div
    :class="{'articleCardContainer': true, 'articleCardContainerDark': themeComputed === 'dark'}"
    @click="toInfo"
  >
    <img src="src/assets/image/mountains.jpg" class="cardImg">
    <div class="contentTitle">
      <h1 class="titleWrap">{{info.title}}</h1>
      <p class="Introduction">{{info.content}}</p>
      <div class="userTag">
        <div class="userTagContent">
          <span class="userName">lxlxl</span>
          <span class="tagSpan">vue</span>
          <span class="workTime">{{info.createTime}}</span>
        </div>
        <div class="infoNumber">
          <div class="iconWrap">
            <svg-icon name="good_info" color="6666ff"></svg-icon>
            <span>100</span>
          </div>
          <div class="iconWrap">
            <svg-icon name="collect" color="#ff9966"></svg-icon>
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {defineProps, computed} from 'vue'
import { useRouter } from 'vue-router';
import {homeStore} from "@/store/home_store";
const router = useRouter();
const useHomeStore = homeStore();

const themeComputed = computed(() => {
  return useHomeStore.theme
})


function toInfo() {
  router.push({
    path: '/info',
    query: {articleId: info.id}
  });
}

const {info} = defineProps({
  info: Object
})
</script>

<style scoped lang="scss">
@import "src/style/universal";
.articleCardContainer{
  width: 100%;
  background-color: var(--background);
  border-radius: 5px;
  box-shadow: 0 4px 8px 6px rgba(7,17,27,.06);
  margin-bottom: 20px ;
  height: 160px;
  cursor: pointer;
  display: flex;
  overflow: hidden;
  transition: all .3s;
  .cardImg{
    width: 260px;
    height: 100%;
  }
  .contentTitle{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding: 10px 20px;
    .titleWrap{
      font-size: 20px;
      font-weight: bold;
      color: var(--font-color-bold);
      margin-bottom: 8px;
    }
    .Introduction{
      height: 50px;
      font-size: 16px;
      font-weight: normal;
      color: var(--font-color);
      margin-bottom: 20px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .userTag{
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--font-color);
      .tagSpan{
        padding-left: 10px;
        padding-right: 10px;
        margin-left: 10px;
        margin-right: 10px;
        border-left: 1px solid var(--font-color);
        border-right: 1px solid var(--font-color);
      }
      .infoNumber{
        display: flex;
        .iconWrap{
          display: flex;
          align-items: center;
          color: var(--font-color);
          img{
            width: 15px;
            height: 15px;
            margin-right: 3px;
          }
        }
        .iconWrap:nth-child(2) {
          margin: 0 20px;
        }
      }
    }
  }
  &:hover {
    box-shadow: 0 0 0 3px var(--theme-color);
  }
}
.articleCardContainerDark{
  box-shadow: none;
}
.svg-icon{
  width: 15px;
  height: 15px;
  margin-right: 3px;
}
</style>
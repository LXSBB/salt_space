<template>
  <div class="articleCardContainer" @click="toInfo">
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
            <img src="../../assets/image/browse.png" alt="">
            <span>100</span>
          </div>
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
import {defineProps} from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();

function toInfo() {
  router.push("/info");
}

const {info} = defineProps({
  info: Object
})
</script>

<style scoped lang="scss">
@import "src/style/universal";
.articleCardContainer{
  width: 100%;
  background-color: $card-background-color;
  border-radius: 5px;
  box-shadow: 1px 3px 12px 9px rgba(0,0,0,0.04);
  margin-bottom: 20px ;
  height: 160px;
  cursor: pointer;
  display: flex;
  overflow: hidden;
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
      color: black;
      margin-bottom: 8px;
    }
    .Introduction{
      height: 50px;
      font-size: 16px;
      font-weight: normal;
      color: #6e6c6c;
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
      .tagSpan{
        padding-left: 10px;
        padding-right: 10px;
        margin-left: 10px;
        margin-right: 10px;
        border-left: 1px solid #b0afaf;
        border-right: 1px solid #b0afaf;
      }
      .infoNumber{
        display: flex;
        .iconWrap{
          display: flex;
          align-items: center;
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
}
.svg-icon{
  width: 15px;
  height: 15px;
  margin-right: 3px;
}
</style>
<template>
  <div class="articleCardContainer" @click="toInfo">
    <img src="src/assets/image/mountains.jpg" class="cardImg">
    <div class="contentTitle">
      <h1 class="titleWrap">JavaScript高级程序设计随笔(一)</h1>
      <p class="Introduction">组件会严格按照value值的大小分配权重，权重就体现在字体大小上。所以如果数据本身分布不均匀的时候，视觉效果看起来不够好，比如一个数为10000，其他的数为100-10，那么只能体现出两种权重了，即10000和其他。但是这样往
        往会导致视觉上，权重的分层不够明显，所以我们这个时候需要给数据分配权重，也就是改变每个词的font</p>
      <div class="userTag">
        <div class="userTagContent">
          <span class="userName">lxlxl</span>
          <span class="tagSpan">vue</span>
          <span class="workTime">2022-10-1</span>
        </div>
        <div class="infoNumber">
          <div class="iconWrap">
            <img src="../../assets/image/browse.png" alt="">
            <span>100</span>
          </div>
          <div class="iconWrap">
            <img src="../../assets/image/awesome.png" alt="">
            <span>100</span>
          </div>
          <div class="iconWrap">
            <img src="../../assets/image/collect.png" alt="">
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter();
    function toInfo() {
      router.push("/info");
    }
    return {
      toInfo
    }
  }
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
  .cardImg{
    width: 320px;
    height: 100%;
  }
  .contentTitle{
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    .titleWrap{
      font-size: 20px;
      font-weight: bold;
      color: black;
      margin-bottom: 8px;
    }
    .Introduction{
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
        margin-left: 20px;
        margin-right: 20px;
      }
      .infoNumber{
        display: flex;
        .iconWrap{
          display: flex;
          align-items: center;
          img{
            width: 15px;
            height: 15px;
          }
        }
        .iconWrap:nth-child(2) {
          margin: 0 20px;
        }
      }
    }
  }
}

</style>
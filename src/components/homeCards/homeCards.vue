<template>
  <div class="homeCardsContainer">
    <div class="topicWrap">
      <topic-but v-for="(item,index) in btuList" :prop="item" :key="index" btuName="ALL Topics" @clickBtn="clickBtn"></topic-but>
    </div>
    <div class="homeCardsWrap">
      <home-card-item></home-card-item>
      <home-card-item></home-card-item>
      <home-card-item></home-card-item>
      <home-card-item></home-card-item>
      <home-card-item></home-card-item>
      <home-card-item></home-card-item>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import TopicBut from "./topicBut.vue";
import HomeCardItem from "./homeCardItem.vue";

export default defineComponent({
  components: {HomeCardItem, TopicBut},
  setup() {
    let btuList = [
        {
          type:1,
          btuName:'ALL Topics'
        },
        {
          type:2,
          btuName:'前端'
        },
        {
          type:3,
          btuName:'后端'
        },
        {
          type:4,
          btuName:'即刻生活'
        },
        {
          type:5,
          btuName:'游戏攻略'
        },
    ]
    function clickBtn(type:number) {
      console.log(type)
    }
    return {clickBtn,btuList}
  }
})
</script>

<style scoped lang="scss">
.homeCardsContainer{
  width: 85%;
  padding-top: 50px;
  padding-bottom: 50px;
  .topicWrap{
    width: 100%;
    display: flex;
    margin-bottom: 30px;
  }
  .homeCardsWrap{
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: repeat(5, 300px);
    grid-gap: 20px 20px;
  }
  @media screen and (max-width: 1350px) {
    .homeCardsWrap {
      grid-template-columns: repeat(4, 400px);
    }
  }

}
</style>
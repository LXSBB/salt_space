<template>
  <div class="articleInfoContainer">
    <div class="articleContent">
      <div class="infoArea">

      </div>
      <div class="funArea">
        <div class="userInfo">

        </div>
        <div class="navWrap">

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  setup() {

    return {}
  }
})
</script>

<style lang="scss" scoped>
@import "src/style/universal";
.articleInfoContainer{
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: $background-color;
  padding-top: 100px;
  padding-left: 40px;
  padding-right: 40px;
  .articleContent{
    width: 1140px;
    display: flex;
    justify-content: space-between;
    .infoArea{
      width: 820px;
      height: 4000px;
      background-color: $card-background-color;
      border-radius: 5px;
    }
    .funArea{
      width: 300px;
      .userInfo{
        width: 100%;
        height: 180px;
        background-color: $card-background-color;
        border-radius: 5px;
        margin-bottom: 20px;
      }
      .navWrap{
        width: 100%;
        height: 300px;
        background-color: $card-background-color;
        border-radius: 5px;
        position: sticky;
        top: 70px;
      }
    }
  }
}
</style>
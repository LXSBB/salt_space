<template>
  <div class="articleCommentContainer">
    <div class="writeCommentArea">
      <img class="writeCommentArea_avatar" src="../../assets/image/icon.png" alt="">
      <div class="writeCommentArea_textarea">
        <el-input
            v-model="textareaComment"
            :rows="3"
            type="textarea"
            placeholder="Please input"
        />
      </div>
    </div>
    <div class="allCommentArea">

    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed, watchEffect, onMounted, onUnmounted} from 'vue';

const textareaComment = ref('')
</script>

<style scoped lang="scss">
@import "src/style/universal";
.articleCommentContainer{
  width: 100%;
  background-color: #ffffff;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px 50px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .writeCommentArea{
    width: 100%;
    display: flex;
    .writeCommentArea_avatar{
      margin-right: 16px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid rebeccapurple;
    }
    .writeCommentArea_textarea{
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
      :deep(.el-textarea){
        .el-textarea__inner{
          box-shadow: none;
          background-color: $card-background-color_h;
          --el-input-hover-border-color: #a87ef1;
          --el-input-focus-border-color: #a87ef1;
        }

      }
    }
  }
}
</style>
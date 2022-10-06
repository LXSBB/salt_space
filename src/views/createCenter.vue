<template>
  <div class="create">
    <div class="create_menu">
      <el-menu
          :default-openeds="['1']"
          class="el-menu-vertical-demo"
          :collapse="false"
          @upload-image="handleUploadImage"
          @open="handleOpen"
          @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><document /></el-icon>
            <span>草稿箱</span>
          </template>
          <el-menu-item index="1-1">文章1</el-menu-item>
          <el-menu-item index="1-2">文章2</el-menu-item>
          <el-menu-item index="1-3">文章3</el-menu-item>
        </el-sub-menu>
      </el-menu>
      <div class="create_menu_buttonWrap">
        <button class="create_menu_button create floatButton">
          <span>创建草稿</span>
        </button>
        <div class="create_menu_button release floatButton">
          <span>发布文章</span>
        </div>
        <div class="create_menu_button back floatButton" @click="routerPush('/')">
          <span>回到主页</span>
        </div>
      </div>
    </div>
    <div class="create_md">
      <v-md-editor
          v-model="text"
          height="100%"
          :disabled-menus="[]"
      ></v-md-editor>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import {useRoute, useRouter} from "vue-router";

const route: any = useRoute()
const router = useRouter()
const isCollapse = ref(true)
const text = ref('')
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

//路由跳转
function routerPush(name: string) {
  router.push({
    path: name,
  })
}

//图片上传
function handleUploadImage(event: any, insertImage: any, files: any) {

}
</script>

<style scoped lang="scss">
@import "src/style/universal";
.create{
  display: flex;
  background-color: $background-color;
  height: 100vh;
  .create_menu{
    height: 100%;
    display: flex;
    flex-direction: column;
    .create_menu_buttonWrap{
      height: 20%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      border-right: 1px solid #dcdfe6;
      background-color: $background-color;
      .create_menu_button{
        width: 120px;
        height: 30px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        margin-bottom: 20px;
        cursor: pointer;
      }
      .create{
        background-color: #6666ff;
      }
      .release{
        background-color: #1cc554;
      }
      .back{
        background-color: #ff9966;
      }
    }
  }
  .create_md{
    height: 100%;
    display: flex;
    flex: 1;
  }
  .el-menu{
    height: 80%;
    background-color: $background-color;
    .el-menu-item{
      color: #e7eaee;
      background-color: $background-color;
      &:hover{
        background-color: $card-background-color-b;
        color: $background-color;
      }
    }
    .is-active{
      color: #66ff99;
    }
  }
  :deep(.el-sub-menu__title) {
    color: #e7eaee;
    &:hover{
      background-color: transparent;
    }
  }
}
</style>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
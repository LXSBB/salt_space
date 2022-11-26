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
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
          <el-menu-item index="1-3">item one</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><document /></el-icon>
            <span>已发布文章</span>
          </template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item one</el-menu-item>
          <el-menu-item index="2-3">item one</el-menu-item>
        </el-sub-menu>
      </el-menu>
      <div class="create_menu_buttonWrap">
        <button class="create_menu_button create floatButton">
          <span>创建草稿</span>
        </button>
        <div class="create_menu_button back floatButton" @click="routerPush('/')">
          <span>回到主页</span>
        </div>
      </div>
    </div>
    <div class="create_md">
      <div class="create_md_nav">
        <input
            class="create_md_nav_input"
            v-model="targetName"
            placeholder="请输入文章标题..."
            type="text"
        >
        <div class="create_md_nav_ops">
          <div class="create_menu_button release floatButton" @click="openReleaseDialog">
            <span>发布</span>
          </div>
        </div>
      </div>
      <v-md-editor
          class="md_editor"
          :height="editorHeight"
          v-model="text"
          :disabled-menus="[]"
      ></v-md-editor>
    </div>
    <!--  发布文章弹出窗  -->
    <el-dialog
        v-model="releaseDialogVisible"
        title="发布文章"
        width="30%"
        top="25vh"
        custom-class="release_dialog"
    >
      <div class="releaseDialog_item">
        <span class="releaseDialog_item_title">分类:</span>
        <div class="releaseDialog_item_content">
          <div :class="{'releaseDialog_tagBut': true,
          'releaseDialog_tagBut_active': item.value === targetTag}"
               v-for="item in tagList"
               :key="item.value"
               @click="clickTag(item.value)"
          >
            <span>{{item.value}}</span>
          </div>
        </div>
      </div>
      <div class="releaseDialog_item">
        <span class="releaseDialog_item_title">文章封面:</span>
        <div class="releaseDialog_item_content">
          <upload-file ref="uploadFile" v-show="!preImg" @afterUpload="afterUpload"/>
          <div
              v-show="preImg"
              class="preImgWrap"
              @mouseenter="preImgEnter"
              @mouseleave="preImgLeave"
          >
            <img class="preImg" :src="preImg" />
            <transition name="fade">
              <div v-if="showPreImgOps" class="preImg_ops">
                <el-icon :size="30" @click="delImg">
                  <Delete />
                </el-icon>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="releaseDialog_item">
        <span class="releaseDialog_item_title">收录至合集:</span>
        <div class="releaseDialog_item_content">
          <el-select v-model="targetCollection"
                     multiple
                     class="inputCollection"
                     style="width: 300px"
                     placeholder="只能收录至一个合集"
          >
            <el-option
                v-for="item in collection"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="releaseDialog_item">
        <span class="releaseDialog_item_title">摘要:</span>
        <div class="releaseDialog_item_content">
          <el-input
              v-model="targetSummary"
              :rows="4"
              type="textarea"
              :maxlength="100"
              show-word-limit
          />
        </div>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="releaseDialogVisible = false">取消</el-button>
        <button
            class="submitButton"
            @click="releaseArticle"
        >
          确认并发布
        </button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref} from 'vue'
import {
  Document,
  Delete
} from '@element-plus/icons-vue'
import {useRoute, useRouter} from "vue-router";
import UserCard from "@/components/globals/userCard.vue";
import TopicBut from "@/components/homeComponent/homeCards/topicBut.vue";
import UploadFile from "@/components/createCenterComp/uploadFile.vue";
import {CreateService} from "@/api/createService";
import {ElNotification} from "element-plus/es";
import ProgressBar from "@/tool/canvas/progressBar";
import {homeStore} from "@/store/home_store";

const route: any = useRoute()
const router = useRouter()
const isCollapse = ref(true)
//md内容
const text = ref('')
const useHomeStore:any = homeStore()

let tagList: any = ref([])
//当前文章的标题
let targetName = ref('')
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

//md图片上传
function handleUploadImage(event: any, insertImage: any, files: any) {

}

//发布文章弹出窗状态
let releaseDialogVisible = ref(false)

//打开发布文章弹出窗
function openReleaseDialog() {
  targetTag.value = 0
  preImg.value = ''
  releaseDialogVisible.value = true
}

//当前发布文章的标签
let targetTag = ref(0)

//选择文章分类
function clickTag(index: number) {
  targetTag.value = index
}

//当前发布文章的合集
let targetCollection = ref('')
//用户的合集选项
let collection: any = ref([])
//发布文章的摘要
let targetSummary = ref('')

//预览图片
let preImg = ref('')
//上传图片后
function afterUpload(data: any) {
  console.log(data)
  preImg.value = data.url
}

//删除图片
function delImg() {
  preImg.value = ''
}

//显示图片编辑栏
let showPreImgOps = ref(false)
/*
* 鼠标进入图片事件
* */
function preImgEnter() {
  showPreImgOps.value = true
}
function preImgLeave() {
  showPreImgOps.value = false
}

/*
* 发布文章
* */
async function releaseArticle() {
  let params = {
    title: targetName.value,
    content: text.value,
  }
  const data: any = await CreateService.createArticle(params)
  if (data.code === 0) {
    ElNotification({
      offset: 70,
      title: 'Warning',
      message: '发布成功',
      type: 'warning',
    })
    releaseDialogVisible.value = false
  }
}

let editorHeight = ref('')

onMounted(() => {
tagList.value = useHomeStore.labelList.map(_ => {
    return {
      value: _.name,
      label: _.name
    }
  })
  nextTick(() => {
    editorHeight.value = `${window.innerHeight - 50}px`
  })
})
</script>

<style scoped lang="scss">
@import "src/style/universal";
.create{
  display: flex;
  height: 100vh;
  .create_menu{
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .create_menu_buttonWrap{
      opacity: .8;
      height: 20%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      //border-right: 1px solid var(--background);
      background-color: var(--theme-color-2);
    }
  }
  .create_md{
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    .create_md_nav{
      opacity: .8;
      width: 100%;
      height: 50px;
      background-color: var(--theme-color-2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .create_md_nav_input{
        margin-left: 20px;
        font-size: 18px;
        color: #b8b8c0;
        &::-webkit-input-placeholder{
          color: #b8b8c0;
        }
      }
      .create_md_nav_ops{
        margin-right: 20px;
        display: flex;
        align-items: center;
      }
    }
  }
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
    width: 70px;
    height: 25px;
    margin-bottom: 0;
    margin-right: 20px;
    background-color: #1cc554;
  }
  .back{
    background-color: #ff9966;
  }
  .el-menu{
    opacity: .8;
    height: 80%;
    background-color: var(--theme-color-2);
    border: none;
    padding-top: 30px;
    .el-sub-menu{
      color: #fff;
      background-color: var(--theme-color-2);
    }
    .el-menu-item{
      color: #fff;
      background-color: var(--theme-color-2);
      &:hover{
        background-color: var(--theme-color-1);
        color: var(--theme-color);
      }
    }
    .is-active{
      color: var(--switch-border-background);
    }
  }
  :deep(.el-sub-menu__title) {
    color: #e7eaee;
    &:hover{
      background-color: transparent;
    }
  }
}
.submitButton{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 38px;
  white-space: nowrap;
  cursor: pointer;
  color: #0b73f3;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  transition: .1s;
  font-weight: normal;
  -webkit-user-select: none;
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  background-color: rgba(11, 115, 243, 0.4);
  border:1px solid #0b73f3;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 5px;
  margin-left: 10px;
  &:active{
    filter: grayscale(50%)
  }
}
</style>

<style lang="scss">
@import "src/style/universal";
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.release_dialog{
  .el-dialog__body{
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    .releaseDialog_item{
      display: flex;
      .releaseDialog_item_title{
        display: block;
        width: 85px;
        height: 100%;
        text-align: right;
        font-weight: 400;
        font-size: 14px;
        line-height: 32px;
        color: #1d2129;
      }
      .releaseDialog_item_content{
        margin-left: 10px;
        width: 75%;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        .releaseDialog_tagBut{
          padding: 0 .7rem;
          font-size: 14px;
          line-height: 28px;
          width: 88px;
          height: 28px;
          white-space: nowrap;
          overflow: hidden;
          text-align: center;
          text-overflow: ellipsis;
          border-radius: 2px;
          cursor: pointer;
          color: #86909c;
          background-color: #f4f5f5;
          transition: all .3s;
          &:hover{
            background-color: #e5e6eb
          }
        }
        .releaseDialog_tagBut_active{
          background-color: var(--theme-color-1) ;
          color: #fff;
          &:hover{
            background-color: var(--theme-color-1) ;
          }
        }
        .upload-release{
          width: 300px;
        }
        .inputCollection{
          .el-input__inner::-webkit-input-placeholder{
            font-size: 12px;
          }
        }
        .preImgWrap{
          width: 250px;
          height: 150px;
          position: relative;
          .preImg{
            width: 250px;
            height: 150px;
          }
          .preImg_ops{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
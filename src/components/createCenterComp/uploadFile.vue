<template>
  <div class="uploadContainer" @click="selectFile">
    <input type="file"
           ref="uploadInput"
           id="upload_input"
           @change="upload"
           style="display: none"/>
    <div class="loading_wrap">
      <svg-icon name="upload"></svg-icon>
    </div>
    <div class="g-container" v-if="showProgress">
      <div class="g-progress"></div>
    </div>
    <div class="el-upload__text" v-else>
      将图片拖拽此处 或<em style="color: #a87ef1"> 点击</em>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, defineEmits, nextTick, onMounted} from 'vue'
import {CreateService} from "@/api/createService";
import axios from 'axios';
import {ElNotification} from "element-plus/es";
import ProgressBar from "@/tool/canvas/progressBar";

const uploadInput = ref()

const emit = defineEmits(["afterUpload"]);

//进度条状态
let showProgress = ref(false)
/*
* 修改进度条状态
* */
function setShowProgress(state: boolean) {
  showProgress.value = state
}
/*
* 修改进度条进度
* */
function setProgress(num: number) {
  document.getElementsByTagName('body')[0].style.setProperty('--w', num + '%');
}

/*
* 点击选择文件
* */
function selectFile() {
  if (!showProgress.value) {
    uploadInput.value.click()
  }
}
async function upload(e: Event) {
  setShowProgress(true)
  const uploadFileEle: any = (e.target as HTMLInputElement).files
  if (!uploadFileEle.length) return;
  const file = uploadFileEle[0]; // 获取单个文件
  let formData = new FormData();
  formData.set('file', file);
   let config = {
     headers:{
       'Content-Type':'multipart/form-data',
     },
     timeout:60000,
     onUploadProgress: (progressEvent: any) => {
       let percent = (progressEvent.loaded / progressEvent.total * 100 | 0)		//上传进度百分比
       if (percent > 40) {
         setProgress(percent - 40)
       }
     },
   }
   let data: any = await axios.post('/upload', formData, config)
   if (data.code === 1) {
     setProgress(100)
     setTimeout(() => {
       emit('afterUpload', data.data)
       setShowProgress(false)
     }, 500)
   } else {
     setShowProgress(false)
     ElNotification({
       offset: 70,
       title: 'Warning',
       message: '上传失败',
       type: 'warning',
     })
   }
}
onMounted(() => {
  setProgress(0)
})
</script>

<style scoped lang="scss">
$progressWidth: var(--w, 0%);
@import "src/style/universal";
.uploadContainer{
  width: 250px;
  height: 150px;
  border: 2px dashed #cec7c7;
  cursor: pointer;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .loading_wrap{
    position: relative;
    height: 70px;
    width: 70px;
    .svg-icon{
      width: 50px;
      height: 50px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .g-container{
    width: 180px;
    height: 10px;
    border-radius: 25px;
    border: 1px solid #eee;
    overflow: hidden;
    .g-progress {
      width: $progressWidth;
      height: 10px;
      border-radius: 25px;
      background: linear-gradient(90deg, #28c7e1, #9d80f3 100%, transparent 0);
      border: 1px solid #eee;
      transition: all .3s;
    }
  }

  &:hover{
    border-color: $card-background-color-b;
  }
}
</style>
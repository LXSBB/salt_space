<template>
  <div class="uploadContainer" @click="selectFile">
    <input type="file"
           ref="uploadInput"
           id="upload_input"
           @change="upload"
           style="display: none"/>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'
import {CreateService} from "@/api/createService";
import axios from 'axios';
import {ElNotification} from "element-plus/es";

const uploadInput = ref()

const emit = defineEmits(["afterUpload"]);

function selectFile() {
  uploadInput.value.click()
}
 async function upload(e: Event) {
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
     },
   }
   let data: any = await axios.post('/upload', formData, config)
   if (data.code === 1) {
     emit('afterUpload', data.data)
   } else {
     ElNotification({
       offset: 70,
       title: 'Warning',
       message: '上传失败',
       type: 'warning',
     })
   }
}

</script>

<style scoped lang="scss">
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
  &:hover{
    border-color: $card-background-color-b;
  }
}
</style>
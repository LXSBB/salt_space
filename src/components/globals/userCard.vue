<template>
  <div class="linkWrap">
    <el-popover
        :width="250"
        :show-arrow="false"
        popper-class="userCardPop"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
        <el-avatar :size="size" src="./src/assets/image/icon.png" />
      </template>
      <template #default>
        <div
            class="userCardContent"
        >
          <div class="userName">
            <el-avatar :size="40" src="./src/assets/image/icon.png" />
            <div class="userNameSpan">
              <b>LXSSG</b>
              <span>前端</span>
            </div>
          </div>
          <div class="userContent">
            <div class="userinfoArea">
              <span class="userinfoAreaNumber">100</span>
              <span class="userinfoAreaType">文章</span>
            </div>
            <div class="userinfoArea">
              <span class="userinfoAreaNumber">100</span>
              <span class="userinfoAreaType">点赞</span>
            </div>
            <div class="userinfoArea">
              <span class="userinfoAreaNumber">100</span>
              <span class="userinfoAreaType">访问</span>
            </div>
          </div>
          <div class="userOptions">
            <div class="userOptions_but" @click="routerPush('/userCenter')">
              <div>
                <svg-icon class="userCenter_svg" name="userCenter"></svg-icon>
              </div>
              <span>个人中心</span>
            </div>
            <div class="userOptions_but">
              <svg-icon name="setting"></svg-icon>
              <span>我的设置</span>
            </div>
          </div>
          <div class="userLogout" @click="logout">
            <span>退出登录</span>
          </div>
        </div>
      </template>
    </el-popover>
  </div>

</template>

<script lang="ts" setup>
import {defineComponent, defineProps} from 'vue';

const props = defineProps({
  size: {
    type: Number,
    required: true
  },
})

import bus from "vue3-eventbus";
import {useRoute, useRouter} from "vue-router";

const route: any = useRoute()
const router = useRouter()

//退出登录
function logout() {
  localStorage.removeItem('user_salt')
  localStorage.removeItem('user_info')
  bus.emit('isLogin' , false)
}
//路由跳转
function routerPush(name: string) {
  router.push({
    path: name,
  })
}

</script>

<style scoped lang="scss">
.linkWrap{
  cursor: pointer;

}
</style>
<style lang="scss">
@import "src/style/universal";
.userCardContent{
  display: flex;
  flex-direction: column;
  gap: 16px;
  .userName{
    display: flex;
    .userNameSpan{
      margin-left: 20px;
      display: flex;
      flex-direction: column;
    }
  }
  .userContent{
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid #8a8989;
    .userinfoArea{
      display: flex;
      flex-direction: column;
      .userinfoAreaNumber{
        margin-bottom: 5px;
      }
      .userinfoAreaType{
        color: #919191;
      }
    }
  }
  .userOptions{
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid #8a8989;
    .userOptions_but{
      padding: 5px;
      width: 45%;
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
      transition: all .3s;
      display: flex;
      justify-content: center;
      align-items: center;
      .svg-icon{
        width: 20px;
        height: 20px;
        color: $card-background-hover;
        transition: all .3s;
        margin-right: 3px;
      }
      &:hover{
        color: $background-color;
        background-color: $card-background-color-b;
      }
    }
  }
  .userLogout{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    color: #919191;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
}
.userCardPop{
  background-color: $card-background-color!important;
}
</style>
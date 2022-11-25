<template>
  <div v-show="navShow" :class="{'navContainer':true}">
    <div class="iconWrap">
      <img class="navIcon" src="../../assets/image/icon.png" alt="">
      <span :class="{'iconText':true}">Salt-Space</span>
    </div>
    <div class="contentWrap">
      <!--   首页   -->
      <div class="linkWrap" @click="routerPush('/')">
        <span>blog</span>
        <div class="hoverBox _center"></div>
        <div :class="{'hoverBox':true}"></div>
      </div>
<!--      <el-switch-->
<!--          v-model="themeVal"-->
<!--          class="ml-2"-->
<!--          inline-prompt-->
<!--          active-icon="Moon"-->
<!--          inactive-icon="Sunny"-->
<!--          @change="themeChange"-->
<!--      />-->
      <theme-switch></theme-switch>
      <el-input v-model="searchVal" placeholder="Please input" />
      <!--   创作中心   -->
      <div class="createCenterBut" @click="routerPush('/createCenter')" >
        <span>创作中心</span>
      </div>
    </div>
    <div class="nav_right_bar">
      <!--   登录   -->
      <div v-if="!isLogin" class="loginBut" @click="clickShowLgoInBox">
        <span>登录</span>
      </div>
      <!--   用户   -->
      <user-card v-else ></user-card>
    </div>
    <log-in-box v-if="showLgoInBox"></log-in-box>
  </div>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, ref} from 'vue';
import bus from 'vue3-eventbus'
import LogInBox from "./logInBox.vue";
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "@/store/user_store";
import {homeStore} from "@/store/home_store";
import UserCard from "@/components/globals/userCard.vue";
import { Moon, Sunny } from '@element-plus/icons-vue'
import ThemeSwitch from "@/components/nav/themeSwitch.vue";

export default defineComponent({
  components: {ThemeSwitch, UserCard, LogInBox},
  setup() {
    const route: any = useRoute()
    const router = useRouter()
    //导航栏是否在顶部
    let isTop = ref(true)
    //显示导航栏
    let navShow = ref(true)
    //是否是登陆状态
    let isLogin = ref(false)
    const userStore = useUserStore()
    const useHomeStore = homeStore()
    let themeVal = ref(false)
    //非登录按钮点击呼出
    onMounted(()=>{
      bus.on('showLoginBox',(payload: boolean)=>{
        showLgoInBox.value = payload
      })
      bus.on('showNav', (payload: boolean) => {
        navShow.value = payload
      })
      bus.on('isLogin', (payload: boolean) => {
        isLogin.value = payload
        userStore.login = payload
      })
      window.addEventListener('scroll',() => {
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        isTop.value = scrollTop <= 30
        showLgoInBox.value = false
      })
      //是否有token
      isLogin.value = !!localStorage.getItem('user_salt')
    })
    let showLgoInBox = ref(false)
    //打开登录弹窗
    function clickShowLgoInBox() {
      showLgoInBox.value = true
    }
    //路由跳转
    function routerPush(name: string) {
      router.push({
        path: name,
      })
    }

    let searchVal = ref('')
    //搜索
    function search() {

    }
    return {
      showLgoInBox,
      clickShowLgoInBox,
      isTop,
      routerPush,
      navShow,
      isLogin,
      themeVal,
      searchVal
    }
  }
})
</script>

<style scoped lang="scss">
.navContainer{
  min-width: 1000px;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 999;
  transition: all .3s;
  background-color: var(--background);
  color: var(--font-color);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  .iconWrap{
    height: 40px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    .navIcon{
      height: 40px;
      width: 40px;
    }
    .iconText{
      transition: all .5s;
      font-size: 16px;
      margin-left: 5px;
    }
  }
  .contentWrap{
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 20px;
    gap: 15px;
    .linkWrap{
      margin: 0 10px;
      cursor: pointer;
      font-size: 16px;
      span{
        transition: all .5s;
      }
      .hoverBox{
        height: 0;
        background-color: var(--font-color);
        transition: height .2s;
        transform-origin: bottom;
      }
      ._center{
        background-color: rgba(255, 255, 255, 0);
      }
    }
    .linkWrap:hover {
      .hoverBox{
        height: 3px;
      }
    }
  }
  .nav_right_bar{
    height: 40px;
    position: absolute;
    right: 20px;
    display: flex;
    justify-content: flex-end;
    .loginBut{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: 35px;
      font-size: 14px;
      color: #fff;
      padding: 7px 12px;
      border-radius: 7px ;
      text-align: center;
      background-color: var(--login-but);
      cursor: pointer;
      transition: all .3s;
      span{
        display: inline-block;
        white-space: nowrap;
      }
      &:hover{
        transform: translateY(-60%);
        box-shadow:  0 8px 24px rgba(0,0,0,0.2);
      }
    }
  }
}
.createCenterBut{
  //width: 140px;
  font-size: 14px;
  color: #fff;
  padding: 7px 12px;
  border-radius: 7px ;
  text-align: center;
  background-color: var(--theme-color);
  cursor: pointer;
  transition: all .3s;
  span{
    display: inline-block;
    white-space: nowrap;
  }
  &:hover{
    transform: translateY(-6%);
    box-shadow:  0 5px 25px 4px rgba(0,0,0,0.2);
  }
}
:deep(.el-switch__core) {
  width: 40px;
  background: var(--switch-background) !important;
  border-color: var(--switch-border-background) !important;
  .el-switch__action{
    background-color: var(--background);
  }
}
</style>
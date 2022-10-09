<template>
  <div v-show="navShow" :class="{'navContainer':true,'navContainerDown':!isTop}">
    <div class="iconWrap">
      <img class="navIcon" src="../../assets/image/icon.png" alt="">
      <span :class="{'iconText':true,'iconTextTop':isTop}">Salt-Space</span>
    </div>
    <div class="contentWrap">
      <!--   首页   -->
      <div class="linkWrap" @click="routerPush('/')">
        <span :class="{'inTopSpan':isTop}">主页</span>
        <div class="hoverBox _center"></div>
        <div :class="{'hoverBox':true,'hoverBoxTop':isTop}"></div>
      </div>
      <!--   创作中心   -->
      <div class="linkWrap" @click="routerPush('/createCenter')" >
        <span :class="{'inTopSpan':isTop}">创作中心</span>
        <div class="hoverBox _center"></div>
        <div :class="{'hoverBox':true,'hoverBoxTop':isTop}"></div>
      </div>
      <!--   登录   -->
      <div v-if="!isLogin" class="linkWrap" @click="clickShowLgoInBox">
        <span :class="{'inTopSpan':isTop}">登录</span>
        <div class="hoverBox _center"></div>
        <div :class="{'hoverBox':true,'hoverBoxTop':isTop}"></div>
      </div>
      <!--   用户   -->
      <user-card v-else :size="35"></user-card>
      <!--      <div v-else class="linkWrap">-->
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
import UserCard from "@/components/globals/userCard.vue";

export default defineComponent({
  components: {UserCard, LogInBox},
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
    return {
      showLgoInBox,
      clickShowLgoInBox,
      isTop,
      routerPush,
      navShow,
      isLogin,
    }
  }
})
</script>

<style scoped lang="scss">
@import "src/style/universal";
.navContainer{
  min-width: 1000px;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 9999;
  transition: all .3s;
  .iconWrap{
    height: 40px;
    margin-left: 20px;
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
    .iconTextTop{
      color: white;
    }
  }
  .contentWrap{
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 20px;
    .linkWrap{
      margin: 0 10px;
      cursor: pointer;
      font-size: 16px;
      span{
        transition: all .5s;
      }
      .hoverBox{
        height: 0;
        background-color: black;
        transition: height .2s;
        transform-origin: bottom;
      }
      .hoverBoxTop{
        background-color: white;
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
}
.inTopSpan{
  color: white;
}
.navContainerDown{
  box-shadow: 0 14px 0 -13px rgba(70, 60, 66, 0.84);  //-webkit-backdrop-filter: blur(5px);
  background-image: radial-gradient(transparent 1px,$background-color 1px);
  background-size: 4px 4px;
  backdrop-filter: blur(8px);
}
</style>
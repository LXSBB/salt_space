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
      <div v-else class="linkWrap">
        <el-popover
            :width="250"
            :show-arrow="false"
            popper-class="userCardPop"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
        >
          <template #reference>
            <el-avatar :size="40" src="./src/assets/image/icon.png" />
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
    </div>
    <log-in-box v-if="showLgoInBox"></log-in-box>
  </div>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, ref} from 'vue';
import bus from 'vue3-eventbus'
import LogInBox from "./logInBox.vue";
import {useRoute, useRouter} from "vue-router";

export default defineComponent({
  components: {LogInBox},
  setup() {
    const route: any = useRoute()
    const router = useRouter()
    //导航栏是否在顶部
    let isTop = ref(true)
    //显示导航栏
    let navShow = ref(true)
    //是否是登陆状态
    let isLogin = ref(false)

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
    //退出登录
    function logout() {
      localStorage.removeItem('user_salt')
      localStorage.removeItem('user_info')
      isLogin.value = false
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
      logout
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
  box-shadow: 0 14px 0 -13px rgba(100, 49, 79, 0.84);  //-webkit-backdrop-filter: blur(5px);
  background-image: radial-gradient(transparent 1px,$background-color 1px);
  background-size: 4px 4px;
  backdrop-filter: blur(8px);
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
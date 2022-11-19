<template>
  <div class="linkWrap">
    <div id="nav_avatar_wrap" @mouseleave="navAvatarLeave" @mouseenter="navAvatarEnter">
      <div class="nav_avatar">
        <img src="../../assets/image/icon.png" alt="">
      </div>
    </div>
    <transition name="avatar">
      <div
          class="userCardContent"
          ref="userCardContent"
          v-show="showPop"
          @mouseleave="navAvatarLeave"
          @mouseenter="navAvatarEnter"
      >
        <div class="userName">
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
            <div class="userOptions_but_title">
              <svg-icon class="userCenter_svg" name="userCenter"></svg-icon>
              <span>个人中心</span>
            </div>
            <span> > </span>
          </div>
        </div>
        <div class="userLogout" @click="logout">
          <span>退出登录</span>
        </div>
      </div>
    </transition>
  </div>

</template>

<script lang="ts" setup>
import {defineComponent, defineProps, nextTick, ref} from 'vue';

const props = defineProps({

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

let showPop = ref(false)
let showPopTimer: any = null
const userCardContent = ref('')
function navAvatarEnter(e: any) {
  if (showPopTimer) clearTimeout(showPopTimer)
  showPop.value = true
  nextTick(() => {
    const target: any = document.querySelector('.nav_avatar')
    const pop: any = userCardContent.value
    target.style.transform = `translate(-${pop.offsetWidth/2}px, 30px) scale(2)`
  })
}

function navAvatarLeave(e: any) {
  if (showPopTimer) clearTimeout(showPopTimer)
  showPopTimer = setTimeout(() => {
    showPop.value = false
    const target: any = document.querySelector('.nav_avatar')
    target.style.transform = 'translateY(0px)'
  },500)
}

</script>

<style lang="scss" scoped>
.linkWrap{
  cursor: pointer;
}
#nav_avatar_wrap{
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  z-index: 2;
  .nav_avatar{
    transition: all .3s;
    border-radius:50%;
    border: 1px solid var(--font-color);
    transform-origin: left;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.userCardContent{
  position: absolute;
  top: 110%;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 250px;
  background-color: var(--background);
  border-radius: 10px;
  padding: 15px;
  z-index: 1;
  box-shadow: 0 0 30px rgb(0 0 0 / 10%);
  .userName{
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .userNameSpan{
      display: flex;
      flex-direction: column;
      align-items: center;
      b{
        color: var(--theme-color);
      }
    }
  }
  .userContent{
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
    justify-content: space-between;
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
    margin-top: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #8a8989;
    .userOptions_but{
      padding: 10px;
      width: 100%;
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
      transition: all .3s;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .userOptions_but_title{
        display: flex;
        .svg-icon{
          width: 20px;
          height: 20px;
          color: var(--font-color);
          transition: all .3s;
          margin-right: 10px;
        }
        span{
          color: var(--font-color);
        }
      }
      &:hover{
        background-color: var(--background-home);
        .svg-icon{
          animation: jump_little .5s;
        }
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
.avatar-enter-from,
.avatar-leave-to {
  opacity: 0;
  transform: translateY(5%);
}
.avatar-enter-active,
.avatar-leave-active {
  transition: all .2s ;
}
</style>
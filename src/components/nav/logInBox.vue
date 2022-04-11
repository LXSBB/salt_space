<template>
  <div class="htmlMask" @click="closeLogInBox"></div>
  <transition name="box">
    <div v-if="showLoginBox" class="loginContainer">
      <div class="closeLogin">
        <img class="closeImg" src="src/assets/image/close.png" @click="closeLogInBox">
      </div>
      <div class="loginWays" >
        <div class="mobileWays"  @click="changeWays">
          <span class="mobileWaysSpan">{{isMobileWays?`Log Ln With Account`:`Log Ln With Mobile`}}</span>
        </div>
      </div>
      <div class="boxLine">
        Or
      </div>
      <div class="loginForm">
        <div class="loginFormWrap">
          <transition name="fade">
            <div class="userNameLogin loginFormContent" v-if="!isMobileWays">
              <nav-input :inputType = '`账号/用户名/邮箱`'></nav-input>
              <nav-input :inputType = '`密码`'></nav-input>
            </div>
          </transition>
          <transition name="fade">
            <div class="mobileLogin loginFormContent" v-if="isMobileWays">
              <nav-input :inputType = '`大陆手机号码`'></nav-input>
              <div class="sendCodeWrap">
                <nav-input :inputType = '`验证码`'></nav-input>
                <div class="sendCodeButton" @click="sendCode">
                  <span v-if="!isSendCode" class="sendCodeButtonSpan">Send</span>
                  <span v-else class="countDownSpan">{{countdown}}</span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="loginWays" >
        <div class="loginSubmit" v-showRipple="`rgba(113,164,183,0.3)`">
          <span class="mobileWaysSpan">Log Ln </span>
        </div>
      </div>
      <div class="bottomLine"></div>
      <div class="signUpButton" >
        <span @click="changeLoginOrUp">Sign Up</span>
      </div>
    </div>
  </transition>
  <transition name="box">
    <div  v-if="!showLoginBox" class="loginContainer ">
      <div class="closeLogin">
        <img class="closeImg" src="src/assets/image/close.png" @click="closeLogInBox">
      </div>
      <div class="loginForm signUpForm">
        <div class="loginFormWrap">
          <transition name="fade">
            <div class="userNameLogin loginFormContent" v-if="!isMobileWays">
              <nav-input :inputType = '`用户名`'></nav-input>
              <nav-input :inputType = '`密码`'></nav-input>
              <nav-input :inputType = '`重复密码`'></nav-input>
            </div>
          </transition>
        </div>
      </div>
      <div class="loginWays" >
        <div class="loginSubmit" v-showRipple="`rgba(113,164,183,0.3)`">
          <span class="mobileWaysSpan">Sign Up</span>
        </div>
      </div>
      <div class="bottomLine"></div>
      <div class="signUpButton" >
        <span @click="changeLoginOrUp">Log In</span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {defineComponent, ref, nextTick} from 'vue';
import bus from 'vue3-eventbus'
import NavInput from "./navInput.vue";

export default defineComponent({
  components: {NavInput},
  setup() {
    function closeLogInBox() {
      bus.emit('closeLoginBox')
    }
    let isMobileWays = ref(false)
    //切换手机登录
    function changeWays() {
      isMobileWays.value = !isMobileWays.value
      if(isSendCode.value) {
        nextTick(() => {
          let dom:any = document.querySelector('.sendCodeButton')
          dom.style.backgroundColor = '#032B5288'
          dom.style.cursor = 'not-allowed'
        })
      }
    }
    let showLoginBox = ref(true)
    //切换登录注册
    function changeLoginOrUp() {
      showLoginBox.value = !showLoginBox.value
    }
    let isSendCode = ref(false)
    //倒计时
    let countdown = ref(10)
    let timer:any
    //发送验证码
    function sendCode() {
      if(isSendCode.value) {
        return
      }
      isSendCode.value = true
      let dom:any = document.querySelector('.sendCodeButton')
      dom.style.backgroundColor = '#032B5288'
      dom.style.cursor = 'not-allowed'
      timer = setInterval(() => {
        if(countdown.value > 0){
          countdown.value --
        }else{
          console.log('===2=43=')
          isSendCode.value = false
          countdown.value = 10
          dom.style.backgroundColor = '#0e3e98'
          dom.style.cursor = 'pointer'
          clearInterval(timer)
        }
      },1000)
    }
    return {
      closeLogInBox,
      changeWays,
      isMobileWays,
      sendCode,
      isSendCode,
      countdown,
      showLoginBox,
      changeLoginOrUp
    }
  }
})
</script>

<style scoped lang="scss">
.htmlMask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.3);
  z-index: 1;
}
.loginContainer{
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  background-color: #f8f2f2;
  transform: translate(-50% ,-50%);
  width: 300px;
  border-radius: 5%;
  box-shadow:  0 8px 24px rgb(119, 121, 122), 0 0 0  currentColor;
  display: flex;
  flex-direction: column;
  padding:30px;
  .closeLogin{
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    .closeImg{
      width: 12px;
      height: 12px;
      cursor: pointer;
      transition: all .2s;
    }
    .closeImg:hover{
      transform:scale(1.2) ;
    }
  }
  .loginWays{
    width: 100%;
    height: 40px;
    position: relative;
    margin-bottom: 5px;
    .mobileWays{
      position: absolute;
      top: 0;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background-color: rgb(189, 217, 252);
      color: #1E3FBFFF;
      cursor: pointer;
      transition: all .3s;
      overflow: hidden;
      .mobileWaysSpan{
        font-size: 16px;
        user-select: none;
      }
    }
    .loginSubmit{
      width: 100%;
      height: 40px;
      position: absolute;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      cursor: pointer;
      transition: all .3s;
      background-color: #4F35FDFF;
      color: rgb(189, 217, 252);
      overflow: hidden;
      .mobileWaysSpan{
        font-size: 16px;
        user-select: none;
      }
    }
    .loginSubmit:hover{
      box-shadow:  0 8px 24px rgb(172, 175, 176), 0 0 0  currentColor;
      top:-3px
    }
    .mobileWays:hover{
      box-shadow:  0 8px 24px rgb(172, 175, 176), 0 0 0  currentColor;
      transform: translateY(-10%);
    }
  }
  .signUpWays{
    height: 90px;
    .signUpWaysItem{
      margin-bottom: 10px;
    }
    .EmailWays{
      color: #524db7;
      background-color: #aedbf6;
    }
  }
  .boxLine{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: #666666;
    user-select: none;
    margin-bottom: 5px;
    &:before{
      width: 40%;
      height: 1px;
      content: '';
      background-color: #666666;
    }
    &:after{
      width: 40%;
      height: 1px;
      content: '';
      background-color: #666666;
    }
  }
  .loginForm{
    height: 100px;
    .loginFormWrap{
      width: 100%;
      height: 100%;
      position: relative;
      .loginFormContent{
        width: 100%;
        position: absolute;
        top: 0;
        .sendCodeWrap{
          display: flex;
          justify-content: space-between;
          .sendCodeButton{
            width: 35%;
            height: 40px;
            border-radius: 10px;
            background-color: #0e3e98;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all .3s;
            .sendCodeButtonSpan{
              user-select: none;
              color: white;
              font-size: 14px;
            }
            .countDownSpan{
              user-select: none;
              color: #d0cdcd;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .signUpForm{
    height: 150px;
  }
  .bottomLine{
    background-color: #666666;
    width: 100%;
    height: 1px;
    margin-top: 15px;
  }
  .signUpButton{
    margin-top: 10px;
    color: #4F35FDFF;
    span:hover{
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
.signUpContainer{

}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(5%);
}
.fade-enter-active,
.fade-leave-active {
  transition: all .2s ;
}
.box-enter,.box-leave-to{
  transform: translate(-50%,5%) scale(.6);
  opacity: 0;
}
.box-enter-to,.box-leave{
  opacity: 1;
}
.box-enter-active,.box-leave-active{
  transition: all .5s;
}
</style>

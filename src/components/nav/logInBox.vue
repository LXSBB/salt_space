<template>
  <div class="htmlMask" @click="closeLogInBox"></div>
  <transition name="box">
    <div v-if="showLoginBox" class="loginContainer">
      <div class="closeLogin">
        <img class="closeImg" src="../../assets/image/close.png" @click="closeLogInBox">
      </div>
      <div class="loginWays" >
        <div class="mobileWays"  @click="changeWays">
          <span class="mobileWaysSpan">{{isMobileWays?`Log Ln With Account`:`Log Ln With Mobile`}}</span>
        </div>
      </div>
      <div class="boxLine">
        Or
      </div>
      <div v-if="promptState" class="promptBox">
        <div class="promptBoxWrap">
          <span class="promptBoxText">{{promptText}}</span>
        </div>
      </div>
      <div class="loginForm">
        <div class="loginFormWrap">
          <transition name="fade">
            <div class="userNameLogin loginFormContent" v-if="!isMobileWays">
              <my-form ref="accountLoginForm" :rules="rules" :model="{account,passWord}">
                <my-form-item prop="account">
                  <nav-input  v-model="account" :inputType = '`账号/用户名/邮箱`'></nav-input>
                </my-form-item>
                <my-form-item prop="passWord">
                  <nav-input  v-model="passWord" type="password" :inputType = '`密码`'></nav-input>
                </my-form-item>
              </my-form>
            </div>
          </transition>
          <transition name="fade">
            <div class="mobileLogin loginFormContent" v-if="isMobileWays">
              <my-form ref="mobileLoginForm" :rules="rules" :model="{phoneNum,verifyCode}">
                <my-form-item prop="phoneNum">
                  <nav-input :inputType = '`大陆手机号码`' v-model="phoneNum"></nav-input>
                </my-form-item>
                <div class="sendCodeWrap">
                  <my-form-item prop="verifyCode">
                    <nav-input :inputType = '`验证码`' v-model="verifyCode"></nav-input>
                  </my-form-item>
                  <div class="sendCodeButton" @click="sendCode">
                    <span v-if="!isSendCode" class="sendCodeButtonSpan">Send</span>
                    <span v-else class="countDownSpan">{{countdown}}</span>
                  </div>
                </div>
              </my-form>
            </div>
          </transition>
        </div>
      </div>
      <div class="loginWays" >
        <div class="loginSubmit" @click="loginEvent" v-showRipple="`rgba(113,164,183,0.3)`">
          <el-icon class="is-loading loadingIcon" v-if="isLoading">
            <Loading />
          </el-icon>
          <span class="mobileWaysSpan">Log Ln</span>
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
        <img class="closeImg" src="../../assets/image/close.png" @click="closeLogInBox">
      </div>
      <div v-if="promptState" class="promptBox">
        <div class="promptBoxWrap">
          <span class="promptBoxText">{{promptText}}</span>
        </div>
      </div>
      <div class="loginForm signUpForm">
        <div class="loginFormWrap">
          <transition name="fade">
            <div class="userNameLogin loginFormContent">
              <my-form ref="signUpForm" :rules="rules" :model="signUpDate">
                <my-form-item prop="signUpAccount">
                  <nav-input v-model="signUpDate.signUpAccount" :inputType = '`用户名`'></nav-input>
                </my-form-item>
                <my-form-item prop="signUpPassWord">
                  <nav-input v-model="signUpDate.signUpPassWord" :inputType = '`密码`'></nav-input>
                </my-form-item>
                <my-form-item prop="signUpReactivePassWord">
                  <nav-input v-model="signUpDate.signUpReactivePassWord" :inputType = '`重复密码`'></nav-input>
                </my-form-item>
              </my-form>
            </div>
          </transition>
        </div>
      </div>
      <div class="loginWays" >
        <div class="loginSubmit" @click="signUpEvent" v-showRipple="`rgba(113,164,183,0.3)`">
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
import {defineComponent, ref, nextTick, reactive, onMounted, onUnmounted} from 'vue';
import bus from 'vue3-eventbus'
import NavInput from "./navInput.vue";
import MyForm from "../myComp/myForm.vue";
import MyFormItem from "../myComp/myFormItem.vue";
import {UserService} from "@/api/userService";
import { ElNotification } from 'element-plus';

export default defineComponent({
  components: {MyFormItem, MyForm, NavInput},
  setup() {
    const rules = {
      account:{
        required: true,
        max: 100,
        trigger:'blur'
      },
      passWord:{
        required: true,
        max:255,
        trigger:'blur'
      },
      phoneNum:{
        required: true,
        max: 11,
        pattern:/^[1]([3-9])[0-9]{9}$/,
        trigger:'blur'
      },
      verifyCode:{
        required: true,
        max: 4,
        trigger:'blur'
      },
      signUpAccount:{
        required: true,
        max: 100,
        trigger:'blur'
      },
      signUpPassWord:{
        required: true,
        max: 255,
        trigger:'blur'
      },
      signUpReactivePassWord:{
        required: true,
        max: 255,
        trigger:'blur'
      },
    }
    function closeLogInBox() {
      bus.emit('showLoginBox', false)
    }
    let isMobileWays = ref(false)
    //切换登录方式
    function changeWays() {
      initialFrom()
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
    let countdown = ref(3)    //倒计时
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
          dom = document.querySelector('.sendCodeButton')
          isSendCode.value = false
          countdown.value = 3
          dom.style.backgroundColor = '#0e3e98'
          dom.style.cursor = 'pointer'
          clearInterval(timer)
        }
      },1000)
    }
    //提交表单
    let phoneNum = ref('')
    let account = ref('')
    let passWord = ref('')
    let verifyCode = ref('')  //验证码
    let promptText = ref('') //提示词
    let promptState = ref(false) //提示框状态
    let signUpDate = reactive({
      signUpAccount:'',
      signUpPassWord:'',
      signUpReactivePassWord:''
    })
    const accountLoginForm:any = ref(null)
    const mobileLoginForm:any = ref(null)
    const signUpForm:any = ref(null)
    let isLoading: any = ref(false)
    //登录
    function loginEvent() {
      promptState.value = false
      isLoading.value = true
      if(isMobileWays.value) {
        mobileLoginForm.value.validate((res:boolean) => {
          console.log(res,'===w=4=2===')
        })
        //手机验证码登录
        console.log(phoneNum.value,verifyCode.value)
      }else {
        if (!accountLoginForm.value) {
          isLoading.value = false
          return
        }
        //账号密码登录
        accountLoginForm.value.validate((val: boolean) => {
          if (!val) {
            isLoading.value = false
            return
          }
          UserService.login({
            username:account.value,
            password:passWord.value
          })
            .then((res :any) => {
              console.log(res)
              let {data, code} = res
              if (code === 1) {
                bus.emit('showLoginBox', false)
                bus.emit('isLogin', true)
                ElNotification({
                  offset: 70,
                  title: 'Success',
                  message: '登录成功',
                  type: 'success',
                })
                localStorage.setItem('user_salt', data.token)
                localStorage.setItem('user_info', JSON.stringify(data.user_Info))
              } else {
                ElNotification({
                  offset: 70,
                  title: 'Warning',
                  message: res.data.message,
                  type: 'warning',
                })
              }
              isLoading.value = false
            })
            .catch((e) => {
              isLoading.value = false
            })
        })
      }
    }
    //注册
    function signUpEvent() {
      promptState.value = false
      signUpForm.value.validate((res:boolean) => {
        if(res) {
          if(signUpDate.signUpReactivePassWord !== signUpDate.signUpPassWord) {
            openPromptBox('输入的密码不一致')
          }else {

          }
        }
      })

    }
    //打开提示框
    function openPromptBox(res:string) {
      promptState.value = true
      promptText.value = res
    }
    //初始化
    function initialFrom() {
      account.value = ''
      passWord.value = ''
      phoneNum.value = ''
      verifyCode.value = ''
      promptState.value = false
      promptText.value = ''
    }

    function keydown(e: any) {
      if (e.code === 'Enter') {
        if (isLoading.value) return
        if (showLoginBox) {
          loginEvent()
        } else {
          signUpEvent()
        }
      } else if (e.code === 'Escape') {
        bus.emit('showLoginBox', false)
      }
    }
    onMounted(() => {
      window.addEventListener('keydown', keydown)
    })

    onUnmounted(() => {
      window.removeEventListener('keydown', keydown)
    })
    return {
      closeLogInBox,
      changeWays,
      isMobileWays,
      sendCode,
      isSendCode,
      countdown,
      showLoginBox,
      changeLoginOrUp,
      phoneNum,
      account,
      passWord,
      verifyCode,
      signUpDate,
      loginEvent,
      signUpEvent,
      promptText,
      promptState,
      openPromptBox,
      rules,
      accountLoginForm,
      mobileLoginForm,
      signUpForm,
      isLoading
    }
  }
})
</script>

<style scoped lang="scss">
.htmlMask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,.3);
  z-index: 1;
}
.loginContainer{
  position: fixed;
  z-index: 2;
  top: 50vh;
  left: 50vw;
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
      .loadingIcon{
        position: absolute;
        left: 75px;
      }
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
  .promptBox{
    width: 100%;
    background-color: red;
    margin-bottom: 10px;
    border-radius: 5px;
    .promptBoxWrap{
      width: 98%;
      border: 1px solid red;
      margin-left: 2%;
      border-radius: 4px;
      background-color: #e6e6ea;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 10px;
      display: flex;
      align-items: center;
      .promptBoxText{
        display: inline-block;
        width: 100%;
        font-size: 12px;
        font-weight: bolder;
      }
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

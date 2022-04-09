<template>
  <div class="htmlMask" @click="closeLogInBox"></div>
  <div class="loginContainer">
    <div class="closeLogin">
      <img class="closeImg" src="src/assets/image/close.png" @click="closeLogInBox">
    </div>
    <div class="loginWays">
      <div class="mobileWays">
        <span class="mobileWaysSpan">Log Ln With Mobile</span>
      </div>
    </div>
    <div class="boxLine">
      Or
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import bus from 'vue3-eventbus'

export default defineComponent({
  setup() {
    function closeLogInBox() {
      bus.emit('closeLoginBox')
    }
    return {
      closeLogInBox
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
  height: 450px;
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
      width: 15px;
      height: 15px;
      cursor: pointer;
    }
  }
  .loginWays{
    width: 100%;
    height: 50px;
    position: relative;
    margin-bottom: 5px;
    .mobileWays{
      position: absolute;
      top: 0;
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background-color: rgb(189, 217, 252);
      color: #1E3FBFFF;
      cursor: pointer;
      transition: all .3s;
      .mobileWaysSpan{
        font-size: 16px;
      }
    }
    .mobileWays:hover{
      box-shadow:  0 8px 24px rgb(172, 175, 176), 0 0 0  currentColor;
      top: -5px;
    }
  }
  .boxLine{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: #666666;
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
}

</style>

<template>
  <div class="bannerItemContainer">
    <div class="console-container">
      <span id="bannerItem1Text">111</span>
      <div class="console-underscore" id="console"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';

export default defineComponent({
  setup() {

    function consoleText(words:any, id:any, colors:any = ['#fff']) {
      let visible = true;
      let con:any = document.getElementById('console');//光标
      let letterCount = 1;//执行的当前字母的下标
      let x = 1;
      let waiting = false;//输入和删除时等待的时间
      let target:any = document.getElementById(id)//显示的文字
      target.setAttribute('style', 'color:' + colors[0])
      window.setInterval(function() {
        if (letterCount === 0 && !waiting) {
          //将要输入时
          waiting = true;
          target.innerHTML = words[0].substring(0, letterCount)
          window.setTimeout(function() {
            let usedColor = colors.shift();
            colors.push(usedColor);
            let usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            target.setAttribute('style', 'color:' + colors[0])
            letterCount += x;
            waiting = false;
          }, 1000)
        } else if (letterCount === words[0].length + 1 && !waiting) {
          //已经输入完成
          waiting = true;
          window.setTimeout(function() {
            x = -1;
            letterCount += x;
            waiting = false;
          }, 1000)
        } else if (!waiting) {
          //显示字母
          target.innerHTML = words[0].substring(0, letterCount)
          letterCount += x;
        }
      }, 120)
      //光标闪动
      window.setInterval(function() {
        if (visible) {
          con.className = 'console-underscore hidden'
          visible = false;
        } else {
          con.className = 'console-underscore'
          visible = true;
        }
      }, 400)
    }
    onMounted(() => {
      consoleText(['welcome to', 'salt-space'], 'bannerItem1Text',['tomato','lightblue']);
    })
    return {}
  }
})
</script>

<style scoped lang="scss">
.bannerItemContainer{
  height: 100%;
  width: 100%;
  background-color: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  .console-container{
    height: 100px;
    min-width: 30px;
    font-size: 70px;
    text-align: center;
    display: flex;
    position: relative;
    #bannerItem1Text{
      margin-right: 40px;
    }
    .console-underscore{
      width: 30px;
      height: 6px;
      background-color: white;
      position: absolute;
      bottom: 0;
      right: 0;
    }
    .hidden{
      opacity: 0;
    }
  }
}
</style>
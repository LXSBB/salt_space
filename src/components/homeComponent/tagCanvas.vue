<template>
  <div class="tagContainer">
    <canvas id="tagCanvas"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, onUnmounted, ref} from 'vue';
import {tagFontCell} from '../../tool/canvas/tagFontCell'
export default defineComponent({
  setup() {
    let ctx: any = null
    let fontCells:any = []
    const tagList = ['前端', '后端', 'JavaScript', 'Java', 'Canvas', 'Three.js', 'node', 'Webpack', 'Vue', 'EChats']
    function init() {
      fontCells = []
      let canvas: any = document.getElementById('tagCanvas');
      const wrap: any = document.querySelector('.tagContainer')
      ctx = canvas.getContext('2d');
      canvas.width = wrap.clientWidth
      canvas.height = wrap.clientHeight
    }
    //父元素大小变化调用
    function resizeWin() {
      nextTick(() => {
        init();
      })
    }
    onMounted(() => {
      init();
      window.addEventListener('resize',resizeWin)
    })
    onUnmounted(() => {
      window.removeEventListener('resize',resizeWin)
    })
    return {}
  }
})

</script>

<style scoped lang="scss">
.tagContainer{
  width: 100%;
  margin-top: 10px;
  border: 1px solid red;
  flex:1
}
</style>
<template>
  <div id="tagContainer">
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import {computed, defineComponent, nextTick, onMounted, onUnmounted, ref} from 'vue';
export default defineComponent({

  setup() {
    // const tagList = ['前端', '后端', 'JavaScript', 'Java', 'Canvas', 'Three.js', 'node', 'Webpack', 'Vue', 'EChats']
    const tagList = [
      {name:'前端',value:40},
      {name:'后端',value:40},
      {name:'数据可视化',value:25},
      {name:'JavaScript',value:25},
      {name:'Java',value:30},
      {name:'Canvas',value:30},
      {name:'Three.js',value:30},
      {name:'node',value:30},
      {name:'Webpack',value:20},
      {name:'Vue',value:20},
      {name:'EChats',value:20},
      {name:'低代码',value:20},
    ]
    function init() {
      let dom:any = document.getElementById('tagContainer')
      const chart = echarts.init(dom)
      chart.on('click', clickTag)
      chart.setOption({
        title: {
          text: 'Click tag! (✿◡‿◡)',
          top: '5%',
          left: '3%',
          textStyle: {
            fontSize: 16,
            color: '#5353b2',
            fontWeight: 'normal'
          }
        },
        series: [
          {
            type: 'wordCloud',
            shape: 'cardioid',
            left: '0%',                 // X轴偏移量
            top: '-15%',                  // Y轴偏移量
            width: '100%',               // canvas宽度大小
            height: '100%',              // canvas高度大小
            sizeRange: [12, 50],         //  词典字体大小范围配置
            rotationRange: [-90, 90],
            rotationStep: 45,             // 词典字体旋转角度配置，默认不旋转
            gridSize: 15,                // 词典字体间距配置
            layoutAnimation: true,       // 为false词典过度会阻塞
            drawOutOfBound: false,      //允许绘制大于画布大小的单词
            textStyle: {                 // 词典样式配置
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              // 回调函数 或 颜色值
              color: function () {
                // 默认 随机颜色
                return 'rgb(' + [
                  Math.round(Math.random() * 220),
                  Math.round(Math.random() * 240),
                  Math.round(Math.random() * 220)
                ].join(',') + ')';
              },
            },
            // 鼠标hover的特效样式
            emphasis: {
              focus: 'self',
              textStyle: {
                textShadowBlur: 8,
                textShadowColor: '#9784f3'
              }
            },
            // 渲染词典数据
            data: tagList
          }
      ]
    });
    }
    function clickTag(params:any) {
      console.log(params)
    }

    //父元素大小变化调用
    function resizeWin() {
      setTimeout(() => {
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
#tagContainer{
  width: 100%;
  height: 100%;
}
</style>
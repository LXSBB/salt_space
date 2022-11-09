<template>
  <div id="tagContainer"/>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import _ from 'lodash';
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

    let timer: any = null

    let chart: any

    function init() {
      if( timer !== null){
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        let dom:any = document.getElementById('tagContainer')
        if (chart != null && chart != "" && chart != undefined) {
          chart.dispose(); //销毁
        }
        chart = echarts.init(dom)
        chart.on('click', clickTag)
        chart.setOption({
          series: [
            {
              type: 'wordCloud',
              shape: 'circle',
              left: 'center',                 // X轴偏移量
              top: 'center',
              right: null,
              bottom: null,// Y轴偏移量
              width: '100%',               // canvas宽度大小
              height: '100%',              // canvas高度大小
              sizeRange: [12, 50],         //  词典字体大小范围配置
              rotationRange: [-90, 90],
              rotationStep: 45,             // 词典字体旋转角度配置，默认不旋转
              gridSize: 8,                // 词典字体间距配置
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
      }, 200)
    }
    function clickTag(params:any) {
      console.log(params)
    }

    //父元素大小变化调用
    function resizeWin() {
      init();
    }
    onMounted(() => {
      init();
      window.addEventListener('resize', resizeWin)
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
  overflow: hidden;
}
</style>
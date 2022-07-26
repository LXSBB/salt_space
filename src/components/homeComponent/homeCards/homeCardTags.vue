<template>
  <div :style="{'background':backGroundC}" class="tagContainer">
    <span :style="{'color':fontC}">{{props.tagName}}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';

export default defineComponent({
  props:{
    tagName:String
  },
  setup(props) {
    let backGroundC = ref('red')
    let fontC = ref('black')
    onMounted(() => {
      switch (props.tagName) {
        case 'Vue':
          backGroundC.value = '#41b883'
          fontC.value = '#34495e'
          break;
        case 'JavaScript':
          backGroundC.value = '#e69600'
          break;
        case 'Css':
          backGroundC.value = '#3741ff'
          fontC.value = '#fff'
          break;
      }
    })
    return {props,backGroundC,fontC}
  }
})
</script>

<style scoped lang="scss">
.tagContainer{
  height: 20px;
  display: flex;
  padding:5px 10px ;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-right: 5px;
  span{
    font-size: 12px;
    line-height: 15px;
  }
}
</style>
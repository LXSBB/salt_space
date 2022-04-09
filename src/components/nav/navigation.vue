<template>
  <div class="navContainer">
    <div class="iconWrap"></div>
    <div class="contentWrap">
      <div>
        <span>Study</span>
      </div>
      <div>
        <span>Game</span>
      </div>
      <div>
        <span>Log in</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent,onMounted} from 'vue';
import bus from 'vue3-eventbus'

export default defineComponent({
  setup() {
    onMounted(()=>{
      bus.on('kkk',(msg:number)=>{
        console.log(msg)
      })
    })
    return {}
  }
})
</script>

<style scoped lang="scss">
.navContainer{
  width: 100%;
  height: 60px;
  border: 1px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .iconWrap{
    height: 40px;
    width: 100px;
    border: 1px solid red;
    margin-left: 20px;
  }
  .contentWrap{
    height: 40px;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 20px;

  }
}
</style>
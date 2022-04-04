<template>
  <div class="navContainer">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/personalCenter">About</router-link>
    </nav>
    <span>333</span>
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
  span{
    color: red;
  }
}
</style>
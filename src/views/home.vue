<template>
  <div>
    <span>{{ homeStore.num }}</span>
    <button @click="click">click</button>
    <span>{{myNum}}</span>
    <div class="a1"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent,ref} from 'vue';
import {useHomeStore} from "../store/home_store";
import bus from 'vue3-eventbus'

export default defineComponent({
  setup() {
    const homeStore:any = useHomeStore()
    const myNum = ref(1)

    function click() {
      bus.emit('kkk',111)
      // homeStore.$patch((state:any) => {
      //   state.num++
      //   myNum.value = state.num
      // })

      //homeStore.num++
      // homeStore.countPlusOne(100)
    }

    return {
      homeStore,
      myNum,
      click
    }
  }
})
</script>

<style scoped lang="scss">
.a1{
  width: 100px;
  height: 200px;
  background-color: aquamarine;
}
</style>
<template>
  <div class="homeContainer">
    <header-banner></header-banner>

<!--    <span>{{ homeStore.num }}</span>-->
<!--    <button @click="click">click</button>-->
<!--    <span>{{myNum}}</span>-->
  </div>
</template>

<script lang="ts">
import {defineComponent,ref} from 'vue';
import {useHomeStore} from "../store/home_store";
import bus from 'vue3-eventbus'
import HeaderBanner from "../components/headerBanner/headerBanner.vue";

export default defineComponent({
  components: {HeaderBanner},
  setup() {
    const homeStore:any = useHomeStore()
    const myNum = ref(1)

    // function click() {
    //   bus.emit('kkk',111)
    //   // homeStore.$patch((state:any) => {
    //   //   state.num++
    //   //   myNum.value = state.num
    //   // })
    //
    //   //homeStore.num++
    //   // homeStore.countPlusOne(100)
    // }

    return {
      homeStore,
      myNum,
      //click
    }
  }
})
</script>

<style scoped lang="scss">
.homeContainer{
  min-width: 700px;
  width: 100%;
  height: 3000px;
  display: flex;
  flex-direction: column;
  .a1{
    min-width: 140px;
    width: 300px;
    height: 200px;
    margin-bottom: 30px;
    background-color: aquamarine;
  }
}
</style>
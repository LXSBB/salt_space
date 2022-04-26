<template>
  <div class="homeContainer">
    <header-banner></header-banner>
    <home-cards></home-cards>
    <home-footer></home-footer>
  </div>
</template>

<script lang="ts">
import {defineComponent,ref} from 'vue';
import {useHomeStore} from "../store/home_store";
import bus from 'vue3-eventbus'
import HeaderBanner from "../components/headerBanner/headerBanner.vue";
import HomeFooter from "../components/homeFooter/homeFooter.vue";
import HomeCards from "../components/homeCards/homeCards.vue";

export default defineComponent({
  components: {HomeCards, HomeFooter, HeaderBanner},
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  //background-color: #eef6f0;

}
</style>
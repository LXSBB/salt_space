<template>
  <div style="min-height: 35px" :class="{'topicButContainer':true,'isActive':isActive}" @click="handleClick">
    <span class="butSpan">{{prop.btuName}}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent, toRefs, ref, onMounted, watch,computed} from 'vue';
import {useHomeStore} from "@/store/home_store";

export default defineComponent({
  props:{
    prop:Object
  },
  setup(props,{emit}) {
    let {prop} = toRefs(props)
    let isActive = ref(false)
    const homeStore:any = useHomeStore()

    function handleClick() {
      homeStore.changeTopic((props.prop as any).type)
      emit('clickBtn',(props.prop as any).type)
    }
    let topicType = computed(() => {
      return homeStore.nowTopic
    })


    watch(topicType,(val) => {
        isActive.value = val === (props.prop as any).type
    },{immediate:true})

    onMounted(() => {
    })
    return {prop,isActive,handleClick}
  }
})
</script>

<style scoped lang="scss">
.topicButContainer{
  height: 35px;
  padding: 0 10px;
  border-radius:5px ;
  display: flex;
  align-items: center;
  border: 1px solid #666666;
  cursor: pointer;
  user-select: none;
  transition: all .2s;
  margin-right: 10px;
  .butSpan{
    font-weight: bolder;
  }
}
.topicButContainer:hover{
  transform: translateY(-10%);
  box-shadow:  0 5px 25px 4px rgba(0,0,0,0.2);
}
.topicButContainer:active{
  background-color: #eaeeee;
}
.isActive{
  background-color: #eaeeee;
}
</style>
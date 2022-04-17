<template>
  <form>
    <slot></slot>
  </form>
</template>

<script lang="ts">
import {defineComponent, provide, reactive, ref, toRefs, onMounted} from 'vue';
import bus from 'vue3-eventbus'

export default defineComponent({
  props:{
    model:Object,
    rules:Object
  },
  setup(props) {
    let fields:any = reactive([])
    let {model} = toRefs(props)
    //收集所有item的验证方法
    bus.on('addItemFields',(field:object) => {
      field && fields.push(field)
    })

    //执行item校验
    const validate = (cb:any) => {
      const tasks = fields.map( (item:any) => item.validate() )
      Promise.all(tasks)
        .then( () => { cb(true) } )
        .catch(() => {
          cb(false)
        })
    }
    const myForm = reactive({
      ...toRefs(props)
    })
    provide('myForm',myForm)

    onMounted(() => {
    })
    return {validate,model}
  }
})
</script>

<style scoped lang="scss">

</style>
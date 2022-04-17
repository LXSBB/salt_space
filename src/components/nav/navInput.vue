<template>
  <div :class="{'navInputContainer':true,'inputFocus':isFocus,'codeWidth':smallSize}" >
    <input @focus="isFocus = true"
           @blur="handelBlur"
           :type="props.type"
           @input='handelChange'
           :value="modelValue"
           class="navInput" :placeholder="props.inputType"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, toRefs, ref, inject, nextTick} from 'vue';
import bus from 'vue3-eventbus'

export default defineComponent({
  props:{
    inputType:String,
    type:String,
    modelValue:String,
    name:String,
   },
  setup(props,{emit}) {
    const {inputType,modelValue,name} = toRefs(props)
    let isFocus = ref(false)
    let smallSize = ref(false)
    let inputVal = ref('')
    const myFormItem:any = inject('myFormItem')
    let trigger = myFormItem?.trigger?.split(' ')
    //输入事件
    function handelChange(e:any) {
      inputVal.value = e.target.value
      emit("update:modelValue",e.target.value)
      nextTick(() => {
        if(trigger.includes('change')) {
          myFormItem && bus.emit(`validate_${myFormItem.name}`)
        }
      })
    }
    //失去焦点
    function handelBlur() {
      isFocus.value = false
      nextTick(() => {
        if(trigger.includes('blur')) {
          myFormItem && bus.emit(`validate_${myFormItem.name}`)
        }
      })
    }
    onMounted(() => {
      if(inputType.value === '验证码') {
        smallSize.value = true
      }
    })
    return {
      props,
      isFocus,
      smallSize,
      handelChange,
      modelValue,
      handelBlur
    }
  }
})
</script>

<style scoped lang="scss">
.navInputContainer{
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgb(24, 123, 246);
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  .navInput{
    width: 100%;
    font-size: 14px;
    line-height: normal;
    color: #666666;
  }
  input::-webkit-input-placeholder {
    color: #aab2bd;
    font-size: 14px;
  }
}
.inputFocus{
  box-shadow:  0 0 0 3px rgba(3,102,214,0.3);
}
.codeWidth {
  width: 135px;
}
</style>
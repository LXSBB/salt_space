<template>
  <div :class="{'navInputContainer':true,'inputFocus':isFocus,'codeWidth':smallSize}" >
    <input @focus="isFocus = true"
           @blur="isFocus = false"
           :type="props.type"
           @input='inputRes'
           :value="modelValue"
           class="navInput" :placeholder="props.inputType"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, toRefs, ref} from 'vue';

export default defineComponent({
  props:{
    inputType:String,
    type:String,
    modelValue:String,
    name:String,
    rule:Array
  },
  setup(props,context) {
    const {inputType,modelValue,name,rule} = toRefs(props)
    let isFocus = ref(false)
    let smallSize = ref(false)
    let myRule:any = ref({})
    let inputVal = ref('')
    //输入事件
    function inputRes(e:any) {
      inputVal.value = e.target.value
      context.emit("update:modelValue",e.target.value)
    }
    //表单验证
    function verify() {
      let wrap:any = document.querySelector('.navInputContainer')
      if(myRule.value.required && !inputVal.value) {
        wrap.style.border = '1px solid red'
      }
    }
    onMounted(() => {
      if(inputType.value === '验证码') {
        smallSize.value = true
      }
      rule.value?.forEach((item:any) => {
        if(item.name === name.value) {
          myRule.value = item
        }
      })
      if(myRule.value){
        let dom:any = document.querySelector('.navInput')
        dom.addEventListener(myRule.value.trigger,verify)
      }
    })
    return {
      props,
      isFocus,
      smallSize,
      inputRes,
      modelValue
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
  width: 60%;
}
</style>
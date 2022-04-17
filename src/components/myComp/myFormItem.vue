<template>
  <div class="myFormItem">
    <slot></slot>
    <transition name="error">
      <div class="errors" v-if="showError">
        <div class="errorsTextWrap">
          <img src="" alt="">
          <span>{{error}}</span>
        </div>
        <div class="errorsBottom">
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {defineComponent,reactive, onMounted, ref, toRefs, provide, inject} from 'vue';
import Schema from "async-validator";
import bus from 'vue3-eventbus'

export default defineComponent({
  props:{
    prop:String
  },
  setup(props) {
    let error = ref() //报错信息
    let myForm:any = inject('myForm') //表单校验配置
    let showError = ref(false)
    //通过表单项进行校验
    const validate = () => {
      if (!props.prop) return;
      const rules = myForm.rules[props.prop]; //规则
      const value = myForm.model[props.prop]; //输入的值
      const validator = new Schema({ [props.prop]: rules });
      return validator.validate({ [props.prop]: value }, (errors) => {
        // errors存在则校验失败
        if (errors) {
          error.value = errors[0].message;
          showError.value = true
          closeErrorBox(2000)
        } else {
          // 校验通过
          closeErrorBox(0)
          //error.value = "";
        }
      });
    };

    let timer
    function closeErrorBox(wait:number) {
      timer = null
      timer = setTimeout(() => {
        showError.value = false
        error.value = "";
      },wait)
    }
    const myFormItem = reactive({
      trigger:myForm.rules[(props.prop as any)].trigger,
      name:props.prop,
      validate
    })
    provide('myFormItem',myFormItem)

    onMounted(() => {
      bus.on(`validate_${props.prop}`,validate)
      props.prop && bus.emit('addItemFields',myFormItem)
    })
    return {error,validate,showError,myForm}
  }
})
</script>

<style scoped lang="scss">
.myFormItem{
  position: relative;
  .errors{
    height: 30px;
    position: absolute;
    top: -8px;
    left: 60%;
    transform:translateY(-100%) ;
    display: flex;
    flex-direction: column;
    .errorsTextWrap{
      white-space: nowrap;
      background-color: #f1bd81;
      border-radius: 3px;
      padding: 5px;
      box-shadow: 3px -2.6px 5px  rgba(0,0,0,0.15);
    }
    .errorsBottom{
      margin-left: 10px;
      width: 0;
      height: 0;
      border-top: 6px solid #f1bd81;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      position: relative;
    }

  }
}
.error-enter-from,
.error-leave-to {
  opacity: 0;
  transform: translateY(5%);
}
.error-enter-active,
.error-leave-active {
  transition: all .5s ;
}
</style>
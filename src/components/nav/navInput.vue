<template>
  <div :class="{'navInputContainer':true,'inputFocus':isFocus,'codeWidth':smallSize}" >
    <input @focus="isFocus = true" @blur="isFocus = false" class="navInput" :placeholder="props.inputType"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, toRefs, ref} from 'vue';

export default defineComponent({
  props:{
    inputType:String
  },
  setup(props) {
    const {inputType} = toRefs(props)
    let isFocus = ref(false)
    function inputFocus() {

    }
    const smallSize = ref(false)
    onMounted(() => {
      if(inputType.value === '验证码') {
        smallSize.value = true
      }
    })
    return {
      props,
      inputFocus,
      isFocus,
      smallSize
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
<template>
  <div class="myTitleContainer">
    <div class="stage">
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
      <div :data-text="props.title" class="layer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';

export default defineComponent({
  props:{
    title:String
  },
  setup(props) {
    onMounted(() => {
      if(props.title) {
      }
    })
    return {props}
  }
})
</script>
<style scoped lang="scss">
.myTitleContainer{
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #0077ea, #1f4f96, #1b2949);
  display: flex;
  //align-items: center;
  //justify-content: center;
  .stage{
    width: 100%;
    perspective: 9999px;
    transform-style: preserve-3d;
    position: relative;
    //border: 1px solid red;
    .layer{
      width: 80%;
      height: 80%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform-style: preserve-3d;
      transform: translate(-50%,-50%) rotateY(20deg) rotateX(20deg) ;
      animation-fill-mode: forwards;
      animation: rotate 5s infinite alternate ease-in-out -7.5s;
      display: flex;
      align-items: center;
      justify-content: center;
      &::after{
        content: attr(data-text);
      }
    }
    .layer:after{
      //text-align: center;
      word-wrap:break-word;
      word-break:normal;
      font: 20px "Pacifico", "Kaushan Script", Futura, "Roboto", "Trebuchet MS", Helvetica, sans-serif;
      color: whitesmoke;
      text-shadow: 4px 0 10px rgba(0, 0, 0, 0.13);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .layer:nth-child(1):after {
      transform: translateZ(0px);
    }

    .layer:nth-child(2):after {
      transform: translateZ(-0.5px);
    }

    .layer:nth-child(3):after {
      transform: translateZ(-1px);
    }

    .layer:nth-child(4):after {
      transform: translateZ(-1.5px);
    }

    .layer:nth-child(5):after {
      transform: translateZ(-2px);
    }

    .layer:nth-child(6):after {
      transform: translateZ(-2.5px);
    }

    .layer:nth-child(7):after {
      transform: translateZ(-3px);
    }

    .layer:nth-child(8):after {
      transform: translateZ(-3.5px);
    }
    .layer:nth-child(9):after {
      transform: translateZ(-4px);
    }

    .layer:nth-child(10):after {
      transform: translateZ(-4.5px);
    }

    .layer:nth-child(11):after {
      transform: translateZ(-5px);
    }

    .layer:nth-child(12):after {
      transform: translateZ(-5.5px);
    }

    .layer:nth-child(13):after {
      transform: translateZ(-6px);
    }

    .layer:nth-child(14):after {
      transform: translateZ(-6.5px);
    }

    .layer:nth-child(15):after {
      transform: translateZ(-7px);
    }

    .layer:nth-child(16):after {
      transform: translateZ(-7.5px);
    }

    .layer:nth-child(17):after {
      transform: translateZ(-8px);
    }

    .layer:nth-child(18):after {
      transform: translateZ(-9.5px);
    }

    .layer:nth-child(19):after {
      transform: translateZ(-10px);
    }

    .layer:nth-child(20):after {
      transform: translateZ(-10.5px);
    }

    .layer:nth-child(n+10):after {
      -webkit-text-stroke: 3px rgba(0, 0, 0, 0.25);
    }

    .layer:nth-child(n+11):after {
      -webkit-text-stroke: 5px dodgerblue;
      text-shadow: 0 0 5px #00366b;
    }

    .layer:nth-child(n+12):after {
      -webkit-text-stroke: 5px #0077ea;
    }

    .layer:last-child:after {
      //-webkit-text-stroke: 17px rgba(0, 0, 0, 0.1);
    }

    .layer:first-child:after {
      color: #fff;
      text-shadow: none;
    }

  }
}

@keyframes rotate {
  0%{
    transform:  translate(-50%,-50%) rotateY(20deg) rotateX(20deg);
  }
  100% {
    transform:  translate(-50%,-50%) rotateY(-20deg) rotateX(-20deg);
  }
}
</style>


<template>
  <div class="homeCardItemWrap">
    <div :class="{'homeCardItemWrapFront':true,'isHover':isHover&&hoverUser,'isEnter':isHover}">
      <div class="userInfoWrap" v-showRipple="`#cccbcb`"
           @mouseenter="isHover = hoverUser = true"
           @mouseleave="isHover = hoverUser =  false">
        <div class="userContent">
          <img class="userIcon" src="../../assets/image/icon.png" alt="">
          <div class="userContent_right">
            <span class="userName" >LXSSG</span>
            <span class="userIntroduce">宝应搬砖王</span>
          </div>
        </div>
      </div>
      <div class="homeCardTitleWrap" @mouseenter="isHover = true" @mouseleave="isHover = false">
        <my-title1 v-if="chooseTitle <= 3 " :title="`TeamViewer 系统后台被黑客组织 APT41 攻破`"></my-title1>
        <my-title2 v-if="chooseTitle > 3 && chooseTitle <= 6" :title="`TeamViewer 系统后台被黑客组织 APT41 攻破`"></my-title2>
        <my-title3 v-if="chooseTitle > 6" :title="`TeamViewer 系统后台被黑客组织 APT41 攻破`"></my-title3>
      </div>
      <div class="tagWrap">
        <home-card-tags v-for="(item,index) in arrTag" :tag-name="item" :key="index"></home-card-tags>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import MyTitle1 from "../myTitle/myTitle1.vue";
import MyTitle2 from "../myTitle/myTitle2.vue";
import HomeCardTags from "./homeCardTags.vue";
import MyTitle3 from "../myTitle/myTitle3.vue";

export default defineComponent({
  components: {MyTitle3, HomeCardTags, MyTitle2, MyTitle1},
  setup() {
    let isHover = ref(false)
    let hoverUser = ref(false)
    let chooseTitle = ref(1)
    const arrTag = ref(['Vue',"JavaScript","Css"])
    onMounted(() => {
      chooseTitle.value =  Math.round(Math.random()*10)
    })
    return {isHover,chooseTitle,arrTag,hoverUser}
  }
})
</script>

<style scoped lang="scss">
.homeCardItemWrap{

}
.homeCardItemWrapFront{
  height: 300px;
  border: 1px solid #e1dfdf;
  border-radius: 5px;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all .3s;
  position: relative;
  .homeCardTitleWrap{
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .userInfoWrap{
    position: relative;
    height: 30%;
    width: 100%;
    overflow: hidden;
    cursor: pointer;
    transition: all .5s;
    display: flex;
    align-content: center;
    padding-left: 10px;
    .userContent{
      display: flex;
      align-items: center;
      .userIcon{
        margin-right: 10px;
        width: 40px;
        height: 40px;
        border: 1px solid #d3cfcf;
        border-radius: 50%;
        overflow: hidden;
      }
      .userContent_right{
        display: flex;
        flex-direction: column;
        .userName{
          font-size: 14px;
          font-weight: bolder;
          text-transform: uppercase;
        }
        .userIntroduce{
          font-size: 10px;
          color: #666666;
        }
      }
    }
  }
  .userInfoWrap:hover{
    background-color: #f6f5f5;
  }
  .tagWrap{
    display: flex;
    margin: 5px;
    position: absolute;
    bottom: 5px;
    right: 0;
  }


}
.isEnter{
  box-shadow:  0 5px 15px  rgba(0,0,0,0.35);
}
.isHover{
  box-shadow:  8px 8px 8px  rgba(0,0,0,0.24);
  transform: translateY(-2%);
}
@media screen and (max-width: 1350px) {
  .homeCardItemWrap {
   height: 400px;
  }
}

</style>
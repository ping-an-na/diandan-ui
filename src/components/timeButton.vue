<script setup lang="ts">

import {ref, watch, defineEmits} from 'vue'
import {useMainStore} from "@/stores/index";
import anime from 'animejs/lib/anime.es.js';  // anime.js 动画库
import {storeToRefs} from 'pinia';

let useMain = useMainStore()


let {buttonUse} = storeToRefs(useMain)
// let buttonUse = useMain.buttonUse

// 方法 传递
const emits = defineEmits(['h1ClickStart', 'h1ClickEnd'])
// 属性 传递
const props = defineProps({
  // required: true // 设置必传
  // default: "时间步进器按钮", // 设置默认值
  data: {
    type: [Object],
    default: false,
  },
  currentPosition: {
    type: [String],
    default: "",
  }
});


function timeButtonClick() {
  // emits('h1ClickStart', props.data)
  if (props.data.id === props.currentPosition) return;
  if (props.data.disabled) return;
  if (buttonUse.value) return
  buttonUse.value = true
  console.log(props.data.closeLog)
  if (!props.data.closeLog) useMain.pushTnfoTxt(`点击了「${props.data.name}」`)

  console.log(111)
  emits('clickStart', props.data)

  setTimeout(() => {
    anime({
      targets: '.GradientTime', //动画目标
      width: "100%", //目标指定的属性值要变化到多少,这里是让 css样式中的left变化到100px
      duration: Number(props.data.countdown), //动画播放时间
      easing: "easeOutCirc", //动画缓动方式
      complete: () => {
        anime({
          targets: '.GradientTime', //动画目标
          width: "0%", //目标指定的属性值要变化到多少,这里是让 css样式中的left变化到100px
          duration: 0, //动画播放时间
          easing: "easeOutCirc", //动画缓动方式
        })
      }
    })
    anime({
      targets: '.isTimeButton', //动画目标
      color: "#FFF", //目标指定的属性值要变化到多少,这里是让 css样式中的left变化到100px
      duration: Number(props.data.countdown), //动画播放时间
      easing: "easeOutCirc", //动画缓动方式
      complete: () => {
        anime({
          targets: '.isTimeButton', //动画目标
          color: "#201e1d", //目标指定的属性值要变化到多少,这里是让 css样式中的left变化到100px
          duration: 0, //动画播放时间
          easing: "easeOutCirc", //动画缓动方式
        })
      }
    })
  })

  setTimeout(() => {
    buttonUse.value = false

    console.log(222)
    emits('clickEnd', props.data)
  }, Number(props.data.countdown))
}


</script>

<template>
  <div :class="props.data.disabled?'disabledtimeButton':'isTimeButton'" class="timeButton" @click="timeButtonClick"
       :style="buttonUse || props.data.disabled?'cursor:not-allowed;':''">

    <div style="position: relative;z-index: 2;color:#201e1d;">{{ props.data.name }}</div>
    <div :class="props.data.disabled?'disabledGradientTime':'GradientTime'" v-if=" props.data.disabled"></div>
    <div :class="props.data.disabled?'disabledGradientTime':'GradientTime'" v-else></div>
    <div class="positionBox" v-if="props.data.id === props.currentPosition && props.currentPosition!== ''"></div>

  </div>
</template>

<style scoped lang="scss">

.timeButton {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px #dfe1e5 solid;
  border-radius: 5px;
  color: #201e1d;
  font-size: 16px;
  font-weight: 300;
  padding: 5px 0;
  cursor: pointer;
  position: relative;
  margin: 15px 10%;
  background: #FFF;
}

.disabledtimeButton {
  color: #FFF;
}

.GradientTime {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100%;
  width: 0%;
  background-color: #8c8c8c;
  border-radius: 4px;
}

.disabledGradientTime {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: #8c8c8c;
  border-radius: 4px;

}

.positionBox {
  position: absolute;
  top: 50%;
  left: -20px;
  width: 15px;
  height: 15px;
  transform: translateY(-50%);
  //z-index: -1;
  background: url(@/assets/image/home/jinglingqiu.png);
  background-size: 100%, 100%;
}
</style>

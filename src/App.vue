<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {useMainStore} from "@/stores/index";
let useMain = useMainStore()
// useMain.pushTnfoTxt(`原神！启动！！`)
</script>

<template>
  <RouterView/>
</template>

<style scoped lang="scss">

</style>

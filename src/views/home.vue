<script setup lang="ts">
import {ref} from "vue";

const homeList = ref([
  '000', '001', '002', '003', '004', '005', '006', '007', '008', '009',
  '010', '011', '012', '013', '014', '015', '016', '017', '018', '019',
  '020', '021', '022', '023', '024', '025', '026', '027', '028', '029',
])
const headerNvSheng = ref([
  '000', '001', '002', '003', '004', '005', '006', '007', '008', '009',
  '010', '011', '012', '013', '014', '015', '016', '017', '018', '019',
  '020', '021', '022', '023', '024', '025', '026', '027', '028', '029',
])
let homeNumQuan = ref(0)
let flowChart = ref(0) // 流程 id 默认 0
let xuanrufeizi = ref(0) // 流程 id 默认 0
let jiageType = ref(['1小时', '2小时', '3小时',])
let nvren = ref([] as any[])
let linshijiage = ref({name: "1小时", num: 100})

/**
 * 打开弹窗
 * @param item
 */
function homeNumClick(item: any) {
  homeNumQuan.value = item
}

/**
 * 点击关闭
 * @param item
 */
function guanbi(item: any) {
  if (item === 1) {
    homeNumQuan.value = 0

  } else if (item === 2) {
    xuanrufeizi.value = 0
  }
}

/**
 * 点击确认
 * @param item
 */
function queryOk(item: any) {
  flowChart.value = 1
  homeNumQuan.value = 0
}

function back_(item: any) {
  flowChart.value = flowChart.value - 1
  homeNumQuan.value = 0
  xuanrufeizi.value = 0
  nvren.value = []
  linshijiage.value = {name: "1小时", num: 100}
}

function xuanru(item: any) {
  xuanrufeizi.value = item
}


function jiageTypeClick(item: any) {
  xuanrufeizi.value = item
  if (item === '1小时') {
    linshijiage.value = {name: item, num: 100}
  } else if (item === '2小时') {
    linshijiage.value = {name: item, num: 200}
  } else if (item === '3小时') {
    linshijiage.value = {name: item, num: 300}
  }
}


function queryOk2(item: any) {
  console.log(item)
  let nvrennnn = {
    xuanrufeizi: xuanrufeizi.value,
    name: linshijiage.value.name,
    num: linshijiage.value.num
  }
  nvren.value.push(nvrennnn)

  linshijiage.value = {name: "1小时", num: 100}
  console.log(nvren.value)
  xuanrufeizi.value = 0
}


</script>

<template>
  <div class="viewBox">
    <div class="viewBoxSon" style="">
      <div class="homeBox" style="">
        <div v-if="flowChart === 0" class="homeBox1">
          <div class="tanchuang" v-if="homeNumQuan !== 0">
            <div class="guanbi" @click="guanbi(1)">X</div>
            <div style="display: flex;justify-content: center;align-items: center;flex-flow: column;height: 100%">
              <div class="" style="font-size: 32px;margin:10px 0; ">欢迎光临{{ homeNumQuan }}包厢</div>
              <div>
                请输入定包人张先生的手机尾号
              </div>

              <div style="" class="shoujihluru">
                <div v-for="item of '132****'"> {{ item }}</div>
                <div class="fangkuang"></div>
                <div class="fangkuang"></div>
                <div class="fangkuang"></div>
                <div class="fangkuang"></div>
              </div>

              <div style="font-size: 14px;color: red;flex: 1">
                一些提示语一些提示语一些提示语一些提示语一些提示语一些提示语
              </div>
              <div @click="queryOk"
                   style="width: 100px;padding:20px 40px;border-radius: 4px;background: #232221;color:#fff; display: flex;justify-content: center;align-items: center;margin-bottom:60px;cursor: pointer; ">
                确定
              </div>

            </div>
          </div>
          <div class="homeLeft">
            <div v-for="item of homeList" class="homeNum" @click="homeNumClick(item)">
              <div>{{ item }}包厢</div>
              <div style="font-size: 16px;color: pink;">豪华大包</div>
            </div>

          </div>
          <div class="homeRight">
            <div style="height: 20%;display: flex;justify-content: center;align-items: center">
              <img src="../assets/image/home/logo.gif" width="40%">
              <div style="color: #02f195;font-size: 24px;margin-left: 20px">某某集团</div>
            </div>
            <div>
              <div class="rightHomeTitle"> 集团信息</div>
              <div class="divSuojin">
                某某集团某某地区明星企业，中国五百强企业，遍及全国42个地级市，某某集团某某地区明星企业，中国五百强企业，遍及全国42个地级市，某某集团某某地区明星企业，中国五百强企业，遍及全国42个地级市，某某集团某某地区明星企业，中国五百强企业，遍及全国42个地级市，某某集团某某地区明星企业，中国五百强企业，遍及全国42个地级市，
              </div>
            </div>
            <div>
              <div class="rightHomeTitle"> 联系电话</div>
              <div class="divSuojin"> 132********</div>
            </div>
            <div>
              <div class="rightHomeTitle"> 地址</div>
              <div class="divSuojin"> 山东省青岛市市北区自由港路****号******</div>
            </div>
          </div>
        </div>
        <div v-if="flowChart === 1" class="homeBox2">

          <div class="tanchuang1" v-if="xuanrufeizi !== 0">
            <div class="guanbi" @click="guanbi(2)">X</div>
            <div
                style="display: flex;justify-content: center;align-items: center;height:calc(100% - 20px);padding: 10px;">
              <div style="width: 400px;display: flex;justify-content: center;align-items: center">
                <img src="../assets/image/home/header.jpg" width="100%" height="100%">
              </div>
              <div style="flex: 1;height: 100%;display: flex;flex-flow: column;">

                <div
                    style="height: 300px;display: flex;justify-content: center;align-items: center;border-radius: 6px;flex-flow: column;flex: 1;">
                  <div>一些个人信息</div>
                  <div>一些个人信息</div>
                  <div>一些个人信息</div>
                  <div>一些个人信息</div>
                  <div>一些个人信息</div>
                </div>

                <div style="display: flex;align-items: center;justify-content: center;">
                  <!--                  <div>价格</div>-->
                  <div class="anniujiage" :class="linshijiage.name === item?'xuanzhongClass':''"
                       v-for="item of jiageType" @click="jiageTypeClick(item)"> {{ item }}
                  </div>
                </div>

                <div style="height: 100px;display: flex;align-items: center;justify-content: space-between;">
                  <div style="font-size: 22px;margin: 0 100px">
                    价格:{{ (linshijiage.num).toFixed(2) }}
                  </div>
                  <div @click="queryOk2('')"
                      style="    cursor: pointer;height: 60px;width: 120px;display: flex;justify-content: center;align-items:center;color: #FFF;background: #201e1d;margin-right:40px;border-radius: 6px">
                    确定
                  </div>
                </div>


              </div>


            </div>
          </div>


          <div style="height: 100%;overflow: auto">
            <div
                style="width: 300px;height: 180px;background:#242221;display: flex;align-items: center;margin: 10px 0;border-radius: 6px"
                v-for="item of headerNvSheng">
              <div
                  style="width: 120px;height: 160px;display: flex;justify-content: center;align-items: center;margin-left: 10px">
                <img src="../assets/image/home/header.jpg" width="100%" height="100%">
              </div>
              <div class=""
                   style="flex: 1;background: #fff;height: 160px;margin-right: 10px;border-radius: 0 6px 6px 0">
                <div
                    style="width: calc(100% - 5px);height:calc(100% - 10px);;display: flex;justify-content: space-around;flex-flow: column;padding:5px 0 5px 5px;font-size: 14px;position: relative">
                  <div>姓名：xxx</div>
                  <div>编号：{{ item }}技师</div>
                  <div>身高：xx</div>
                  <div>体重：xxx</div>
                  <div>年龄：xxx</div>
                  <div
                      style="background: #201e1d;padding: 10px 0;border-radius: 6px;color: #FFF;width: 50%;display: flex;justify-content: center;align-items: center;position: relative;left: 65px"
                      @click="xuanru(item)">选入
                  </div>
                </div>
              </div>

            </div>


          </div>

          <div style="flex: 1; display: flex;flex-flow: column">

            <div style="flex: 1;overflow: auto;">
              <div style="width: 100%;display: flex;flex-wrap: wrap">
                <div v-for="item of nvren" class="homeNum2">
                  <div
                      style="width: 100%;height: 100%;background: #FFF;border-radius: 6px;display: flex;align-items: center;">
                    <div style="width: 120px;height: 160px;">
                      <img src="../assets/image/home/header.jpg" width="100%" height="100%">
                    </div>

                    <div style="flex: 1;height: 100%;display: flex;justify-content: center;align-items: center;">
                      <div>{{ item.name }} {{ (item.num).toFixed(2) }}元</div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
            <div style="height: 100px;display: flex;align-items: center;justify-content: space-between;">
              <div style="font-size: 22px;margin: 0 100px">
                价格:{{
                  (nvren.reduce((prev, cur, index, arr) => {
                    return prev + cur.num
                  }, 0)).toFixed(2)
                }}
              </div>
              <div
                  style="    cursor: pointer;height: 60px;width: 120px;display: flex;justify-content: center;align-items:center;color: #FFF;background: #201e1d;margin-right:40px;border-radius: 6px">
                确定
              </div>
            </div>


          </div>
        </div>
      </div>
      <div style="width: 60px;height: 60px;background: #FFF;margin-left: 20px;border-radius: 60px" @click="back_"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.viewBox {
  //width: 100%;
  height: calc(100vh - 40px);
  padding: 20px 5%;


  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* 标准语法 */

  .viewBoxSon {
    width: 100%;
    height: calc(100% - 20px);
    display: flex;
    padding: 10px;
    background: #232120;
    border-radius: 6px;
    align-items: center;

  }

  .tanchuang1 {
    width: 80%;
    background: #FFF;
    border-radius: 6px;
    border: 1px #201e1d solid;
    height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;

    .guanbi {
      position: absolute;
      top: 20px;
      right: 20px;
      background: #201e1d;
      border-radius: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFF;
      width: 30px;
      height: 30px;
      cursor: pointer
    }
  }

  .tanchuang {
    width: 80%;
    background: #FFF;
    border-radius: 6px;
    border: 1px #201e1d solid;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .guanbi {
      position: absolute;
      top: 20px;
      right: 20px;
      background: #201e1d;
      border-radius: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFF;
      width: 30px;
      height: 30px;
      cursor: pointer
    }
  }

  .homeBox {
    flex: 1;
    height: 100%;
  }

  .homeBox1 {
    height: calc(100% - 20px);
    background: #FFF;
    border-radius: 6px;
    padding: 10px;
    display: flex;
    position: relative;
  }

  .homeBox2 {
    height: calc(100% - 20px);
    background: #FFF;
    border-radius: 6px;
    padding: 10px;
    display: flex;
    position: relative;
  }

  .homeLeft {
    flex: 1;
    height: calc(100% - 4px);
    border: 2px #000 solid;
    background: #21201f;
    border-radius: 6px;

    display: flex;
    flex-wrap: wrap;

    overflow: auto;
  }


  .homeNum {
    width: calc(20% - 10px);
    height: 160px;
    background: #FFFFFF;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    background: url("@/assets/image/home/main_bg-DxpK_hEo.webp") #FFFFFF;
    cursor: pointer;
    flex-flow: column;
  }


  .homeRight {
    width: 300px;
    height: 100%;
    //border-left: 2px #000 solid;
    //background: red;
    display: flex;
    flex-flow: column;
    color: #1cbcfe;
    padding-left: 10px;
    justify-content: space-around;

    .divSuojin {
      text-indent: 2em;
    }

    .rightHomeTitle {
      color: #201e1d;
    }
  }
}

.fangkuang {
  width: 30px;
  height: 40px;
  border: 2px solid #000000;
}

.homeNum2 {
  width: calc(50% - 20px);
  height: 220px;
  background: #232120;
  padding: 5px;
  margin: 5px;
  display: flex;
  justify-content: center;
  //align-items: center;
  font-size: 26px;
  cursor: pointer;
  flex-flow: column;
  overflow: auto;
  border-radius: 6px;
}


.shoujihluru {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  margin: 20px 0;

  div {
    margin: 0 10px;
  }
}

.anniujiage {
  width: 120px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px;
  border-radius: 6px;
  border: #201e1d solid 1px;
}

.xuanzhongClass {
  background: #201e1d;
  color: #Fff;
}
</style>

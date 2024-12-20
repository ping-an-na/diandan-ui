// store/index.ts
import {defineStore, storeToRefs} from 'pinia'
// import {formatDate, formatDateTime} from "@/utils/index.js";
// 1. 定义容器、导出容器
// 参数1：容器的ID，必须是唯一的，后面Pinia会把所有的容器挂载到根容器
// 参数2：一些选项对象，也就是state、getter和action
// 返回值：一个函数，调用即可得到容器实例

export const useMainStore = defineStore('main', {
    // 类似于Vue2组件中的data，用于存储全局状态数据，但有两个要求
    // 1. 必须是函数，目的是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
    // 2. 必须是箭头函数，这样是为了更好的 TS 类型推导
    state: () => {
        return {
            buttonUse: false, // 按钮是否运行动画中
            h1ButtonName: '地图', // h1 按钮 名称
            h1ButtonId: 'H01_01', // h1 按钮 名称

            mapButtonId: "map_01", // 地图的按钮id
            h1ButtonArr: [
                // 地图 ， 精灵，背包，个人信息，设置
                {
                    name: "地图",
                    countdown: 0,
                    disabled: false,
                    id: "H01_01"
                },
                {
                    name: "精灵",
                    countdown: 0,
                    disabled: false,
                    id: "H01_02"

                },
                {
                    name: "仓库",
                    countdown: 0,
                    disabled: false,
                    id: "H01_07"

                },
                {
                    name: "背包",
                    countdown: 0,
                    disabled: false,
                    id: "H01_03"

                },
                {
                    name: "商店",
                    countdown: 0,
                    disabled: false,
                    id: "H01_04"

                },
                {
                    name: "个人信息",
                    countdown: 0,
                    disabled: false,
                    id: "H01_05"
                },
                // {
                //   name: "挑战",
                //   countdown: 0,
                //   disabled: true,
                // }, {
                //   name: "任务",
                //   countdown: 0,
                //   disabled: true,
                // },
                // {
                //   name: "孵化",
                //   countdown: 0,
                //   disabled: true,
                // },
                {
                    name: "设置",
                    countdown: 0,
                    disabled: false,
                    id: "H01_06"

                }
            ],
            infoTxt: [],
            // [hp,攻击,防御，速度，特攻，特防]
            jinglingArr: [
                {
                    nameId: "jl25",
                    sex: "0",
                    colorError: false, // 异常颜色
                    jinengId: 'jn1,jn2,jn3,jn4',
                    jinengPP: "30,30,30,30",
                    xinggeId: "xg1",
                    hp: "21",
                    getizhi: [0, 0, 0, 0, 0, 0],
                    nulizhi: [0, 0, 0, 0, 0, 0],
                    xiedaiwu: "",
                    lv: "5",
                    exp: "100",

                },
                {
                    nameId: "jl1",
                    sex: "0",
                    colorError: false, // 异常颜色
                    jinengId: 'jn1,jn2,jn3,jn4',
                    jinengPP: "30,30,30,30",
                    xinggeId: "xg1",
                    hp: "21",
                    getizhi: [0, 0, 0, 0, 0, 0],
                    nulizhi: [0, 0, 0, 0, 0, 0],
                    xiedaiwu: "",
                    lv: "5",
                    exp: "100",
                }
            ]
        }
    },
    getters: {},
    actions: {
        buttonUseFun(e: any) {
            console.log(e)
            this.buttonUse = e
        },
    }
})

// 2. 使用容器中的 state
// 3. 通过 getter 修改 state
// 4. 使用容器中的 action 同步和异步请求

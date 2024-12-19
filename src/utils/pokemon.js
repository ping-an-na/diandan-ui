import {} from "./util.js";

import xinggeInfo from "@/assets/json/xingge.json"
import shuxingIndo from "@/assets/json/nature.json"
import jinengInfo from "@/assets/json/skill.json"
import _random from "lodash/random"


/**
 * // 根据信息生成对战数据
 * @param info  // 精灵的种族信息
 * @param data 精灵个体信息 { nameId精灵ID nulizhi努力值 getizhi个体值  lv 等级 }
 * @returns {number|*[]}
 */
export const viewNengLiZhisCalculationFormula = (info, data) => {
    if (data.nameId) {

        let xingge = {
            gj: 1,
            fy: 2,
            sd: 3,
            tg: 4,
            tf: 5,
        }
        let push = xinggeInfo.push ? xingge[xinggeInfo.push] : null
        let pull = xinggeInfo.pull ? xingge[xinggeInfo.pull] : null
        let n = data.nulizhi
        let g = data.getizhi
        let z = info.zhongzuzhi
        let all = []
        z.forEach((res, index) => {
            if (index === 0) {
                all[index] = Math.floor((((Number(res) * 2 + Number(g[index]) + Number(n[index]) / 4) * Number(data.lv)) / 100) + Number(data.lv) + 10)
            } else {
                if (index === push) {
                    all[index] = Number((((Number(res) * 2 + Number(g[index]) + Number(n[index]) / 4) * Number(data.lv) / 100 + Number(data.lv) + 5) * 1.1).toFixed(8))
                } else if (index === pull) {
                    all[index] = Number((((Number(res) * 2 + Number(g[index]) + Number(n[index]) / 4) * Number(data.lv) / 100 + Number(data.lv) + 5) * 0.8).toFixed(8))
                } else {
                    all[index] = Number((((Number(res) * 2 + Number(g[index]) + Number(n[index]) / 4) * Number(data.lv) / 100 + Number(data.lv) + 5) * 1).toFixed(8))
                }
            }
            // [(种族值×2+个体值+努力值÷4)×等级÷100+5] × 性格修正
        })
        return all
    }
    return 0

}

/**
 * // 获取精灵属性的函数 （属性 火，草，电，土 等）
 * @param info // 精灵的种族信息
 * @returns {null|*[]}
 */
export const shuxingInfo = (info) => {
    if (info) {
        let arr = []
        // let bei = {
        //     wuxiao: [],
        //     bei025: [],
        //     bei050: [],
        //     beo200: [],
        //     bei400: [],
        // }
        let shuxingArr = info.nature.split(",")
        shuxingArr.forEach((res, index) => {
            arr.push(shuxingIndo[res])
        })
        // console.log(arr)
        // arr.forEach((res, index) => {
        // })
        return arr
    }
    return null

}

/**
 * // 获取精灵经验以及等级的函数
 * @param info  // 精灵的种族信息
 * @param data   { nameId精灵ID  lv 等级  exp当前经验值 }
 * @returns {null|{lv: number, exp: number, expAll: number}}
 */
export const expAndLvInfo = (info, data) => {
    if (data.nameId) {
//         最快组：   Lv≤50：EXP = -0.02 * Lv4 + 2 * Lv3
//                  51≤Lv≤68：EXP = -0.01 * Lv4 + 1.5 * Lv3
//                  69≤Lv≤98：EXP = 0.002 * Lv3 * ⌊ (1911 - 10 * Lv) / 3 ⌋
//                  99≤Lv≤100：EXP = -0.01 * Lv4 + 1.6 * Lv3
//         快组：     EXP = 0.8 * Lv3
//         较快组：    EXP = Lv3
//         较慢组：    EXP = 1.2 * Lv3 - 15 * Lv2 + 100 * Lv - 140
//         慢组：     EXP = 1.25 * Lv3
//         最慢组：    Lv≤15：EXP = 0.02 * Lv3 * ⌊ (Lv + 73) / 3 ⌋
//                   16≤Lv≤36：EXP = 0.02 * Lv4 + 0.28 * Lv3
//                   37≤Lv≤100：EXP = 0.02 * Lv3 * ⌊ (Lv + 64) / 2

        let sudu = info.expSuDu || '3' // 1,2,3,4,5,6 1升级最快 6 最慢
        let infoData = {
            lv: Number(data.lv),
            exp: Number(data.exp),
            expAll: 0,
        }
        if (infoData.lv === 100) {
            infoData.exp = 0
            infoData.expAll = 0
            return
        }

        if (sudu === '2') {
            function expFun() {
                if (infoData.lv === 100) {
                    infoData.exp = 0
                    infoData.expAll = 0
                    return
                }

                infoData.expAll = Math.floor(0.8 * (infoData.lv * infoData.lv * infoData.lv))
                if (infoData.exp > infoData.expAll || infoData.exp === infoData.expAll) {
                    infoData.lv = Math.floor(infoData.lv + 1)
                    infoData.exp = Math.floor(infoData.exp - infoData.expAll)
                    expFun()
                }
            }

            expFun()

        } else if (sudu === '3') {
            function expFun() {
                if (infoData.lv === 100) {
                    infoData.exp = 0
                    infoData.expAll = 0
                    return
                }
                infoData.expAll = Math.floor(1 * (infoData.lv * infoData.lv * infoData.lv))
                if (infoData.exp > infoData.expAll || infoData.exp === infoData.expAll) {
                    infoData.lv = Math.floor(infoData.lv + 1)
                    infoData.exp = Math.floor(infoData.exp - infoData.expAll)
                    expFun()
                }
            }

            expFun()
        } else if (sudu === '4') {
            function expFun() {

                if (infoData.lv === 100) {
                    infoData.exp = 0
                    infoData.expAll = 0
                    return
                }

                infoData.expAll = Math.floor((1.2 * (infoData.lv * infoData.lv * infoData.lv)) - (15 * (infoData.lv * infoData.lv)) + (100 * infoData.lv) - 140)
                if (infoData.exp > infoData.expAll || infoData.exp === infoData.expAll) {
                    infoData.lv = Math.floor(infoData.lv + 1)
                    infoData.exp = Math.floor(infoData.exp - infoData.expAll)
                    expFun()
                }
            }

            expFun()
        } else if (sudu === '5') {
            function expFun() {

                if (infoData.lv === 100) {
                    infoData.exp = 0
                    infoData.expAll = 0
                    return
                }

                infoData.expAll = Math.floor(1.25 * (infoData.lv * infoData.lv * infoData.lv))
                if (infoData.exp > infoData.expAll || infoData.exp === infoData.expAll) {
                    infoData.lv = Math.floor(infoData.lv + 1)
                    infoData.exp = Math.floor(infoData.exp - infoData.expAll)
                    expFun()
                }
            }

            expFun()
        }

        return infoData
    }
    return null
}

/**
 *  生成技能组
 * @param info // 精灵的种族信息
 * @param data  // { nameId精灵ID jinengId 技能id jinengPP 技能剩余PP }
 * @returns {*[]}
 */
export const jinengInfoArrFun = (info, data) => {
    if (data.nameId) {
        let jinengArr = data.jinengId.split(",")
        let jinengPPArr = data.jinengPP.split(",")
        let chulihoudeArr = []
        jinengArr.forEach((res, index) => {
            let a = jinengInfo[res]
            a.shuxing = shuxingIndo[a.nature].name
            a.enemyTypeName = a.enemyType === '0' ? '物理' : a.enemyType === '1' ? '特殊' : '变化'
            a.ppAll = Number(a.pp)
            a.pp = Number(jinengPPArr[index]) > Number(a.ppAll) ? Number(a.ppAll) : Number(jinengPPArr[index])

            chulihoudeArr.push(a)
        })
        return chulihoudeArr
    }
    return []
}


/**
 *
 * @param info ["1",'24',"25","26"]  需要随机的数字 必填
 * @param data [0.01,0.02,0.03,0.04]  每个数字的概率， 必填
 * @param dataName []  每个随机数字的中文名称 不是必填 空会返回 “”
 * @param isBackNull  如果轮空 是否返回 NULL 如果 是 (true返回 NULL) 如果不填 或者是(false 会重新轮，直到轮出结果)
 * @returns {*} 返回随机到的数字与name
 * randomFunComplexity ([1, 2, 3],[0.2, 0.2, 0.2]['雌', '雄', '未知'],true)
 */
export const randomFunComplexity = (info = [], data = [], dataName = [], isBackNull = false) => {
    let _random_ = _random(0, 1, true)
    // console.log(_random_, '------------')
    let allGailv = 0
    data.forEach((res) => {
        let num = Number(allGailv) + Number(res)
        allGailv = num.toFixed(7)
    })
    if (_random_ > Number(allGailv) && !isBackNull) {
        let a = randomFunComplexity(info, data, dataName, isBackNull)
        return a
    } else {
        let danLunNum = 0
        let danLunIndex = ''
        for (let i = 0; i < data.length; i++) {
            // console.log(danLunNum)
            if (_random_ <= Number(Number(data[i]) + Number(danLunNum))) {
                danLunIndex = i
                break
            }
            danLunNum = Number(Number(data[i]) + Number(danLunNum))
        }
        if (danLunIndex === '') {
            return null
        } else {
            return {
                id: info[danLunIndex],
                name: dataName[danLunIndex] || "",
            }
        }
    }
}

/**
 * 获取随机个体值
 * @returns {number[]}
 */
export const shengChengGeTiZhi = () => {
    return [_random(0, 31), _random(0, 31), _random(0, 31), _random(0, 31), _random(0, 31), _random(0, 31)]
}
/**
 *  输入概率值 获取是否能中 不要加 % 号啊  可以用百分比，但是不要加 百分比号，根据是否大于1 自己判断
 * @param gailv
 */
export const isGetShotFun = (gailv) => {
    let gaiLvLun = _random(0, 1, true)
    let geShiHuaGaiLv = 0


    if (Number(gailv) > 1) {
        geShiHuaGaiLv = Number(Number(gailv) / 100)
    } else {
        geShiHuaGaiLv = Number(gailv)
    }

    return gaiLvLun <= geShiHuaGaiLv
}

/**
 * 平均随机值
 * @param data [0,1,2,3,4,5...] 所以数值，随机一个返回出去
 * @returns {*}
 */
export const meanRandomValue = (data = []) => {
    let index = _random(0, data.length)
    return data[Number(index)]
}

/**
 *
 * @param type 输入 雌 雄 未知 输出  0，1，2  输入 0，1，2， 输出 雌 雄 未知 ，
 * @returns {{}}
 */
export const sexTypeConvert = (type) => {
    console.log()
    let n = Number(type)
    if (n === 0 || n === 1 || n === 2) {
        let arr = [
            {
                sex: 0,
                sexName: "雄",
            },
            {
                sex: 1,
                sexName: "雌",
            },
            {
                sex: 2,
                sexName: "未知",
            }
        ]

        return arr[n]
    } else {
        let arr = {
            "雄": {
                sex: 0,
                sexName: "雄",
            },
            "雌": {
                sex: 1,
                sexName: "雌",
            },
            "未知": {
                sex: 2,
                sexName: "未知",
            }
        }
        return arr[n]
    }

}

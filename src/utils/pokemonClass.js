import {
    viewNengLiZhisCalculationFormula,
    shuxingInfo,
    expAndLvInfo,
    jinengInfoArrFun,
    randomFunComplexity, shengChengGeTiZhi, isGetShotFun, meanRandomValue, sexTypeConvert
} from "./pokemon.js"
import pet from "@/assets/json/pet.json"
import xingge from "@/assets/json/xingge.json"
import nature from "@/assets/json/nature.json"
import skill from "@/assets/json/skill.json"
import _random from "lodash/random"

export class JinglingDuiZhanClass {
    name = "" // 精灵
    nameId = "" // 精灵id
    sex = "" // 性别
    sexName = "" // 性别

    colorError = false // 异常颜色
    jinglingInfo = {}
    xinggeId = ""
    xinggeInfo = {}
    hp = "" // hp
    getizhi = ["0", "0", "0", "0", "0", "0"]  // 个体值
    nulizhi = ["0", "0", "0", "0", "0", "0"]  // 努力值
    zhongzuzhi = ["0", "0", "0", "0", "0", "0"]  // 种族值
    viewNengLiZhis = ["0", "0", "0", "0", "0", "0"] // 显示出来的能力值
    xiedaiwu = "" // 携带物品
    shuXingInfo = {}

    lv = ""
    exp = ""
    expAll = ""

    jineng = [] // 技能组


    //hp 攻击 防御 速度 特攻 特防
    constructor(dataInfo) {
        let data = dataInfo
        let jinglingInfo = pet[data.nameId] // 精灵种族信息

        let expInfo = expAndLvInfo(jinglingInfo, data) //获取精灵经验以及等级

        data.lv = expInfo.lv
        data.exp = expInfo.exp
        data.expAll = expInfo.expAll // 精灵的三项经验

        this.lv = data.lv
        this.exp = data.exp
        this.expAll = data.expAll

        // this.jinglingInfo = jinglingInfo
        this.name = jinglingInfo.name
        this.nameId = data.nameId

        let sexType = sexTypeConvert(data.sex)
        this.sex = sexType.sex
        this.sexName = sexType.sexName

        this.colorError = data.colorError
        this.xinggeInfo = xingge[data.xinggeId]
        this.xinggeId = data.xinggeId
        this.zhongzuzhi = jinglingInfo.zhongzuzhi
        this.getizhi = data.getizhi
        this.nulizhi = data.nulizhi
        this.xiedaiwu = data.xiedaiwu
        this.viewNengLiZhis = viewNengLiZhisCalculationFormula(jinglingInfo, data, xingge[data.xinggeId])
        this.hp = data.hp > this.viewNengLiZhis[0] ? this.viewNengLiZhis[0] : data.hp
        this.shuXingInfo = shuxingInfo(jinglingInfo, data, nature)

        this.jineng = jinengInfoArrFun(jinglingInfo, data)
        // console.log(this.jineng, 'yyy')
        // console.log(pet[data.nameId], 'pet[data.nameId]')
        // this.name = name;
    }

    /**
     * 能够获取的经验
     */
    expJiyv() {
        let BasicExperience = Number(pet[this.nameId].BasicExperience) || 80
        let a = 1 // 和训练家对战时为1.5，否则为1；
        let t = 1  // 如果宝可梦的初训家是主角为1，不是主角为1.5
        let b = Number(BasicExperience) // 被击败的宝可梦的基础经验值
        let e = 1 //如果持有幸运蛋，则为1.5，否则为1
        let L = Number(this.lv) // 被击败或收服的宝可梦的等级
        let s = 1  // 参加对战且不处于濒死状态的宝可梦数量
        let exp = (a * t * b * e * L) / (7 * s)

        return

    }
}

export class NewJingLing {

    name = "" // 精灵
    nameId = "" // 精灵id
    sex = "" // 性别
    colorError = false // 异常颜色
    jinglingInfo = {}
    xinggeId = ""
    xinggeInfo = {}
    hp = "" // hp
    getizhi = ["0", "0", "0", "0", "0", "0"]  // 个体值
    nulizhi = ["0", "0", "0", "0", "0", "0"]  // 努力值
    zhongzuzhi = ["0", "0", "0", "0", "0", "0"]  // 种族值
    viewNengLiZhis = ["0", "0", "0", "0", "0", "0"] // 显示出来的能力值
    xiedaiwu = "" // 携带物品
    shuXingInfo = {}

    lv = ""
    exp = ""
    expAll = ""

    jineng = [] // 技能组

    constructor(dataInfo) {
        this.colorError = isGetShotFun(0.00012) // 万分之1.2

        //------------------------- 暂时过度一下 随机全部精灵
        let numberArr = []
        for (let i = 1; i < 152; i++) {
            numberArr.push(i)
        }
        let jingliIDNumber = meanRandomValue(numberArr)
        let jinglingInfo = pet[`jl${jingliIDNumber}`]
        this.name = jinglingInfo.name // 精灵
        this.nameId = jinglingInfo.id // 精灵id
        console.log("我的精灵是:", this.name)
        this.shuXingInfo = shuxingInfo(jinglingInfo)
        console.log("我的精灵属性是:", this.shuXingInfo)
        // ------------------------- ----  性别
        let sexObj = randomFunComplexity([0, 1, 2], jinglingInfo.sex, ['雄', '雌', '未知'],) // 性别
        let sexType = sexTypeConvert(sexObj.id)
        this.sex = sexType.sex
        this.sexName = sexType.sexName
        console.log("我的性别是:", this.sexName)
        // ------------------------- ----  等级 经验
        let geTizhiAll = this.getizhi.reduce((prev, cur) => {
            return Number(prev) + Number(cur)
        })
        if (geTizhiAll > 168) {
            //满级个体值 是 186 ,如果个体值在 {168} 以上 生成 五级 宝宝生物 不会 跟 环境生成规则冲突
            //也就是说 五级的不一定是好天赋的，但是好天赋 一定是五级的
            let expInfo = expAndLvInfo(jinglingInfo, {nameId: jinglingInfo.id, lv: 5, exp: 0}) //获取精灵经验以及等级
            this.lv = expInfo.lv
            this.exp = expInfo.exp
            this.expAll = expInfo.expAll // 精灵的三项经验
        } else {
            let suijiLv = _random(1, 100)
            let expInfo = expAndLvInfo(jinglingInfo, {nameId: jinglingInfo.id, lv: suijiLv, exp: 0}) //获取精灵经验以及等级
            this.lv = expInfo.lv
            this.exp = expInfo.exp
            this.expAll = expInfo.expAll // 精灵的三项经验
        }
        console.log("我的等级是:", this.lv)
        // -------------------------------性格
        this.xinggeId = `xg${_random(1, 25)}`
        this.xinggeInfo = xingge[this.xinggeId]
        console.log("我的性格是：", this.xinggeInfo,)

        // ------------------------- ----  种族值 个体值 努力值    公示能力
        this.zhongzuzhi = jinglingInfo.zhongzuzhi
        this.getizhi = shengChengGeTiZhi() // 初始化 个体值
        this.nulizhi = [0, 0, 0, 0, 0, 0]
        this.viewNengLiZhis = viewNengLiZhisCalculationFormula(jinglingInfo, {
            nameId: jinglingInfo.id,
            lv: this.lv,
            nulizhi: this.nulizhi,
            getizhi: this.getizhi,
        }, this.xinggeInfo)
        console.log("我的显示能力是：", this.viewNengLiZhis,)
        this.hp = this.viewNengLiZhis[0]
        console.log("我的HP是：", this.hp,)

        //-----------------  携带物品  暂时 不携带吧
        this.xiedaiwu = "" // 携带物品

        //------------------ 技能组  暂时先无技能吧
        this.jineng = []

    }
    /**
     * 能够获取的经验
     */
    expJiyv() {
        let BasicExperience = Number(pet[this.nameId].BasicExperience) || 80
        let a = 1 // 和训练家对战时为1.5，否则为1；
        let t = 1  // 如果宝可梦的初训家是主角为1，不是主角为1.5
        let b = Number(BasicExperience) // 被击败的宝可梦的基础经验值
        let e = 1 //如果持有幸运蛋，则为1.5，否则为1
        let L = Number(this.lv) // 被击败或收服的宝可梦的等级
        let s = 1  // 参加对战且不处于濒死状态的宝可梦数量
        let exp = (a * t * b * e * L) / (7 * s)

        return

    }
}

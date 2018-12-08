<template>
    <div >
      <div class="carNumberInput">
        <div class="confirmCarNumber clf mgBot10">
          <div class="fl">
            <div class="carNumber clf">
              <ul>
                <li><span v-text="plateNum[0]" ></span></li>
                <li><span v-text="plateNum[1]" ></span></li>
                <li><span v-text="plateNum[2]" ></span></li>
                <li><span v-text="plateNum[3]" ></span></li>
                <li><span v-text="plateNum[4]" ></span></li>
                <li><span v-text="plateNum[5]" ></span></li>
                <li><span v-text="plateNum[6]" ></span></li>
                <li :class="[isNew?'input_pp':'input_pp hid']">
                  <span v-text="plateNum[7]"></span>
                  <button v-if="!isNew" @click="isNew = true">+</button>
                </li>
              </ul>
            </div>
          </div>
          <div class="fr"><a href="javascript:" class="reviseConfirm" @click="submit()">确认</a></div>
        </div>
      </div>
        <div class="keyboard_wrap" v-if="curr == 0">
            <div class="areaAbbr clf">
                <ul class="clf">
                <li v-for="p in provinces" :key="p"><a href="javascript:" @click="keyDown(p)"><span>{{p}}</span></a></li>
                <li class="li_clean" @click='plateNum = ["", "", "", "", "", "", "", ""]'><a href="javascript:"><span>清空</span></a></li>
                </ul>
            </div>
        </div>
        <div class="keyboard_wrap" v-else>
            <div class="plateNumber clf">
                <ul class="clf">
                <li :class="[curr == 1?'disabled li_num':'li_num']" v-for="num in keyNums" :key="num"><a href="javascript:" @click="keyDown(num)"><span>{{num}}</span></a>
                </li>
                <li class="li_num" v-for="num in keyChars" :key="num"><a href="javascript:" @click="keyDown(num)"><span>{{num}}</span></a></li>
                <li v-for="i in ['港','澳','学','领']" :key="i" :class="[curr <= 6?'disabled li_num li_w':'li_num li_w']" @click="keyDown(i)"><span>{{i}}</span></li>
                <li class="li_zm li_w" @click="del"><span>删除</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      /* 车牌号键盘 */
      provinces: [
        "京",
        "沪",
        "浙",
        "苏",
        "粤",
        "鲁",
        "晋",
        "冀",
        "豫",
        "川",
        "渝",
        "辽",
        "吉",
        "黑",
        "皖",
        "鄂",
        "津",
        "贵",
        "云",
        "桂",
        "琼",
        "青",
        "新",
        "藏",
        "蒙",
        "宁",
        "甘",
        "陕",
        "闽",
        "赣",
        "湘"
      ],
      keyNums: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      keyChars: [
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P",
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M"
      ],
      plateNum: ["", "", "", "", "", "", "", ""],
      curr: 0,
      isNew: false
    };
  },
  props: {
    value: String,
    clickKeyDown:{
      type:Function,
      default:(vs,v)=>console.log(vs,v)
    },
    clickSubmit:{
      type:Function,
      default:v=>console.log(v)
    }
  },
  model:{
   prop: 'value',
   event: 'input'
  },

  watch: {
    value(val) {
      this.init();
    },
  },

  created(){
    this.init();
  },
  methods: {
    init(){
      this.curr = 0;
      if(this.value){
        let values = this.value.split("");
        for(let i = 0, l = values.length; i < l; i++){
          this.plateNum[i] = values[i];
          this.curr++;
        }
      }
    },
    /* 车牌号输入方法 */
    del() {
      this.plateNum[--this.curr] = "";
      this.$props.clickKeyDown(this.plateNum.join(""));
    },
    keyDown(key) {
      if (this.isNew && this.curr >= 8 || !this.isNew && this.curr >= 7) {
        return;
      }

      this.plateNum[this.curr++] = key;
      this.$props.clickKeyDown(this.plateNum.join(""), key);
    },
    submit() {
      this.$emit("input", this.plateNum.join(""));
      this.$props.clickSubmit(this.plateNum.join(""));
    }
  },
  mounted(){
  },
  computed: {
  },
  destroyed(){
  }
};
</script>

<style scoped>
.confirmCarNumber{width: 420px;margin: auto;}
.confirmCarNumber > .fl{width: 78%;}
.confirmCarNumber > .fl .carNumber li{float: left;width: 11.625%;position: relative;}
.confirmCarNumber > .fl .carNumber{margin-bottom: 10px;}
.confirmCarNumber > .fl .carNumber li:not(:last-of-type){margin-right: 1%;}
.confirmCarNumber > .fl .carNumber li span{display: block;height: 36px;font-size: 16px;line-height: 36px;text-align: center;background-color: #f2f2f2;border-radius: 3px;cursor: text;}
.confirmCarNumber > .fl .carNumber li button{position: absolute;top: 0;right: 0;bottom: 0;left: 0;width: 100%;height: 100%;font-size: 24px;line-height: 36px;}
.confirmCarNumber > .fl select{width: 100%;height: 30px;border-radius: 3px;}
.confirmCarNumber > .fr{width: 20%;}
.confirmCarNumber > .fr > a{display: block;width: 100%;height: 76px;border: 1px solid #1c7dfa;text-align: center;line-height: 74px;border-radius: 5px;font-size: 16px;transition: all .3s;background-color: #1c7dfa;color: #fff;}
.confirmCarNumber > .fr > a.reviseConfirm{height: 36px;line-height: 36px;}
/*.confirmCarNumber > .fr > a:hover{color: #1c7dfa;background-color: #fff;}*/

.keyboard_wrap {
  background-color: #dedfe3;
  width: 420px;
  margin: auto;
}
.areaAbbr li {
  float: left;
  width: 11.11%;
  padding: 2px;
}
.areaAbbr li span {
  display: block;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 2px 2px 2px #888888;
  line-height: 32px;
  padding-top: 2px;
  text-align: center;
}
.areaAbbr .li_close,
.areaAbbr .li_clean {
  float: right;
  width: 22.22%;
}
.areaAbbr .li_close span {
  background-color: #d1d4d9;
}

.plateNumber li {
  float: left;
  width: 10%;
  padding: 2px;
}
.plateNumber li.li_w {
  width: 11.11%;
}
.plateNumber li span {
  display: block;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 2px 2px 2px #888;
  line-height: 32px;
  padding-top: 2px;
  text-align: center;
  cursor: pointer;
}
.plateNumber li:nth-of-type(21) {
  margin-left: 5%;
}

.plateNumber .li_close {
  float: right;
  width: 22.22%;
}
.plateNumber .li_close span {
  background-color: #d1d4d9;
}

.keyboard_wrap li.disabled {
  pointer-events: none;
}
.keyboard_wrap li.disabled span {
  color: #dcdcdc !important;
}
</style>

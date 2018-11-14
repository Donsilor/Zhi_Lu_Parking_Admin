<template>
  <div class="content clf">
    <div class="top">
      <div class="prompt">系统的联网相关功能需要提前配置好后，才能正常运行。</div>
      <div class="c_box">
        <div>
          <span>{{project.project_name}}</span>
        </div>
        <div>
          <span>{{project.addr}}</span>
          <span class="time">更新日期：<i>{{project.update_time}}</i></span>
        </div>
      </div>

    </div>
    <div class="center">
      <div class="title">基础环境</div>
      <div class="c_box">
        <div v-if="pay.pay_type"><span>支付宝支付配置：<i>{{pay.pay_url}}</i></span>
          <a href="javascript:" class="modify" @click="ifConfig = true">修改</a>
        </div>
        <div v-else><span>微信支付配置：<i>{{pay.pay_url}}</i></span>
          <a href="javascript:" class="modify" @click="ifConfig = true">修改</a>
        </div>
        <div><span>支付回调地址：<i>{{parking.pay_callback_url}}</i></span>
          <a href="javascript:" class="modify" @click="ifConfig = true">修改</a>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">车场变量</div>
      <div class="c_box">
        <div>
          <span>总车位数：<i></i></span>
          <a href="javascript:" class="modify" @click="ifParkingVariate = true">修改</a>
        </div>
        <div>
          <span>抓拍图片保存路径：<i>{{parking.photo_path}}</i></span>
          <a href="javascript:" class="modify" @click="ifParkingVariate = true">修改</a>
        </div>
        <div>
          <span>图片默认保存时长：<i>{{parking.photo_save_time}}天</i></span>
          <a href="javascript:" class="modify" @click="ifParkingVariate = true">修改</a>
        </div>
        <div>
          <span>车牌头字母：<i>{{parking.car_head}}</i></span>
          <a href="javascript:" class="modify" @click="ifParkingVariate = true">修改</a>
        </div>
        <div>
          <span>LED默认加载文字：<i>{{parking.led_load_str}}</i></span>
          <a href="javascript:" class="modify" @click="ifParkingVariate = true">修改</a>
        </div>
        <div>
          <span>固定卡初次授权开始日期：<i>{{parking.first_auth}}</i></span>
          <a href="javascript:" class="modify" @click="ifParkingVariate = true">修改</a>
        </div>
      </div>
      <div class="prompt">
        <span>0-28, 0为立即起用，1-28值自然日的1-28号，29,30,31号三天不做为初次授权开始日期使用，在这三天初次授权的，下一自然天开始计算</span>
      </div>
    </div>
    <!--弹窗-->
    <div class="main" v-if="ifConfig">
      <div class="depwd" v-drag.cursor="'#Config'">
        <div class="top-nav" id="Config">
          <p class="t-text fl">微信支付配置</p>
          <p class="close fr" @click="ifConfig = false">x</p>
        </div>
        <div class="bot">
          <div class="cet">
            <div class="clf">
              <p class="red" hidden><i class="iconfont icon-jian-tianchong"></i>错误提示的文案</p>
              <p class="clf">
                <span class="fl"><!--<span class='red-text'>*</span>-->APPID：</span>
                <input class="fl user" name="user" type="text" placeholder="wx8888888888888888" v-model="pay.photo_path">
              </p>
              <p class="clf">
                <span class="fl"><!--<span class='red-text'>*</span>-->商户号：</span>
                <input class="fl psw" name="psw" type="text" placeholder="1900000109" v-model="pay.businesser_code">
              </p>
              <p class="clf">
                <span class="fl"><!--<span class='red-text'>*</span>-->商家账号：</span>
                <input class="fl ppsw" name="ppsw" type="text" placeholder="wx01@aaaa.com" v-model="pay.pay_account">
              </p>
              <p class="clf">
                <span class="fl"><!--<span class='red-text'>*</span>-->支付服务密钥：</span>
                <input class="fl" type="text" placeholder="当前默认前缀unallocated" v-model="pay.service_key">
              </p>
              <p class="clf">
                <span class="fl"><!--<span class='red-text'>*</span>-->支付公钥：</span>
                <input class="fl tel" type="text" name="tel" placeholder="请输入主机密码，必填" v-model="pay.pay_public_key">
              </p>
              <p class="clf upload">
                <span class="fl">支付私钥：</span>
                <input class="fl" type="text" placeholder="请再次输入主机密码，必填" v-model="pay.photo_path">
              </p>
              <p class="clf upload">
                <span class="fl" style="font-size: 12px;">请求URL,token获取：</span>
                <input class="fl" type="text" placeholder="wx01@aaaa.com" v-model="pay.token_url">
              </p>
              <p class="bz clf">
                <span class="fl">支付URL：</span>
                <input class="fl" type="text" placeholder="wx01@aaaa.com" v-model="pay.pay_url">
              </p>
            </div>
            <div class="button clf">
              <a class="qr acknowledgement fr" @click="editSysConfig">确定</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main ParkingVariate" v-if="ifParkingVariate">
      <div class="depwd" v-drag.cursor="'#ParkingVariate'">
        <div class="top-nav" id="ParkingVariate">
          <p class="t-text fl">车场变量</p>
          <p class="close fr" @click="ifParkingVariate = false">x</p>
        </div>
        <div class="bot">
          <div class="cet">
            <div class="clf">
              <p class="red" hidden><i class="iconfont icon-jian-tianchong"></i>错误提示的文案</p>
              <p class="clf">
                <span class="fl">总车位数：</span>
                <input class="fl user w30" name="user" type="text" v-model="parking.park_count">
              </p>
              <p class="clf">
                <span class="fl">抓拍图片保存路径：</span>
                <input class="fl psw w50" name="psw" type="text" v-model="parking.photo_path">
              </p>
              <p class="clf">
                <span class="fl">图片默认保存时长：</span>
                <input class="fl ppsw w30" name="ppsw" type="text" v-model="parking.photo_save_time">
              </p>
              <p class="clf">
                <span class="fl">车牌头字母：</span>
                <input class="fl w30" type="text" v-model="parking.car_head">
              </p>
              <p class="clf">
                <span class="fl">LED默认加载文字：</span>
                <textarea class="fl tel w80" name="tel" maxlength="50" v-model="parking.led_load_str"></textarea>
              </p>
              <p class="clf">
                <span class="fl">固定卡初次授权开始日期：</span>
                <input class="fl w30" type="text" v-model="parking.first_auth">
              </p>
            </div>
            <div class="button clf">
              <a class="qr acknowledgement fr" @click="editParking">确定</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--弹窗-->
  </div>
</template>

<script>
import { RequestParams, RequestDataItem ,User} from "../../assets/js/entity";
export default {
  data () {
    return {
      ifConfig: false,
      ifParkingVariate: false,
      project:{
        id: null,//          	Y	String	ID
        project_code: null,//	Y	String	项目编号
        project_name: null,//	Y	String	项目名称
        addr: null,//        	N	String	项目地址
        linkman: null,//     	Y	String	联系人
        tel: null,//         	Y	String	联系电话
        total_place: null,// 	Y	Int	总车位数
        operator_id: User.info.id,// 	Y	String	操作员ID
        remark: null,//      	N	String	备注
        update_time:null,//
      },
      pay:{
        id:null,//             	Y	String	ID
        project_id:null,//     	Y	String	项目ID
        pay_type:null,//       	Y	Int	支付方式(0：微信 1：支付宝)
        pay_account:null,//    	Y	Int	商家账号
        businesser_code:null,//	Y	String	商户号
        service_key:null,//    	Y	String	支付服务密钥
        pay_public_key:null,// 	Y	Int	支付公钥
        pay_private_key:null,//	Y	String	支付私钥
        token_url:null,//      	Y	String	token获取地址
        pay_url:null,//        	Y	String	支付URL
        operator_id:null,//    	Y	String	操作员ID
        remark:null,//         	N	String	备注
      },
      parking:{
        id:null,//              	Y	String	ID
        project_id:null,//      	Y	String	项目ID
        photo_path:null,//      	Y	String	抓拍图片保存路径
        photo_save_time:null,// 	Y	Int	图片默认保存时长(单位天,默认7天)
        car_head:null,//        	Y	String	车牌头字母
        led_load_str:null,//    	Y	String	LED默认加载文字(20个字内)
        first_auth:null,//      	Y	Int	固定卡初次授权开始日期
        pay_callback_url:null,//	Y	String	支付回调地址
        operator_id:null,//     	Y	String	操作员ID
        park_count:null,
        remark:null,//          	N	String	备注
      },
    }
  },
  methods:{
    editSysConfig(){
      this.$api.sysconfig
      .editorpay(new RequestParams()
      .addAttributes(this.pay)
      .addAttribute("project_id", User.info.project_id)
      .addAttribute("operator_id", User.info.id)
      )
      .then(response=>{
        this.$message.success(response.message);
        this.ifConfig = false;
        this.loadDatas();
      })
      .catch(response => this.$message.error(response.message));
    },
    editParking(){
      this.$api.sysconfig
      .editor(new RequestParams()
      .addAttributes(this.parking)
      .addAttribute("project_id", User.info.project_id)
      .addAttribute("operator_id", User.info.id)
      )
      .then(response=>{
        this.$message.success(response.message)
        this.ifParkingVariate = false;
        this.loadDatas();
      })
      .catch(response => this.$message.error(response.message));
    },
    async loadDatas(){
      this.parking = ((await this.$api.sysconfig.getbyid()).dataItems[0] || {}).attributes || {};
      this.pay = ((await this.$api.sysconfig.getpay()).dataItems[0] || {}).attributes || {};
      this.project = ((await this.$api.project.getlist(
        new RequestParams().addAttribute("key", `and id = '${User.info.project_id}'`)
      )).dataItems[0] || {}).attributes || {};
    },
  },
  mounted () {
    this.loadDatas();
  }
}
</script>

<style scoped>
@import "../../assets/css/SystemConfiguration.css";
</style>

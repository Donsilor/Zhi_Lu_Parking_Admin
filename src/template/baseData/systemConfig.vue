<template>
  <div class="content clf">
    <div class="top">
      <div class="prompt">系统的联网相关功能需要提前配置好后，才能正常运行。</div>
      <div class="c_box">
        <div>
          <span>东海花园停车场管理系统</span>
          <!--<a href="javascript:" class="modify">修改</a>-->
        </div>
        <div>
          <span>广东省深圳市福田区农林路东海花园</span>
          <!--<a href="javascript:" class="modify">修改</a>-->
          <span class="time">更新日期：<i>2016-02-23</i></span>
        </div>
      </div>

    </div>
    <div class="center">
      <div class="title">基础环境</div>
      <div class="c_box">
        <div><span>支付宝支付配置：<i>http://itsahttplink.com/gateway.do</i></span>
          <a href="javascript:" class="modify" @click="ifConfig = true">修改</a>
        </div>
        <div><span>微信支付配置：<i>http://itsahttplink.com/gateway.do</i></span>
          <a href="javascript:" class="modify" @click="ifConfig = true">修改</a>
        </div>
        <div><span>支付回调地址：<i>http://itsahttplink.com/gateway.do</i></span>
          <a href="javascript:" class="modify" @click="ifConfig = true">修改</a>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">基础环境</div>
      <div class="c_box">
        <div>
          <span>总车位数：<i>1000</i></span>
          <a href="javascript:" class="modify" @click="ifParkingVariate = true">修改</a>
        </div>
        <div>
          <span>抓拍图片保存路径：<i>c:\users\photo</i></span>
          <a href="javascript:" class="modify" @click="ifParkingVariate = true">修改</a>
        </div>
        <div>
          <span>图片默认保存时长：<i>5天</i></span>
          <a href="javascript:" class="modify" @click="ifParkingVariate = true">修改</a>
        </div>
        <div>
          <span>车牌头字母：<i>粤B</i></span>
          <a href="javascript:" class="modify" @click="ifParkingVariate = true">修改</a>
        </div>
        <div>
          <span>LED默认加载文字：<i>东海花园停车场</i></span>
          <a href="javascript:" class="modify" @click="ifParkingVariate = true">修改</a>
        </div>
        <div>
          <span>固定卡初次授权开始日期：<i>1</i></span>
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
              <p class="red"><i class="iconfont icon-jian-tianchong"></i>错误提示的文案</p>
              <p class="clf">
                <span class="fl"><!--<span class='red-text'>*</span>-->APPID：</span>
                <input class="fl user" name="user" type="text" placeholder="
wx8888888888888888">
              </p>
              <p class="clf">
                <span class="fl"><!--<span class='red-text'>*</span>-->商户号：</span>
                <input class="fl psw" name="psw" type="text" placeholder="
1900000109">
              </p>
              <p class="clf">
                <span class="fl"><!--<span class='red-text'>*</span>-->商家账号：</span>
                <input class="fl ppsw" name="ppsw" type="text" placeholder="
wx01@aaaa.com">
              </p>
              <p class="clf">
                <span class="fl"><!--<span class='red-text'>*</span>-->支付服务密钥：</span>
                <input class="fl" type="text" placeholder="当前默认前缀unallocated">
              </p>
              <p class="clf">
                <span class="fl"><!--<span class='red-text'>*</span>-->支付公钥：</span>
                <input class="fl tel" type="text" name="tel" placeholder="请输入主机密码，必填">
              </p>
              <p class="clf upload">
                <span class="fl">支付私钥：</span>
                <input class="fl" type="text" placeholder="请再次输入主机密码，必填">
              </p>
              <p class="clf upload">
                <span class="fl" style="font-size: 12px;">请求URL,token获取：</span>
                <input class="fl" type="text" placeholder="wx01@aaaa.com">
              </p>
              <p class="bz clf">
                <span class="fl">支付URL：</span>
                <input class="fl" type="text" placeholder="wx01@aaaa.com">
              </p>
            </div>
            <div class="button clf">
              <a class="qr acknowledgement fr">确定</a>
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
              <p class="red"><i class="iconfont icon-jian-tianchong"></i>错误提示的文案</p>
              <p class="clf">
                <span class="fl">总车位数：</span>
                <input class="fl user w30" name="user" type="text" value="
1000">
              </p>
              <p class="clf">
                <span class="fl">抓拍图片保存路径：</span>
                <input class="fl psw w50" name="psw" type="text" value="
c:\users\photo">
              </p>
              <p class="clf">
                <span class="fl">图片默认保存时长：</span>
                <input class="fl ppsw w30" name="ppsw" type="text" value="5天">
              </p>
              <p class="clf">
                <span class="fl">车牌头字母：</span>
                <input class="fl w30" type="text" value="粤B">
              </p>
              <p class="clf">
                <span class="fl">LED默认加载文字：</span>
                <textarea class="fl tel w80" name="tel" maxlength="50">东海花园停车场</textarea>
              </p>
              <p class="clf">
                <span class="fl">固定卡初次授权开始日期：</span>
                <input class="fl w30" type="text" value="1">
              </p>
            </div>
            <div class="button clf">
              <a class="qr acknowledgement fr">确定</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--弹窗-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      ifConfig: false,
      ifParkingVariate: false
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/SystemConfiguration.css";
</style>

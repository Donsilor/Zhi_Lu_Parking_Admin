<template>
  <div class="content clf">
    <div class="top">
      <div class="prompt">系统的联网相关功能需要提前配置好后，才能正常运行。</div>
      <div class="c_box">
        <div>
          <span>东海花园停车场管理系统</span>
          <a href="javascript:" class="modify">修改</a>
        </div>
        <div>
          <span>广东省深圳市福田区农林路东海花园</span>
          <a href="javascript:" class="modify">修改</a><span class="time">更新日期：<i>2016-02-23</i></span>
        </div>
      </div>

    </div>
    <div class="center">
      <div class="title">基础环境</div>
      <div class="c_box">
        <div><span>支付宝支付配置：<i>http://itsahttplink.com/gateway.do</i></span>
          <a href="javascript:" class="modify">修改</a>
        </div>
        <div><span>微信支付配置：<i>http://itsahttplink.com/gateway.do</i></span>
          <a href="javascript:" class="modify">修改</a>
        </div>
        <div><span>支付回调地址：<i>http://itsahttplink.com/gateway.do</i></span>
          <a href="javascript:" class="modify">修改</a>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">基础环境</div>
      <div class="c_box">
        <div><span>总车位数：<i>1000</i></span>
          <a href="javascript:" class="modify">修改</a>
        </div>
        <div><span>抓拍图片保存路径：<i>c:\users\photo</i></span>
          <a href="javascript:" class="modify">修改</a>
        </div>
        <div><span>图片默认保存时长：<i>5天</i></span>
          <a href="javascript:" class="modify">修改</a>
        </div>
        <div><span>车牌头字母：<i>粤B</i></span>
          <a href="javascript:" class="modify">修改</a>
        </div>
        <div><span>LED默认加载文字：<i>东海花园停车场</i></span>
          <a href="javascript:" class="modify">修改</a>
        </div>
        <div><span>固定卡初次授权开始日期：<i>1</i></span>
          <a href="javascript:" class="modify">修改</a>
        </div>
      </div>
      <div class="prompt"><span>0-28, 0为立即起用，1-28值自然日的1-28号，29,30,31号三天不做为初次授权开始日期使用，在这三天初次授权的，下一自然天开始计算</span></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style scoped>
  @import "../../assets/css/SystemConfiguration.css";
</style>

<template>
  <div class="content clf">
    <div class="wrap clf">
      <div class="wrap-left fl">
        <div class="ltop">
          <div class="openc ltopopen" v-if="equip_entry">
            <div class="opend" @click="equip_entry = false">开闸</div>
            <div class="closed" @click="equip_entry = false">关闸</div>
            <div class="watch_video" @click="equip_entry = false">观看视频</div>
          </div>
          <p class="p1"><span class="sptop" @click="this.equip_entry = !this.equip_entry">...</span></p>
          <section class="secl fl"><img src="../../assets/images/secl.png"></section>
          <section class="secr fr">
            <b>东门入口</b>
            <span style="color:#52d669;">道闸已开启</span>
          </section>
        </div>
        <div class="lbot">
          <div class="openc lbotopen" v-if="equip_output">
            <div class="opend" @click="equip_output = false">开闸</div>
            <div class="closed" @click="equip_output = false">关闸</div>
            <div class="watch_video" @click="equip_output = false">观看视频</div>
          </div>
          <p class="p1"><span class="spbot" @click="this.equip_output = !this.equip_output">...</span></p>
          <section class="secl fl" style="padding-top:6%;"><img src="../../assets/images/secr.png"></section>
          <section class="secr fr">
            <b>东门出口</b>
            <span>道闸已关闭</span>
          </section>
        </div>
      </div>
      <div class="wrap-right fr">
        <ul>
          <li>
            <video-player class="vjs-custom-skin" ref="videoPlayer" :options="{
              overNative: true,
              autoplay: true,
              controls: true,
              techOrder: ['html5', 'flash'],
              sourceOrder: true,
              html5: { hls: { withCredentials: true } },
              sources: [{
                type: 'rtsp/flv',
                src: 'rtsp://192.168.55.101:554'
              }]
            }"></video-player>
          </li>
          <li>
            <video  src="rtsp://192.168.55.101:554" controls></video>
            <!-- <object style="width: 100%;height: 100%" classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921" codebase="http://download.videolan.org/pub/videolan/vlc/last/win32/axvlc.cab"
              id="vlc1" name="vlc1" class="vlcPlayer" events="True">
                <param name="Src" id="p1" value="rtsp://192.168.55.101:554" />
                <param name="ShowDisplay" value="True" />
                <param name="AutoLoop" value="False" />
                <param name="AutoPlay" value="True" />
                <param name='fullscreen' value='false' />
                <param name="wmode" value="transparent" />
                <param name='controls' value='false' />
                <embed  
                  id="e1" 
                  name="vlc1" 
                  type="application/x-vlc-plugin" 
                  version="VideoLAN.VLCPlugin.2" 
                  autoplay="yes" 
                  loop="no" 
                  width="95%" 
                  height="95%" 
                  fullscreen="false" 
                  wmode="transparent" 
                  controls="false" 
                  target="rtsp://192.168.55.101:554"/>
            </object> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="wrap1 clf">
      <div class="wrap1-left fl">
        <div class="top">
          <a class="but1 fl">场内车辆查询</a>
          <a class="but2 fl">临占固</a>
          <a class="but2 fl">扫描枪配置</a>
          <a class="but2 fl">换班</a>
          <a class="but2 fl">其他</a>
          <p class="ptext">当日收入总额：<span class="redtext"><strong>43555</strong></span>元</p>
        </div>
        <div class="bot">
          <table>
            <tbody>
            <tr>
              <th><input class="ckb" type="checkbox"></th>
              <th>代码</th>
              <th>名称</th>
              <th>类型</th>
              <th>创建日期</th>
              <th>状态</th>
              <th>最后创建者</th>
              <th class="cz">操作</th>
            </tr>
            <tr>
              <td><input class="rad" type="radio" id="deo1" name="radio" value="1"><label for="deo1"></label></td>
              <td>L0678</td>
              <td>币种</td>
              <td>离散条件</td>
              <td><p>2015-09-26</p><p>08：50：08</p></td>
              <td><a href="/">已配置，已生效</a></td>
              <td>灵惜</td>
              <td><i class="iconfont icon-yanjing"></i><i class="iconfont icon-edit"></i><i
                class="iconfont icon-shanchu" @click="ifDel = true"></i></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="wrap1-right fr">
        <div class="section-one clf">
          <div class="pbb"><strong>粤B·123456</strong></div>
          <div class="ps">2015-09-2608：50：08 入场</div>
          <div class="pst">已停<span>1</span>天<span>12</span>小时<span>8</span>分<span>41</span>秒</div>
        </div>
        <div class="clf" style="margin-bottom:3.125rem;">
          <div class="pgt">应收金额：<span><strong>60</strong></span>元</div>
          <div class="pl fl">优惠金额：<span>20</span>元</div>
          <div class="pr fr">实收金额：<span>80</span>元</div>
        </div>
        <div class="py clf">
          <div class="pay xj">
            <input type="radio" name="radio1" value="1" id="way">
            <label for="way"></label>
            <span>现金</span>
          </div>
          <div class="pay zfb">
            <input type="radio" name="radio1" value="1" id="zfb">
            <label for="zfb"></label>
            <span>支付宝</span>
          </div>
          <div class="wx wx">
            <input type="radio" name="radio1" value="1" id="wx">
            <label for="wx"></label>
            <span>微信</span>
          </div>
        </div>
        <div class="clf">
          <a class="but" href="javascript:">确认开闸</a>

        </div>
      </div>
    </div>
    <!--弹窗-->
    <!-- <div class="delete_prompt" v-if="ifDel">
      <div class="depwd">
        <div class="text">你是否确认删除选中的记录</div>
        <div class="button clf">
          <a class="qr fr">确定</a>
          <a class="qx fr" @click="ifDel = false">取消</a>
        </div>
      </div>
    </div> -->
    <!--弹窗-->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        ifDel: false,
        equip_entry: false,
        equip_output: false
      };
    },
    methods: {
      player() {
        return this.$refs.videoPlayer.player
      },
    },
    mounted(){
    }
  };
</script>

<style scoped>
  @import "../../assets/css/EquipmentMonitoring.css";
</style>

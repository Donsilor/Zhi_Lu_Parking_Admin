<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="add-department blu-button" @click="ifEditInfo = true">+新增</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="cominput fl">
          <span class="conditions-text">车场区域：</span>
          <input type="text" placeholder="请输入">
        </div>
      </div>
      <div class="clf bottom">
        <div class="fl">
          <button class="plechoose fl">请选择 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl">批量删除</button>
          <div>共搜索到 <span>922</span> 条数据</div>
        </div>
        <div class="fr">
          <button class="search-button blu-button">搜索</button>
          <button class="clear-button bluborder-button">清除</button>
          <button class="ss transf-button" @click="toggleSearch">
            <i><img src="../../assets/images/icon_t_arrow2.png" alt=""></i>
            <span>{{toggleSearchText}}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="result clf">
      <div class="selected">已选 <span>5</span> 项数据</div>
      <div class="tab">
        <div class="equipInfoTable">
          <div class="tr level1_ths">
            <div class="th"></div>
            <div class="th">设备编号</div>
            <div class="th">设备名称</div>
            <div class="th">所属区域</div>
            <div class="th">设备类型</div>
            <div class="th">IP地址</div>
            <div class="th">创建时间</div>
            <div class="th">更新时间</div>
            <div class="th">操作员</div>
            <div class="th">操作</div>
          </div>
          <div class="level1_item">
            <div class="tr level1_itemTable">
              <div class="td"><a href="javascript:" class="toggleBtn" @click="item_1_toggleDiv = !item_1_toggleDiv">+</a></div>
              <div class="td">
                <div class="tr level1_dataItem">
                  <div class="td">L0678</div>
                  <div class="td">东门岗亭</div>
                  <div class="td">地上区域</div>
                  <div class="td">工作站</div>
                  <div class="td">192.168.1.10</div>
                  <div class="td">2015-09-26 08:50:08</div>
                  <div class="td">2015-09-26 08:50:08</div>
                  <div class="td">admin</div>
                  <div class="td">
                    <a href="javascript:">编辑</a>
                    <a href="javascript:">删除</a>
                  </div>
                </div>
                <div class="tr level1_toggleTable" v-if="item_1_toggleDiv">
                  <div class="tr level2_ths">
                    <div class="th"></div>
                    <div class="th">设备编号</div>
                    <div class="th">设备名称</div>
                    <div class="th">设备类型</div>
                    <div class="th">IP地址</div>
                    <div class="th">开闸方式</div>
                    <div class="th">加载参数</div>
                    <div class="th">创建时间</div>
                    <div class="th">更新时间</div>
                    <div class="th">操作员</div>
                    <div class="th">操作</div>
                  </div>
                  <div class="tr level2_item">
                    <div class="tr level2_itemTable">
                      <div
                        class="td"><a href="javascript:" class="toggleBtn" @click="item_1_1_toggleDiv = !item_1_1_toggleDiv">+</a></div>
                      <div class="td">
                        <div class="tr level2_dataItem">
                          <div class="td">L0678</div>
                          <div class="td">东门岗亭</div>
                          <div class="td">入口</div>
                          <div class="td">192.168.1.10</div>
                          <div class="td">自动开闸</div>
                          <div class="td">&nbsp;</div>
                          <div class="td">2015-09-26 08:50:08</div>
                          <div class="td">2015-09-26 08:50:08</div>
                          <div class="td">admin</div>
                          <div class="td">
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">删除</a>
                          </div>
                        </div>
                        <div class="tr level2_toggleTable" v-if="item_1_1_toggleDiv">
                          <div class="tr level3_ths">
                            <div class="th">设备编号</div>
                            <div class="th">设备名称</div>
                            <div class="th">设备类型</div>
                            <div class="th">IP地址</div>
                            <div class="th">加载参数</div>
                            <div class="th">创建时间</div>
                            <div class="th">更新时间</div>
                            <div class="th">操作员</div>
                            <div class="th">操作</div>
                          </div>
                          <div class="tr level3_item">
                            <div class="tr level3_itemTable">
                              <div class="td">
                                <div class="tr level3_dataItem">
                                  <div class="td">L0678</div>
                                  <div class="td">东门岗亭IPC</div>
                                  <div class="td">摄像头</div>
                                  <div class="td">192.168.1.12</div>
                                  <div class="td">rtsp://192.168.1.12/ip01</div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">admin</div>
                                  <div class="td">
                                    <a href="javascript:">编辑</a>
                                    <a href="javascript:">删除</a>
                                  </div>
                                </div>
                                <div class="tr level3_dataItem">
                                  <div class="td">L0678</div>
                                  <div class="td">东门岗亭显示屏</div>
                                  <div class="td">LED显示屏</div>
                                  <div class="td">01</div>
                                  <div class="td">欢迎光临</div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">admin</div>
                                  <div class="td">
                                    <a href="javascript:">编辑</a>
                                    <a href="javascript:">删除</a>
                                  </div>
                                </div>
                                <div class="tr level3_dataItem">
                                  <div class="td">L0678</div>
                                  <div class="td">东门岗亭喇叭</div>
                                  <div class="td">喇叭</div>
                                  <div class="td">02</div>
                                  <div class="td"></div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">admin</div>
                                  <div class="td">
                                    <a href="javascript:">编辑</a>
                                    <a href="javascript:">删除</a>
                                  </div>
                                </div>
                                <div class="tr level3_dataItem">
                                  <div class="td">L0678</div>
                                  <div class="td">东门岗亭道闸</div>
                                  <div class="td">道闸</div>
                                  <div class="td">03</div>
                                  <div class="td"></div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">admin</div>
                                  <div class="td">
                                    <a href="javascript:">编辑</a>
                                    <a href="javascript:">删除</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="level1_item">
            <div class="tr level1_itemTable">
              <div class="td"><a href="javascript:" class="toggleBtn" @click="item_2_toggleDiv = !item_2_toggleDiv">+</a></div>
              <div class="td">
                <div class="tr level1_dataItem">
                  <div class="td">L0678</div>
                  <div class="td">东门岗亭</div>
                  <div class="td">地上区域</div>
                  <div class="td">工作站</div>
                  <div class="td">192.168.1.10</div>
                  <div class="td">2015-09-26 08:50:08</div>
                  <div class="td">2015-09-26 08:50:08</div>
                  <div class="td">admin</div>
                  <div class="td">
                    <a href="javascript:">编辑</a>
                    <a href="javascript:">删除</a>
                  </div>
                </div>
                <div class="tr level1_toggleTable" v-if="item_2_toggleDiv">
                  <div class="tr level2_ths">
                    <div class="th"></div>
                    <div class="th">设备编号</div>
                    <div class="th">设备名称</div>
                    <div class="th">设备类型</div>
                    <div class="th">IP地址</div>
                    <div class="th">开闸方式</div>
                    <div class="th">加载参数</div>
                    <div class="th">创建时间</div>
                    <div class="th">更新时间</div>
                    <div class="th">操作员</div>
                    <div class="th">操作</div>
                  </div>
                  <div class="tr level2_item">
                    <div class="tr level2_itemTable">
                      <div
                        class="td"><a href="javascript:" class="toggleBtn" @click="item_2_1_toggleDiv = !item_2_1_toggleDiv">+</a></div>
                      <div class="td">
                        <div class="tr level2_dataItem">
                          <div class="td">L0678</div>
                          <div class="td">东门岗亭</div>
                          <div class="td">入口</div>
                          <div class="td">192.168.1.10</div>
                          <div class="td">自动开闸</div>
                          <div class="td"></div>
                          <div class="td">2015-09-26 08:50:08</div>
                          <div class="td">2015-09-26 08:50:08</div>
                          <div class="td">admin</div>
                          <div class="td">
                            <a href="javascript:">编辑</a>
                            <a href="javascript:">删除</a>
                          </div>
                        </div>
                        <div class="tr level2_toggleTable" v-if="item_2_1_toggleDiv">
                          <div class="tr level3_ths">
                            <div class="th">设备编号</div>
                            <div class="th">设备名称</div>
                            <div class="th">设备类型</div>
                            <div class="th">IP地址</div>
                            <div class="th">加载参数</div>
                            <div class="th">创建时间</div>
                            <div class="th">更新时间</div>
                            <div class="th">操作员</div>
                            <div class="th">操作</div>
                          </div>
                          <div class="tr level3_item">
                            <div class="tr level3_itemTable">
                              <div class="td">
                                <div class="tr level3_dataItem">
                                  <div class="td">L0678</div>
                                  <div class="td">东门岗亭IPC</div>
                                  <div class="td">摄像头</div>
                                  <div class="td">192.168.1.12</div>
                                  <div class="td">rtsp://192.168.1.12/ip01</div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">admin</div>
                                  <div class="td">
                                    <a href="javascript:">编辑</a>
                                    <a href="javascript:">删除</a>
                                  </div>
                                </div>
                                <div class="tr level3_dataItem">
                                  <div class="td">L0678</div>
                                  <div class="td">东门岗亭显示屏</div>
                                  <div class="td">LED显示屏</div>
                                  <div class="td">01</div>
                                  <div class="td">欢迎光临</div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">admin</div>
                                  <div class="td">
                                    <a href="javascript:">编辑</a>
                                    <a href="javascript:">删除</a>
                                  </div>
                                </div>
                                <div class="tr level3_dataItem">
                                  <div class="td">L0678</div>
                                  <div class="td">东门岗亭喇叭</div>
                                  <div class="td">喇叭</div>
                                  <div class="td">02</div>
                                  <div class="td"></div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">admin</div>
                                  <div class="td">
                                    <a href="javascript:">编辑</a>
                                    <a href="javascript:">删除</a>
                                  </div>
                                </div>
                                <div class="tr level3_dataItem">
                                  <div class="td">L0678</div>
                                  <div class="td">东门岗亭道闸</div>
                                  <div class="td">道闸</div>
                                  <div class="td">03</div>
                                  <div class="td"></div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">2015-09-26 08:50:08</div>
                                  <div class="td">admin</div>
                                  <div class="td">
                                    <a href="javascript:">编辑</a>
                                    <a href="javascript:">删除</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page">
        <a href="javascript:"><img src="../../assets/images/icon_l_arrow.png" alt=""></a>
        <a href="javascript:">1</a>
        <a href="javascript:">2</a>
        <a href="javascript:">3</a>
        <a href="javascript:">4</a>
        <a href="javascript:">5</a>
        <a href="javascript:">6</a>
        <a href="javascript:">7</a>
        <a href="javascript:">8</a>
        <a href="javascript:">9</a>
        <a href="javascript:"><img src="../../assets/images/icon_r_arrow.png" alt=""></a>
        <span>10条/页</span>
        <span>跳至<input type="text">页</span>
        <button class="go">Go</button>
      </div>
    </div>
    <!--弹窗-->
    <div class="main" v-if="ifEditInfo">
      <div class="depwd" v-drag.cursor="'#EditInfo'">
        <div class="top-nav" id="EditInfo">
          <p class="t-text fl">设备信息</p>
          <p class="close fr" @click="ifEditInfo = false">x</p>
        </div>
        <div class="bot">
          <p class="red"><i class="iconfont icon-jian-tianchong"></i>错误提示的文案<span>x</span></p>
          <div class="cet">
            <div class="clf">
              <p class="clf"><span class="fl">项目ID：</span><input class="fl" type="text" value="请输入项目ID，必填"></p>
              <p class="clf"><span class="fl">区域ID：</span><input class="fl" type="text" value="请输入区域ID，必填"></p>
              <p class="clf"><span class="fl">父级设备：</span>
                <select name="">
                  <option value="" style="display: none;">请选择</option>
                  <option value="1">选择1</option>
                  <option value="2">选择2</option>
                </select>
              </p>
              <p class="clf"><span class="fl">设备编号：</span><input class="fl" type="text" value="请输入编号，必填"></p>
              <p class="clf"><span class="fl">设备名称：</span><input class="fl" type="text" value="请输入"></p>
              <p class="clf"><span class="fl">设备类型：</span>
                <select name="">
                  <option value="" style="display: none;">请选择</option>
                  <option value="">选择1</option>
                  <option value="">选择2</option>
                </select>
              </p>
              <p class="clf"><span class="fl">所属区域：</span>
                <select name="">
                  <option value="" style="display: none;">请选择</option>
                  <option value="">选择1</option>
                  <option value="">选择2</option>
                </select>
              </p>
              <p class="clf"><span class="fl">IP地址或机号：</span><input class="fl" type="text" value="请输入"></p>
              <p class="bz clf"><span class="fl">备注：</span><input class="fl" type="text" value="请输入备注" id="inp"></p>
            </div>
            <div class="button clf">
              <a class="qr fr">确定</a>
              <a class="qx fr" @click="ifEditInfo = false">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="delete_prompt" v-if="ifDel">
      <div class="depwd">
        <div class="text">你是否确认删除选中的记录</div>
        <div class="button clf">
          <a class="qr fr">确定</a>
          <a class="qx fr" @click="ifDel = false">取消</a>
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
      toggleSearchText: '收起搜索',
      searchDivShow: true,
      ifEditInfo: false,
      ifDel: false,
      item_1_toggleDiv: false,
      item_1_1_toggleDiv: false,
      item_2_toggleDiv: false,
      item_2_1_toggleDiv: false
    }
  },
  methods: {
    PageInit () {
      $(function () {
        $('.jun').hide()
        $('.jun_1').hide()
        $('.show').click(function () {
          let $jun = $(this).parent().next('.jun')
          if ($jun.is(':hidden')) {
            $jun.show()
          } else {
            $jun.hide()
          }
        })
        $('.show_1').click(function () {
          let $jun_1 = $(this).parent().next('.jun_1')
          if ($jun_1.is(':hidden')) {
            $jun_1.show()
          } else {
            $jun_1.hide()
          }
        })
      })
    },
    toggleSearch () {
      this.searchDivShow = !this.searchDivShow
      this.toggleSearchText = this.searchDivShow === true ? '收起搜索' : '展开搜索'
      if (this.searchDivShow) {
        $('.transf-button').removeClass('hide')
      } else {
        $('.transf-button').addClass('hide')
      }
    }
  },
  mounted () {
    this.PageInit()
  }
}
</script>

<style scoped>
@import "../../assets/css/EquipmentManagement_1.css";
</style>

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
        <table class="tab_1">
          <tr>
            <th class="ckb">
              <!--<input class="chk" type="checkbox">--></th>
            <th>设备编号</th>
            <th>设备名称</th>
            <th>所属区域</th>
            <th>设备类型</th>
            <th>IP地址</th>
            <th>创建时间</th>
            <th>更新时间</th>
            <th>操作员</th>
            <th class="de">操作</th>
          </tr>
          <tr>
            <td class="ckb show"><span><strong>+</strong></span></td>
            <td>粤b123456</td>
            <td>李大亮</td>
            <td>碧海苑2栋1单元1609</td>
            <td>13056874952</td>
            <td>192.168.1.1</td>
            <td>2018-08-21</td>
            <td>2018-08-21</td>
            <td>
              <a href="javascript:">admin</a>
            </td>
            <td class="de detext">
              <i style="margin-right: 1rem;margin-left: 2rem;" class="iconfont icon-edit fl bj"
                 @click="ifEditInfo = true"></i>
              <i class="iconfont icon-shanchu fl" @click="ifDel = true"></i>
            </td>
          </tr>
          <tr class="jun" colspan="9">
            <td class="ckb"></td>
            <td colspan="9">
              <table class="tab_2">
                <tr>
                  <th class="ckb">
                    <!--<input class="chk" type="checkbox">--></th>
                  <th>设备编号</th>
                  <th>设备名称</th>
                  <th>所属区域</th>
                  <th>设备类型</th>
                  <th>IP地址</th>
                  <th>创建时间</th>
                  <th>创建时间</th>
                  <th>更新时间</th>
                  <th>操作员</th>
                  <th class="de">操作</th>
                </tr>
                <tr>
                  <td class="ckb show_1"><span><strong>＋</strong></span></td>
                  <td>粤b123456</td>
                  <td>李大亮</td>
                  <td>碧海苑2栋1单元1609</td>
                  <td>13056874952</td>
                  <td>192.168.1.1</td>
                  <td>2018-08-21</td>
                  <td>2018-08-21</td>
                  <td>2018-08-21</td>
                  <td>
                    <a href="javascript:">admin</a>
                  </td>
                  <td class="de detext"><i style="margin-right: 1rem;margin-left: 2rem;"
                                           class="iconfont icon-edit fl"></i><i class="iconfont icon-shanchu fl"></i>
                  </td>
                </tr>
                <tr class="jun_1">
                  <td class="ckb"></td>
                  <td colspan="10">
                    <table class="tab_3">
                      <tr>
                        <th class="ckb">
                          <!--<input class="chk" type="checkbox">--></th>
                        <th>设备编号</th>
                        <th>设备名称</th>
                        <th>所属区域</th>
                        <th>设备类型</th>
                        <th>IP地址</th>
                        <th>创建时间</th>
                        <th>更新时间</th>
                        <th>操作员</th>
                        <th class="de">操作</th>
                      </tr>
                      <tr>
                        <td class="ckb show_2"><span><strong>＋</strong></span></td>
                        <td>粤b123456</td>
                        <td>李大亮</td>
                        <td>碧海苑2栋1单元1609</td>
                        <td>13056874952</td>
                        <td>192.168.1.1</td>
                        <td>2018-08-21</td>
                        <td>2018-08-21</td>
                        <td>
                          <a href="javascript:">admin</a>
                        </td>
                        <td class="de detext"><i style="margin-right: 1rem;margin-left: 2rem;"
                                                 class="iconfont icon-edit fl bj"></i><i
                          class="iconfont icon-shanchu fl"></i>
                        </td>
                      </tr>
                      <tr>
                        <td class="ckb show_2"><span><strong>＋</strong></span></td>
                        <td>粤b123456</td>
                        <td>李大亮</td>
                        <td>碧海苑2栋1单元1609</td>
                        <td>13056874952</td>
                        <td>192.168.1.1</td>
                        <td>2018-08-21</td>
                        <td>2018-08-21</td>
                        <td>
                          <a href="javascript:">admin</a>
                        </td>
                        <td class="de detext"><i style="margin-right: 1rem;margin-left: 2rem;"
                                                 class="iconfont icon-edit fl bj"></i><i
                          class="iconfont icon-shanchu fl"></i>
                        </td>
                      </tr>
                      <tr>
                        <td class="ckb show_2"><span><strong>＋</strong></span></td>
                        <td>粤b123456</td>
                        <td>李大亮</td>
                        <td>碧海苑2栋1单元1609</td>
                        <td>13056874952</td>
                        <td>192.168.1.1</td>
                        <td>2018-08-21</td>
                        <td>2018-08-21</td>
                        <td>
                          <a href="javascript:">admin</a>
                        </td>
                        <td class="de detext"><i style="margin-right: 1rem;margin-left: 2rem;"
                                                 class="iconfont icon-edit fl bj"></i><i
                          class="iconfont icon-shanchu fl"></i>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td class="ckb show_1"><span><strong>＋</strong></span></td>
                  <td>粤b123456</td>
                  <td>李大亮</td>
                  <td>碧海苑2栋1单元1609</td>
                  <td>13056874952</td>
                  <td>192.168.1.1</td>
                  <td>2018-08-21</td>
                  <td>2018-08-21</td>
                  <td>2018-08-21</td>
                  <td>
                    <a href="javascript:">admin</a>
                  </td>
                  <td class="de detext"><i style="margin-right: 1rem;margin-left: 2rem;"
                                           class="iconfont icon-edit fl"></i><i class="iconfont icon-shanchu fl"></i>
                  </td>
                </tr>
                <tr>
                  <td class="ckb show_1"><span><strong>＋</strong></span></td>
                  <td>粤b123456</td>
                  <td>李大亮</td>
                  <td>碧海苑2栋1单元1609</td>
                  <td>13056874952</td>
                  <td>192.168.1.1</td>
                  <td>2018-08-21</td>
                  <td>2018-08-21</td>
                  <td>2018-08-21</td>
                  <td>
                    <a href="javascript:">admin</a>
                  </td>
                  <td class="de detext"><i style="margin-right: 1rem;margin-left: 2rem;"
                                           class="iconfont icon-edit fl"></i><i class="iconfont icon-shanchu fl"></i>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="ckb show"><span><strong>+</strong></span></td>
            <td>粤b123456</td>
            <td>李大亮</td>
            <td>碧海苑2栋1单元1609</td>
            <td>13056874952</td>
            <td>192.168.1.1</td>
            <td>2018-08-21</td>
            <td>2018-08-21</td>
            <td>
              <a href="javascript:">admin</a>
            </td>
            <td class="de detext">
              <i style="margin-right: 1rem;margin-left: 2rem;" class="iconfont icon-edit fl bj"></i>
              <i class="iconfont icon-shanchu fl"></i>
            </td>
          </tr>
          <tr class="jun" colspan="9">
            <td class="ckb"></td>
            <td colspan="9">
              <table class="tab_2">
                <tr>
                  <th class="ckb">
                    <!--<input class="chk" type="checkbox">--></th>
                  <th>设备编号</th>
                  <th>设备名称</th>
                  <th>所属区域</th>
                  <th>设备类型</th>
                  <th>IP地址</th>
                  <th>创建时间</th>
                  <th>创建时间</th>
                  <th>更新时间</th>
                  <th>操作员</th>
                  <th class="de">操作</th>
                </tr>
                <tr>
                  <td class="ckb show_1"><span><strong>＋</strong></span></td>
                  <td>粤b123456</td>
                  <td>李大亮</td>
                  <td>碧海苑2栋1单元1609</td>
                  <td>13056874952</td>
                  <td>192.168.1.1</td>
                  <td>2018-08-21</td>
                  <td>2018-08-21</td>
                  <td>2018-08-21</td>
                  <td>
                    <a href="javascript:">admin</a>
                  </td>
                  <td class="de detext">
                    <i style="margin-right: 1rem;margin-left: 2rem;" class="iconfont icon-edit fl"></i>
                    <i class="iconfont icon-shanchu fl"></i>
                  </td>
                </tr>
                <tr class="jun_1">
                  <td class="ckb"></td>
                  <td colspan="10">
                    <table class="tab_3">
                      <tr>
                        <th class="ckb">
                          <!--<input class="chk" type="checkbox">--></th>
                        <th>设备编号</th>
                        <th>设备名称</th>
                        <th>所属区域</th>
                        <th>设备类型</th>
                        <th>IP地址</th>
                        <th>创建时间</th>
                        <th>更新时间</th>
                        <th>操作员</th>
                        <th class="de">操作</th>
                      </tr>
                      <tr>
                        <td class="ckb show_2"><span><strong>＋</strong></span></td>
                        <td>粤b123456</td>
                        <td>李大亮</td>
                        <td>碧海苑2栋1单元1609</td>
                        <td>13056874952</td>
                        <td>192.168.1.1</td>
                        <td>2018-08-21</td>
                        <td>2018-08-21</td>
                        <td>
                          <a href="javascript:">admin</a>
                        </td>
                        <td class="de detext"><i style="margin-right: 1rem;margin-left: 2rem;"
                                                 class="iconfont icon-edit fl bj"></i><i
                          class="iconfont icon-shanchu fl"></i>
                        </td>
                      </tr>
                      <tr>
                        <td class="ckb show_2"><span><strong>＋</strong></span></td>
                        <td>粤b123456</td>
                        <td>李大亮</td>
                        <td>碧海苑2栋1单元1609</td>
                        <td>13056874952</td>
                        <td>192.168.1.1</td>
                        <td>2018-08-21</td>
                        <td>2018-08-21</td>
                        <td>
                          <a href="javascript:">admin</a>
                        </td>
                        <td class="de detext"><i style="margin-right: 1rem;margin-left: 2rem;"
                                                 class="iconfont icon-edit fl bj"></i><i
                          class="iconfont icon-shanchu fl"></i>
                        </td>
                      </tr>
                      <tr>
                        <td class="ckb show_2"><span><strong>＋</strong></span></td>
                        <td>粤b123456</td>
                        <td>李大亮</td>
                        <td>碧海苑2栋1单元1609</td>
                        <td>13056874952</td>
                        <td>192.168.1.1</td>
                        <td>2018-08-21</td>
                        <td>2018-08-21</td>
                        <td>
                          <a href="javascript:">admin</a>
                        </td>
                        <td class="de detext"><i style="margin-right: 1rem;margin-left: 2rem;"
                                                 class="iconfont icon-edit fl bj"></i><i
                          class="iconfont icon-shanchu fl"></i>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td class="ckb show_1"><span><strong>＋</strong></span></td>
                  <td>粤b123456</td>
                  <td>李大亮</td>
                  <td>碧海苑2栋1单元1609</td>
                  <td>13056874952</td>
                  <td>192.168.1.1</td>
                  <td>2018-08-21</td>
                  <td>2018-08-21</td>
                  <td>2018-08-21</td>
                  <td>
                    <a href="javascript:">admin</a>
                  </td>
                  <td class="de detext">
                    <i style="margin-right: 1rem;margin-left: 2rem;" class="iconfont icon-edit fl bj"></i>
                    <i class="iconfont icon-shanchu fl"></i>
                  </td>
                </tr>
                <tr>
                  <td class="ckb show_1"><span><strong>＋</strong></span></td>
                  <td>粤b123456</td>
                  <td>李大亮</td>
                  <td>碧海苑2栋1单元1609</td>
                  <td>13056874952</td>
                  <td>192.168.1.1</td>
                  <td>2018-08-21</td>
                  <td>2018-08-21</td>
                  <td>2018-08-21</td>
                  <td>
                    <a href="javascript:">admin</a>
                  </td>
                  <td class="de detext">
                    <i style="margin-right: 1rem;margin-left: 2rem;" class="iconfont icon-edit fl bj"></i>
                    <i class="iconfont icon-shanchu fl"></i>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
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
        ifDel: false
      };
    },
    methods: {
      PageInit () {
        $(function () {
          $('.jun').hide();
          $('.jun_1').hide();
          $(".show").click(function() {
            let $jun = $(this).parent().next(".jun");
            if($jun.is(":hidden")) {
              $jun.show();
            } else {
              $jun.hide();
            }
          });
          $(".show_1").click(function() {
            let $jun_1 = $(this).parent().next(".jun_1");
            if($jun_1.is(":hidden")) {
              $jun_1.show();
            } else {
              $jun_1.hide();
            }
          });
        });
      },
      toggleSearch () {
        this.searchDivShow = !this.searchDivShow;
        this.toggleSearchText = this.searchDivShow === true ? '收起搜索' : '展开搜索';
        if (this.searchDivShow) {
          $('.transf-button').removeClass('hide');
        } else {
          $('.transf-button').addClass('hide');
        }
      }
    },
    mounted () {
      this.PageInit();
    }
  };
</script>

<style scoped>
  @import "../../assets/css/EquipmentManagement_1.css";
</style>

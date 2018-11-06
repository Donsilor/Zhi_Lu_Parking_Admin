<template>
  <div class="content clf">
    <div class="search ">
      <div class="add">
        <button class="registration-car blu-button" @click="ifEditInfo = true">+新增</button>
        <button class="upload-aut blu-button" @click="ifImportAuthorize = true">导入</button>
      </div>
      <div class="clf top toggleDiv" v-show="searchDivShow">
        <div class="cominput fl">
          <span class="conditions-text">搜索名称：</span>
          <input type="text" placeholder="请输入">
        </div>
        <div class="cominput fl">
          <span class="conditions-text">搜索名称：</span>
          <select>
            <option>请选择</option>
            <option>请选择</option>
            <option>请选择</option>
          </select>
        </div>
        <div class="cominput fl">
          <span class="conditions-text">搜索名称：</span>
          <select>
            <option>请选择</option>
            <option>请选择</option>
            <option>请选择</option>
          </select>
        </div>
        <div class="condition">
          <span class="conditions-text">搜索条件：</span>
          <div class="custom-input">
            <input type="text" placeholder="请输入">
            <input type="submit" value="">
          </div>
        </div>
        <div class="fl create">
          <span>创建时间：</span>
          <div>
            <div class="c-datepicker-date-editor  J-datepicker-range-day mt10">
              <el-date-picker
                v-model="value7"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="clf bottom">
        <div class="fl">
          <button class="plechoose fl">请选择 <img src="../../assets/images/icon_9.png" alt=""></button>
          <button class="batchdel fl">批量删除</button>
          <button class="greenbut fl">配置车场收费标准</button>
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
        <table class="buildingmanagement-table">
          <tr>
            <th><input type="checkbox"></th>
            <th>庭院</th>
            <th>楼栋</th>
            <th>单元</th>
            <th>房号</th>
            <th>创建时间</th>
            <th>更新时间</th>
            <th>操作员</th>
            <th>操作</th>
          </tr>
          <tr>
            <td><input type="checkbox"></td>
            <td>春晖苑</td>
            <td>2栋</td>
            <td>1单元</td>
            <td>505</td>
            <td>2015-09-26 08:50:08</td>
            <td>2015-09-26 08:50:08</td>
            <td>admin</td>
            <td>
              <a href="javascript:" class="bj" @click="ifEditInfo = true">编辑</a>
              <a href="javascript:" @click="ifDel = true">删除</a>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox"></td>
            <td>春晖苑</td>
            <td>2栋</td>
            <td>1单元</td>
            <td>505</td>
            <td>2015-09-26 08:50:08</td>
            <td>2015-09-26 08:50:08</td>
            <td>admin</td>
            <td>
              <a href="javascript:" class="bj">编辑</a>
              <a href="javascript:">删除</a>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox"></td>
            <td>春晖苑</td>
            <td>2栋</td>
            <td>1单元</td>
            <td>505</td>
            <td>2015-09-26 08:50:08</td>
            <td>2015-09-26 08:50:08</td>
            <td>admin</td>
            <td>
              <a href="javascript:" class="bj">编辑</a>
              <a href="javascript:">删除</a>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox"></td>
            <td>春晖苑</td>
            <td>2栋</td>
            <td>1单元</td>
            <td>505</td>
            <td>2015-09-26 08:50:08</td>
            <td>2015-09-26 08:50:08</td>
            <td>admin</td>
            <td>
              <a href="javascript:" class="bj">编辑</a>
              <a href="javascript:">删除</a>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox"></td>
            <td>春晖苑</td>
            <td>2栋</td>
            <td>1单元</td>
            <td>505</td>
            <td>2015-09-26 08:50:08</td>
            <td>2015-09-26 08:50:08</td>
            <td>admin</td>
            <td>
              <a href="javascript:" class="bj">编辑</a>
              <a href="javascript:">删除</a>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox"></td>
            <td>春晖苑</td>
            <td>2栋</td>
            <td>1单元</td>
            <td>505</td>
            <td>2015-09-26 08:50:08</td>
            <td>2015-09-26 08:50:08</td>
            <td>admin</td>
            <td>
              <a href="javascript:" class="bj">编辑</a>
              <a href="javascript:">删除</a>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox"></td>
            <td>春晖苑</td>
            <td>2栋</td>
            <td>1单元</td>
            <td>505</td>
            <td>2015-09-26 08:50:08</td>
            <td>2015-09-26 08:50:08</td>
            <td>admin</td>
            <td>
              <a href="javascript:" class="bj">编辑</a>
              <a href="javascript:">删除</a>
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
          <p class="t-text fl">房屋信息</p>
          <p class="close fr" @click="ifEditInfo = false">x</p>
        </div>
        <div class="bot">
          <div class="cet">
            <div class="clf">
              <p class="red"><i class="iconfont icon-jian-tianchong"></i>错误提示的文案<span>x</span></p>
              <p class="clf"><span class="fl">APPID：</span><input class="fl" type="text" value="wx88888888888888"></p>
              <p class="clf"><input class="fr" type="text" value="19000124000"><span class="fr">APPID：</span></p>
              <p class="clf"><span class="fl">APPID：</span><input class="fl" type="text" value="134@qq.com"></p>
              <p class="clf"><input class="fr" type="text" value="当前默认....."><span class="fr">APPID：</span></p>
              <p class="clf"><span class="fl">APPID：</span><input class="fl" type="text" value="请再次输入主机密码，必填"></p>
            </div>
            <div class="button clf">
              <a class="qr fr">确定</a>
              <a class="qx fr" @click="ifEditInfo = false">取消</a>
            </div>
          </div>
          <div class="data clf">
            <a class="addresidents" href="javascript:" @click="ifAddInhabitant = true">添加住户</a><span>共搜索到922条数据</span>
          </div>
          <div class="residents-table">
            <table>
              <tr>
                <th>姓名</th>
                <th>性别</th>
                <th>住户类型</th>
                <th>电话</th>
                <th>证件号码</th>
                <th>证件地址</th>
                <th>出生日期</th>
                <th>创建时间</th>
                <th>更新时间</th>
                <th>操作员</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
              <tr>
                <td>春晖苑</td>
                <td>男</td>
                <td>业主</td>
                <td>13013849218</td>
                <td>221587499633587461</td>
                <td>广东省深圳市福田...</td>
                <td>2015-09-26</td>
                <td>2015-09-26<br/>08:50:08</td>
                <td>2015-09-26<br/>08:50:08</td>
                <td>admin</td>
                <td>编辑</td>
                <td>
                  <a href="javascript:">编辑</a>
                  <a href="javascript:" class="delete">删除</a>
                </td>
              </tr>
              <tr>
                <td>春晖苑</td>
                <td>男</td>
                <td>业主</td>
                <td>13013849218</td>
                <td>221587499633587461</td>
                <td>广东省深圳市福田...</td>
                <td>2015-09-26</td>
                <td>2015-09-26<br/>08:50:08</td>
                <td>2015-09-26<br/>08:50:08</td>
                <td>admin</td>
                <td>编辑</td>
                <td>
                  <a href="javascript:">编辑</a>
                  <a href="javascript:" class="delete">删除</a>
                </td>
              </tr>
              <tr>
                <td>春晖苑</td>
                <td>男</td>
                <td>业主</td>
                <td>13013849218</td>
                <td>221587499633587461</td>
                <td>广东省深圳市福田...</td>
                <td>2015-09-26</td>
                <td>2015-09-26<br/>08:50:08</td>
                <td>2015-09-26<br/>08:50:08</td>
                <td>admin</td>
                <td>编辑</td>
                <td>
                  <a href="javascript:">编辑</a>
                  <a href="javascript:" class="delete">删除</a>
                </td>
              </tr>

              <tr>
                <td>春晖苑</td>
                <td>男</td>
                <td>业主</td>
                <td>13013849218</td>
                <td>221587499633587461</td>
                <td>广东省深圳市福田...</td>
                <td>2015-09-26</td>
                <td>2015-09-26<br/>08:50:08</td>
                <td>2015-09-26<br/>08:50:08</td>
                <td>admin</td>
                <td>编辑</td>
                <td>
                  <a href="javascript:">编辑</a>
                  <a href="javascript:" class="delete">删除</a>
                </td>
              </tr>
              <tr>
                <td>春晖苑</td>
                <td>男</td>
                <td>业主</td>
                <td>13013849218</td>
                <td>221587499633587461</td>
                <td>广东省深圳市福田...</td>
                <td>2015-09-26</td>
                <td>2015-09-26<br/>08:50:08</td>
                <td>2015-09-26<br/>08:50:08</td>
                <td>admin</td>
                <td>编辑</td>
                <td>
                  <a href="javascript:">编辑</a>
                  <a href="javascript:" class="delete">删除</a>
                </td>
              </tr>
              <tr>
                <td>春晖苑</td>
                <td>男</td>
                <td>业主</td>
                <td>13013849218</td>
                <td>221587499633587461</td>
                <td>广东省深圳市福田...</td>
                <td>2015-09-26</td>
                <td>2015-09-26<br/>08:50:08</td>
                <td>2015-09-26<br/>08:50:08</td>
                <td>admin</td>
                <td>编辑</td>
                <td>
                  <a href="javascript:">编辑</a>
                  <a href="javascript:" class="delete">删除</a>
                </td>
              </tr>
              <tr>
                <td>春晖苑</td>
                <td>男</td>
                <td>业主</td>
                <td>13013849218</td>
                <td>221587499633587461</td>
                <td>广东省深圳市福田...</td>
                <td>2015-09-26</td>
                <td>2015-09-26<br/>08:50:08</td>
                <td>2015-09-26<br/>08:50:08</td>
                <td>admin</td>
                <td>编辑</td>
                <td>
                  <a href="javascript:">编辑</a>
                  <a href="javascript:" class="delete">删除</a>
                </td>
              </tr>
            </table>
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
    <div class="import-main" v-if="ifImportAuthorize">
      <div class="depwd" v-drag.cursor="'#ImportAuthorize'">
        <div class="top-nav" id="ImportAuthorize">
          <p class="t-text fl">导入授权</p>
          <p class="close fr" @click="ifImportAuthorize = false">x</p>
        </div>
        <div class="bot">
          <div class="cet clf">
            <div class="fl choose-file">选择文件<input type="file"/></div>
            <a class="fr downloadtemp" href="javascript:">下载模板</a>
            <p>支持扩展名：.xls .xlsx</p>
          </div>
          <div class="button clf">
            <a class="upload fr" href="javascript:">上传</a>
          </div>
        </div>
      </div>
    </div>
    <div class="add_inhabitant" v-if="ifAddInhabitant">
      <div class="depwd" v-drag.cursor="'#addInhabitant'">
        <div class="top-nav" id="addInhabitant">
          <p class="t-text fl">住户授权</p>
          <p class="close fr" @click="ifAddInhabitant = false">x</p>
        </div>
        <div class="bot">
          <div class="cet">
            <div class="clf">
              <p class="red"><i class="iconfont icon-jian-tianchong"></i>错误提示的文案<span>x</span></p>
              <div class="clf">
                <span class="fl">姓名：</span>
                <input class="fl" type="text" placeholder="请输入编号，必填">
              </div>
              <div class="clf">
                <span class="fl">性别：</span>
                <input class="fl" type="text" value="19000124000">
              </div>
              <div class="clf">
                <span class="fl">住户类型：</span>
                <select name="" id="">
                  <option value="">亲属</option>
                  <option value="">业主</option>
                  <option value="">朋友</option>
                  <option value="">租客</option>
                </select>
              </div>
              <div class="clf">
                <span class="fl">电话号码：</span>
                <input class="fl" type="text" placeholder="请输入6-8位数字密码，必填">
              </div>
              <div class="clf">
                <span class="fl">证件号码：</span>
                <input class="fl" type="text" placeholder="请输入6-8位数字密码，必填">
              </div>
              <div class="clf">
                <span class="fl">证件地址：</span>
                <input class="fl" type="text" placeholder="请输入6-8位数字密码，必填">
              </div>
              <div class="clf">
                <span class="fl">出生日期：</span>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <div class="clf">
                <span class="fl">备注：</span>
                <input class="fl w85" type="text" placeholder="请输入备注">
              </div>
            </div>
            <div class="button clf">
              <a class="qr fr">确定</a>
              <a class="qx fr" @click="ifAddInhabitant = false">取消</a>
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
      toggleSearchText: '收起搜索',
      searchDivShow: true,
      ifEditInfo: false,
      ifDel: false,
      ifImportAuthorize: false,
      ifAddInhabitant: false,
      /* ele-ui时间插件 */
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value1: '',
      value7: '',
      logs: {
        attributes: {
          page_index: 1,
          page_size: 10,
          tatal: 0,
          total_pages: 0
        },
        dataItems: [
          {
            content: '',
            id: '',
            operator_time: '',
            remark: '',
            resource_id: '',
            resource_name: ''
          }
        ]
      },
      viewPopupData: {
        content: '',
        id: '',
        operator_time: '',
        remark: '',
        resource_id: '',
        resource_name: ''
      }
    }
  },
  methods: {
    toggleSearch () {
      this.searchDivShow = !this.searchDivShow
      this.toggleSearchText = this.searchDivShow === true ? '收起搜索' : '展开搜索'
      if (this.searchDivShow) {
        $('.transf-button').removeClass('hide')
      } else {
        $('.transf-button').addClass('hide')
      }
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/BuildingManagement.css";
</style>
<style lang="stylus" scoped>
.add_inhabitant
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(0, 0, 0, .2)
  z-index 1002

  .depwd
    width 800px
    top 15%
    left 30%

  .bot
    height 500px

    .cet
      width 95%
      margin 0 auto
      padding-top 20px

      div.clf
        line-height 30px
        margin-bottom 20px
        width 50%
        float left

        &:first-child
          width 100%

        &:last-child
          width 100%

        span
          text-align right
          width 5rem

        .el-input
          width 70%

          .el-input__inner
            border 1px solid #999



      input,
      select
        float left
        width 70%
        height 30px
        border 1px solid #999
        color #999
        padding-left 10px
        border-radius 3px

        &.w85
          width 85%


</style>

<template>
  <div class="content">
    <div class="search">
      <ul>
        <li>
          <div class="fl blue"><span>临停</span></div>
          <div class="fl">
            <p>800000000.00元</p>
            <p>临时收费总金额</p>
          </div>
        </li>
        <li>
          <div class="fl redd"><span>固定</span></div>
          <div class="fl">
            <p>2345812556.00元</p>
            <p>固定收费总金额</p>
          </div>
        </li>
        <li>
          <div class="fl org"><span>临停</span></div>
          <div class="fl">
            <p>800台</p>
            <p>场内滞留车辆</p>
          </div>
        </li>
        <li>
          <div class="fl gre"><span>临停</span></div>
          <div class="fl">
            <p>800台</p>
            <p>来访车辆</p>
          </div>
        </li>
        <li>
          <div class="fl pur"><span>临停</span></div>
          <div class="fl">
            <p>800台</p>
            <p>登记车辆</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="centerDiv clf">
      <div class="fl">
        <div class="titleBar absTitleBar"></div>
        <div id="flowDistribution"></div>
      </div>
      <div class="fr">
        <div class="titleBar absTitleBar"></div>
        <div id="accessNumber"></div>
      </div>
    </div>
    <div class="bottomDiv clf">
      <div class="fl">
        <div class="titleBar">流量分布</div>
        <table class="distributionTable" cellspacing="0" cellpadding="0">
          <thead>
          <tr>
            <td>设备</td>
            <td>设备类型</td>
            <td>流量</td>
            <td>占比</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>西大门入口</td>
            <td><span class="green">入口</span></td>
            <td>3520</td>
            <td>35% <span class="progress"><i style="width: 100%;"></i></span></td>
          </tr>
          <tr>
            <td>西大门入口</td>
            <td><span class="green">入口</span></td>
            <td>3520</td>
            <td>35% <span class="progress"><i style="width: 80%;"></i></span></td>
          </tr>
          <tr>
            <td>西大门入口</td>
            <td><span class="red-text">出口</span></td>
            <td>3520</td>
            <td>35% <span class="progress"><i style="width: 60%;"></i></span></td>
          </tr>
          <tr>
            <td>西大门入口</td>
            <td><span class="red-text">出口</span></td>
            <td>3520</td>
            <td>35% <span class="progress"><i style="width: 40%;"></i></span></td>
          </tr>
          <tr>
            <td>西大门入口</td>
            <td><span class="green">入口</span></td>
            <td>3520</td>
            <td>35% <span class="progress"><i style="width: 20%;"></i></span></td>
          </tr>
          <tr>
            <td>西大门入口</td>
            <td><span class="green">入口</span></td>
            <td>3520</td>
            <td>35% <span class="progress"><i style="width: 15%;"></i></span></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="fr">
        <div class="titleBar absTitleBar"></div>
        <div id="entranceType"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {};
    },
    methods: {
      initEcharts () {
        var flowDistribution = this.$echarts.init(document.getElementById('flowDistribution'));
        var flowDistributionOption = {
          title: {
            text: '流量分布',
            left: '40px',
            top: '8px',
            textStyle: {
              fontSize: 16,
              fontWeight: 'normal',
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'axis',
            show: true,
            axisPointer: {
              lineStyle: {
                color: '#4394FA',
                width: 2
              }
            },
            extraCssText: 'padding:10px;background:#4394FA;text-align:left;',
            position: function (point, params, dom, rect, size) {
              return '';
            },
            formatter: function (params) {
              // 数据格式
              // var relVal = '2016-06-22 15:20'+"<br/>";
              var today = new Date();
              var y = today.getFullYear();
              var m = today.getMonth() + 1;
              var d = today.getDate();
              var h = today.getHours();
              var min = today.getMinutes();
              var s = today.getSeconds();
              m = checkTime(m);
              s = checkTime(s);

              function checkTime (i) {
                if (i < 10) {
                  i = '0' + i;
                }
                return i;
              }

              var relVal = y + '-' + m + '-' + d + '&nbsp;' + h + ':' + min + ':' + s + '<br/>';
              relVal += params[0].seriesName + ' : ' + params[0].value + '&nbsp;';
              relVal += params[1].seriesName + ' : ' + params[1].value + '<br/>';
              return relVal;
            }
          },
          legend: {
            data: ['临停', '固定'],
            icon: 'emptyCircle',
            right: '20px',
            top: '10px',
            textStyle: {
              color: '#fff'
            }
          },
          grid: {
            left: '2%',
            right: '4%',
            bottom: '4%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
            nameTextStyle: {
              color: '#666'
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#666']
              }
            },
            axisLine: {
              lineStyle: {
                color: ['#3a5e75'],
                width: 1
              }
            },
            axisLabel: {
              color: '#666'
            }
          },
          yAxis: {
            type: 'value',
            nameTextStyle: {
              color: '#666'
            },
            axisLabel: {
              formatter: function (value) {
                return (Math.floor(value / 2));
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#3a5e75']
              }
            },
            axisLine: {
              lineStyle: {
                color: '#666',
                width: 0
              }
            },
            axisTick: {
              show: false
            }
          },
          series: [{
            name: '临停',
            type: 'line',
            stack: '总量',
            data: [0, 7, 5, 13, 17, 14, 30, 40, 47, 32, 37, 46, 36, 45]
          },
            {
              name: '固定',
              type: 'line',
              stack: '总量',
              data: [15, 18, 16, 25, 20, 30, 37, 45, 46, 38, 47, 50, 38, 46]
            }
          ],
          color: ['#1c7dfa', '#53d769']
        };
        flowDistribution.setOption(flowDistributionOption);

        var accessNumber = this.$echarts.init(document.getElementById('accessNumber'));
        var accessNumberOption = {
          title: {
            text: '出入数量',
            left: '40px',
            top: '8px',
            textStyle: {
              fontSize: 16,
              fontWeight: 'normal',
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'axis',
            show: true,
            axisPointer: {
              lineStyle: {
                color: '#4394FA',
                width: 2
              }
            },
            extraCssText: 'padding:10px;background:#4394FA;text-align:left;',
            position: function (point, params, dom, rect, size) {
              return '';
            },
            formatter: function (params) {
              // 数据格式
              // var relVal = '2016-06-22 15:20'+"<br/>";
              var today = new Date();
              var y = today.getFullYear();
              var m = today.getMonth() + 1;
              var d = today.getDate();
              var h = today.getHours();
              var min = today.getMinutes();
              var s = today.getSeconds();
              m = checkTime(m);
              s = checkTime(s);

              function checkTime (i) {
                if (i < 10) {
                  i = '0' + i;
                }
                return i;
              }

              var relVal = y + '-' + m + '-' + d + '&nbsp;' + h + ':' + min + ':' + s + '<br/>';
              relVal += params[0].seriesName + ' : ' + params[0].value + '&nbsp;';
              relVal += params[1].seriesName + ' : ' + params[1].value + '<br/>';
              return relVal;
            }
          },
          legend: {
            data: ['入场', '出场'],
            icon: 'emptyCircle',
            right: '20px',
            top: '10px',
            textStyle: {
              color: '#fff'
            }
          },
          grid: {
            left: '2%',
            right: '4%',
            bottom: '4%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7'],
            nameTextStyle: {
              color: '#666'
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#666']
              }
            },
            axisLine: {
              lineStyle: {
                color: ['#3a5e75'],
                width: 1
              }
            },
            axisLabel: {
              color: '#666'
            }
          },
          yAxis: {
            type: 'value',
            nameTextStyle: {
              color: '#666'
            },
            axisLabel: {
              formatter: function (value) {
                return (Math.floor(value / 2));
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#3a5e75']
              }
            },
            axisLine: {
              lineStyle: {
                color: '#666',
                width: 0
              }
            },
            axisTick: {
              show: false
            }
          },
          series: [{
            name: '入场',
            type: 'line',
            smooth: 'true',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
            {
              name: '出场',
              type: 'line',
              smooth: 'true',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            }
          ],
          color: ['#1c7dfa', '#53d769']
        };
        accessNumber.setOption(accessNumberOption);

        var entranceType = this.$echarts.init(document.getElementById('entranceType'));
        var entranceTypeOption = {
          color: ['#1c7dfa', '#f39800', '#52d669', '#ff3a2f', '#a15ded'],
          title: {
            text: '超标原因占比 水/气',
            left: '40xp',
            top: '8px',
            textStyle: {
              fontSize: 16,
              fontWeight: 'normal',
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'axis',
            show: true,
            axisPointer: {
              lineStyle: {
                color: '#4394FA',
                width: 2
              }
            },
            extraCssText: 'padding:10px;background:#4394FA;text-align:left;',
            position: function (point, params, dom, rect, size) {
              return '';
            },
            formatter: function (params) {
              // 数据格式
              // var relVal = '2016-06-22 15:20'+"<br/>";
              var today = new Date();
              var y = today.getFullYear();
              var m = today.getMonth() + 1;
              var d = today.getDate();
              var h = today.getHours();
              var min = today.getMinutes();
              s = today.getSeconds();
              m = checkTime(m);
              s = checkTime(s);

              function checkTime (i) {
                if (i < 10) {
                  i = '0' + i;
                }
                return i;
              }

              var relVal = y + '-' + m + '-' + d + '&nbsp;' + h + ':' + min + ':' + s + '<br/>';
              relVal += params[0].seriesName + ' : ' + params[0].value + '&nbsp;';
              relVal += params[1].seriesName + ' : ' + params[1].value + '<br/>';
              return relVal;
            }
          },
          series: [{
            name: '超标原因占比 水/气',
            type: 'pie',
            radius: ['35%', '40%'],
            center: ['50%', '55%'],
            data: [{
              value: 43,
              name: '已登记来访'
            },
              {
                value: 21,
                name: '临占固'
              },
              {
                value: 21,
                name: '固转临'
              },
              {
                value: 21,
                name: '固定车'
              },
              {
                value: 36,
                name: '未登记来访'
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };
        entranceType.setOption(entranceTypeOption);
      }
    },
    mounted () {
      this.initEcharts();
    }
  };
</script>

<style scoped>
  @import "../assets/css/home.css";
</style>

<template>
  <div>
    <!-- <h2>{{msg}}</h2> -->
    <div id="myChart"></div>
  </div>
</template>

<script>
import Axios from 'axios'
import echarts from 'echarts' //echarts图表
import 'echarts/map/js/china.js' // 引入中国地图数据
import 'echarts-gl'  //BAR3D
// 散点图
require('echarts/lib/chart/scatter')
// 散点图放大
require('echarts/lib/chart/effectScatter')
// 地图
require('echarts/lib/chart/map')
// 图例
require('echarts/lib/component/legend')
// 提示框
require('echarts/lib/component/tooltip')
// 地图geo
require('echarts/lib/component/geo')
export default {
  name: "Map",
  data() {
    return {
      // msg: "人口资源分布图表"
      list: []
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      //请求地址
      let api = 'http://127.0.0.1:3006/privance';
      Axios.get(api).then((response) => {  
        this.list = response;
      }).catch(() => {
        // console.log(error);
      })
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        backgroundColor: "#02AFDB",
          tooltip: {}, // 鼠标移到图里面的浮动提示框
          dataRange: {
            show: false,
            min: 0,
            max: 1300,
            text: ['High', 'Low'],
            realtime: true,
            calculable: true,
            color: ['orangered', 'yellow', 'lightskyblue']
          },
          geo: { // 这个是重点配置区
            map: 'china', // 表示中国地图
            roam: true,
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: 'rgba(0,0,0,0.4)'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [{
              type: 'scatter',
              coordinateSystem: 'geo' // 对应上方配置
            },
            {
              name: '人口分布/个', // 浮动框的标题
              type: 'map',
              geoIndex: 0,
              data: this.list.data
            }
          ]
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#myChart {
  width: 100%;
  height: 600px;
}

</style>

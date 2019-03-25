<template>
  <div>
    <!-- <h2>{{msg}}</h2> -->
    <div id="chart"></div>
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

    }
  },
  mounted() {
    this.getMapData();
    this.initChart();
  },
  methods: {
    getMapData(){
      return new Promise((resolve, reject) => {
        //请求地址
        let api = 'https://www.echartsjs.com/examples/data-gl/asset/data/population.json';
        Axios.get(api).then((data) => {
            console.log(data)
            data = data.filter(function (dataItem) {
                resolve(dataItem[2] > 0);
            }).map(function (dataItem) {
                resolve([dataItem[0], dataItem[1], Math.sqrt(dataItem[2])]);
            });  
        }).catch((err) => {
          reject(err);
        })
      })
    },
    async initChart() {
      //获取省份人口数
      var pdata = await this.getMapData();
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("chart"));
      // 绘制图表
      myChart.setOption({
         backgroundColor: '#cdcfd5',
        geo3D: {
            map: 'china',
            shading: 'lambert',
            light: {
                main: {
                    intensity: 5,
                    shadow: true,
                    shadowQuality: 'high',
                    alpha: 30
                },
                ambient: {
                    intensity: 0
                },
                ambientCubemap: {
                    texture: '/asset/canyon.hdr',
                    exposure: 1,
                    diffuseIntensity: 0.5
                }
            },
            viewControl: {
                distance: 50,
                panMouseButton: 'left',
                rotateMouseButton: 'right'
            },
            groundPlane: {
                show: true,
                color: '#999'
            },
            postEffect: {
                enable: true,
                bloom: {
                    enable: false
                },
                SSAO: {
                    radius: 1,
                    intensity: 1,
                    enable: true
                },
                depthOfField: {
                    enable: false,
                    focalRange: 10,
                    blurRadius: 10,
                    fstop: 1
                }
            },
            temporalSuperSampling: {
                enable: true
            },
            itemStyle: {
            },

            regionHeight: 2
        },
        visualMap: {
            max: 40,
            calculable: true,
            realtime: false,
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            },
            outOfRange: {
                colorAlpha: 0
            }
        },
        series: [{
            type: 'bar3D',
            coordinateSystem: 'geo3D',
            shading: 'lambert',
            data: pdata,
            barSize: 0.1,
            minHeight: 0.2,
            silent: true,
            itemStyle: {
                color: 'orange'
                // opacity: 0.8
            }
        }]
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#chart {
  width: 100%;
  height: 600px;
}

</style>

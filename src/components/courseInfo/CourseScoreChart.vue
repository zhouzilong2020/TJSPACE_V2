<template>
  <div id="main" style="width: 100%; height: 100%; min-height:200px"></div>
</template>

<script>
// import echarts from "echarts";
export default {
  name: "CourseStatisticRight",
  data: () => {
    return {
      echarts: null,
      option: {
        legend: {
          // right: 0,
          bottom: 0,
          
          data: ["本课程平均评价", "同类课程平均评价"],
        },
        radar: {
          shape: "circle",
          startAngle: "45",
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 10,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "内容质量", max: 1000 },
            { name: "授课质量", max: 1000 },
            { name: "课业压力", max: 1000 },
            { name: "评分情况", max: 1000 },
          ],
          splitArea: {
            areaStyle: {
              color: ["#B8D3E2", "#96C5E1", "#7DB5D8", "#72ACD0"],
            },
          },
          splitNumber: 4,
          radius: "60%",
          center: ["50%", "45%"],
        },
        series: [
          {
            name: "radar",
            type: "radar",
            areaStyle: { normal: {} },
            
            data: [
              {
                // value: [830, 280, 350, 500],
                name: "本课程平均评价",
              },
              {
                // value: [600, 640, 310, 420],
                name: "同类课程平均评价",
              },
            ],
          },
        ],
      },
    };
  },
  props: {
    thisAvg: {
      type: Array,
      default: function () {
        return [800, 854, 896, 754];
      },
    },
    otherAvg: {
      type: Array,
      default: function () {
        return [780, 654, 496, 54];
      },
    },
  },
  computed: {},
  methods: {
    init() {
      var myChart = this.echarts.init(document.getElementById("main"), "light");
      // 绘制图表
      // myChart.showLoading()
      myChart.setOption(this.option);
      myChart.setOption({
        series: [
          {
            name: "radar",
            data: [
              {
                name: "本课程平均评价",
                value: this.thisAvg,
              },
              {
                name: "同类课程平均评价",
                value: this.otherAvg,
              },
            ],
          },
        ],
      });
    },
  },
  mounted() {
    const that = this;
    this.echarts = require("echarts");
    this.init();
    window.onresize = () => {
      that.myMap.resize();
    };
  },
};
</script>

<style>
</style>
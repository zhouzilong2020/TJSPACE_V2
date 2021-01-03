<template>
  <div id="main" style="width: 100%; height: 100%; min-height: 200px"></div>
</template>

<script>
// import echarts from "echarts";
export default {
  name: "CourseScoreChart",
  data: () => {
    return {
      charts: null,
      echarts:null,
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
    courseInfo: {},
    thisAvg: {
      type: Array,
      default: function () {
        return [8.0, 8.54, 8.96, 7.54];
      },
    },
    otherAvg: {
      type: Array,
      default: function () {
        return [7.8, 6.54, 4.96, 0.54];
      },
    },
  },
  computed: {
    myAvg() {
      var avg = [];
      // //console.log(this.courseInfo);
      // { name: "内容质量", max: 1000 },
      // { name: "授课质量", max: 1000 },
      // { name: "课业压力", max: 1000 },
      // { name: "评分情况", max: 1000 },
      avg.push(Number(this.courseInfo.avgContentScore) * 100);
      avg.push(Number(this.courseInfo.avgTeachingScore) * 100);
      avg.push(Number(this.courseInfo.avgWorkloadScore) * 100);
      avg.push(Number(this.courseInfo.avgGradingScore) * 100);
      return avg;
    },
    elseAvg() {
      var avg = [];
      for (let i = 0; i < this.otherAvg.length; i++) {
        avg.push(this.otherAvg[i] * 100);
      }
      return avg;
    },
  },
  methods: {
    init() {
      this.charts = this.echarts.init(document.getElementById("main"), "light");
      // 绘制图表
      // myChart.showLoading()
      this.charts.setOption(this.option);
      this.charts.setOption({
        series: [
          {
            name: "radar",
            data: [
              {
                name: "本课程平均评价",
                value: this.myAvg,
              },
              {
                name: "同类课程平均评价",
                value: this.elseAvg,
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
    this.window.onresize = () => {
      that.charts.resize();
    };
  },
};
</script>

<style>
</style>
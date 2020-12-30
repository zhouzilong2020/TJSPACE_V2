<template>
  <div
    id="CourseAttitudeChart"
    style="
      width: 100%;
      height: 100%;
      min-width: 180px;
      max-width: 200px;
      min-height: 200px;
    "
  ></div>
</template>

<script>
export default {
  name: "CourseAttitudeChart",
  data: () => {
    return {
      echarts: null,
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          bottom: "0",
          data: ["强烈好评", "好评", "一般", "不推荐", "强烈不推荐"],
        },
        series: [
          {
            name: "学生态度",
            type: "pie",
            radius: [10, 50],
            center: ["50%", "35%"],
            roseType: "radius",
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [
              { value: 0, name: "强烈好评" },
              { value: 0, name: "好评" },
              { value: 0, name: "一般" },
              { value: 0, name: "不推荐" },
              { value: 0, name: "强烈不推荐" },
            ],
          },
        ],
      },
    };
  },

  props: {
    attitudeCnt: {
      type: Array,
      default: function () {
        return [12, 42, 12, 42, 43];
      },
    },
  },
  computed: {},
  methods: {
    init() {
      var myChart = this.echarts.init(
        document.getElementById("CourseAttitudeChart"),
        "light"
      );
      // 绘制图表
      // myChart.showLoading()
      myChart.setOption(this.option);
      myChart.setOption({
        series: [
          {
            name: "学生态度",
            data: [
              { value: this.attitudeCnt[0], name: "强烈好评" },
              { value: this.attitudeCnt[1], name: "好评" },
              { value: this.attitudeCnt[2], name: "一般" },
              { value: this.attitudeCnt[3], name: "不推荐" },
              { value: this.attitudeCnt[4], name: "强烈不推荐" },
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
      that.myMap.resize();
    };
  },
};
</script>

<style>
</style>
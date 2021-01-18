<template>
  <div
    id="CourseAttitudeChart"
    style="width: 100%; height: 100%; min-height: 200px"
  ></div>
</template>

<script>
export default {
  name: "CourseAttitudeChart",
  data: () => {
    return {
      chart: null,
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
            radius: [1, 50],
            center: ["50%", "25%"],
            roseType: "radius",
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
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
      this.chart = this.echarts.init(
        document.getElementById("CourseAttitudeChart"),
        "light"
      );
      this.chart.setOption(this.option);
      this.chart.setOption({
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
      that.chart.resize();
    };
  },
};
</script>

<style>
</style>
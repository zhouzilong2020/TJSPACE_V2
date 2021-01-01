<template>
  <div id="CommentHeatChart" style="min-width: 600px; height: 160px"></div>
</template>

<script>
export default {
  name: "CommentHeatChart",
  methods: {
    getVirtulData(year) {
      year = year || "2020";
      var date = +this.echarts.number.parseDate(year + "-01-01");
      var end = +this.echarts.number.parseDate(+year + 1 + "-01-01");
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time < end; time += dayTime) {
        data.push([
          this.echarts.format.formatTime("yyyy-MM-dd", time),
          Math.floor(Math.random() * 100),
        ]);
      }
      console.log(data);
      return data;
    },
    init() {
      this.chart = this.echarts.init(
        document.getElementById("CommentHeatChart"),
        "light"
      );
      this.chart.setOption(this.option);
      this.chart.setOption({ series: { data: this.getVirtulData(2020) } });
    },
  },

  data() {
    return {
      echarts: null,
      chart: null,
      option: {
        title: {
          left: "center",
          text: "用户活力图",
        },
        tooltip: {
          position: "top",
        },
        visualMap: {
          top: 140,
          min: 0,
          max: 100,
          type: "piecewise",
          orient: "horizontal",
          left: "center",
          textStyle: {
            color: "#000",
          },
        },
        calendar: {
          top: 50,
          left: 18,
          right: 4,
          cellSize: ["auto", 12],
          range: "2020",
          itemStyle: {
            borderWidth: 0.4,
          },
          yearLabel: { show: false },
        },
        series: {
          name: "活力度",
          type: "heatmap",
          coordinateSystem: "calendar",
          data: null,
        },
      },
    };
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
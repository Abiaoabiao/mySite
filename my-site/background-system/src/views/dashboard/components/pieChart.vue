<template>
  <div ref="chart" style="width: 100%; height: 400px" />
</template>

<script>
const Echarts = require('echarts/lib/echarts') // 基础实例 注意不要使用import
export default {
  data() {
    return { chart: null }
  }, // 图表实例
  mounted() {
    window.addEventListener('resize', () => {
      this.chart.resize()
    })
    this.init()
  },
  methods: {
    init() {
      // 2.初始化
      this.chart = Echarts.init(this.$refs.chart)
      // 3.配置数据
      const option = {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left' },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              {
                value: 1048,
                name: 'Search Engine'
              },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      this.chart.setOption(option)
    }
  }
}
</script>

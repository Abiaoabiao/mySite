<template>
  <div ref="chart" style="width: 100%; height: 400px" />
</template>

<script>
import { getBlog } from '@/api/blog.js'
import { getComments } from '@/api/comment.js'
const Echarts = require('echarts/lib/echarts') // 基础实例 注意不要使用import
export default {
  data() {
    return {
      chart: null,
      data: [],
      list: []
    }
  }, // 图表实例
  mounted() {
    window.addEventListener('resize', () => {
      this.chart.resize()
    })
    this.init()
  },
  created() {
    getBlog().then((res) => {
      this.data = res.data.rows
      this.formData()
    })

    // this.formData()
  },
  methods: {
    init() {
      // 2.初始化
      this.chart = Echarts.init(this.$refs.chart)
      // 3.配置数据
      const option = {
        title: {
          text: '各博客浏览数',
          subtext: 'Real Data',
          left: 'center'
        },
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left' },
        color: [
          'salmon',
          'darkseagreen',
          '#fac858',
          'steelblue',
          '#fac',
          '#acf',
          '#fca',
          '#afc',
          '#caf',
          '#cfa'
        ],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: this.list,
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
    },
    formData() {
        var tempArr = []
      for (let i = 0; i < this.data.length; i++) {
        tempArr.push({value: this.data[i].scanNumber,name:this.data[i].title})
      }
      this.list = tempArr
      this.init()
    }
  }
}
</script>

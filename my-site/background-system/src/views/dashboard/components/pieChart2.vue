<template>
  <div ref="chart" style="width: 100%; height: 400px" />
</template>

<script>
import { getBlog } from '@/api/blog.js'
import { getProject } from '@/api/projects.js'
const Echarts = require('echarts/lib/echarts') // 基础实例 注意不要使用import
export default {
  data() {
    return {
      chart: null,
      data: [],
      list: [],
      form:[]
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
      this.data = res.data
      getProject().then((res) => {
        this.list = res.data
        this.formData()
      })
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
          text: '博客、项目比例',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left' },
        color:['#fac858','steelblue','#fac','#acf','#fca','#afc'],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: this.form,
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
        
      var tempArr = [
          {value: this.data.total,name:'博客数量'},
          {value: this.list.length,name:'项目数量'}
          ]
          this.form = tempArr
          this.init()
    }
  }
}
</script>

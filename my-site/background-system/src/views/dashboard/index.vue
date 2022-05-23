<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎来到个人博客后台管理系统</div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <PieChart2 />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <PieChart3 />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PieChart from './components/pieChart'
import PieChart3 from './components/pieChart3'
import PieChart2 from './components/pieChart2'
export default {
  name: 'Dashboard',
  components: { PieChart ,PieChart3,PieChart2
}
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ])
  // }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    padding: 32px;
    background-color: #f0f2f5;
    position: relative;
    margin: 30px;
  }
  &-text {
    margin-bottom: 30px;
    font-size: 30px;
    line-height: 46px;
  }
}

.chart-wrapper {
  background: #fff;
  padding: 50px 16px 0;
  margin-bottom: 32px;
}
</style>

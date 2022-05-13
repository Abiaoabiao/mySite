<template>
  <div class="app-container">
    <div class="block">关于我</div>
    <el-input v-model="url" placeholder="请输入内容" :disabled="isDisabled" />
    <el-button type="primary" style="margin-top: 15px" @click="clickHandler">{{
      buttonContent
    }}</el-button>
  </div>
</template>

<script>
import { getAbout, setAbout } from '@/api/about.js'
export default {
  data() {
    return {
      url: '',
      buttonContent: '编辑',
      isDisabled: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getAbout().then((res) => {
        this.url = res.data
      })
    },
    clickHandler() {
      if (this.buttonContent == '编辑') {
        this.buttonContent = '完成'
        this.isDisabled = !this.isDisabled
      } else {
        if (this.url) {
          this.buttonContent = '编辑'
          this.isDisabled = !this.isDisabled
          setAbout(this.url)
            .then((res) => {
              console.log(res)
              this.$message.success('更改成功')
            })
            .catch((res) => {
              console.log(res)
            })
        } else {
          this.$message.warning('请填写数据')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  font-weight: 100;
  padding: 15px 0;
}
</style>

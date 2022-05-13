<template>
  <div class="app-container">
    <div class="block">项目名称</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.name" placeholder="请输入项目名称" />
    </div>

    <div class="block">项目描述（描述之间使用中文分号；相隔）</div>
    <div style="margin-bottom: 15px">
      <el-input
        v-model="form.description"
        placeholder="项目描述（描述之间使用中文分号；相隔）"
      />
    </div>

    <div class="block">项目链接</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.url" placeholder="请输入项目链接" />
    </div>

    <div class="block">Github & Gitee 地址</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.github" placeholder="请输入Github 地址" />
    </div>

    <div style="margin-bottom: 15px">
      <Upload v-model="form.thumb" upload-title="预览图" />
    </div>

    <div class="block">项目等级</div>
    <div style="margin-bottom: 15px">
      <el-select v-model="form.order" placeholder="请选择排序等级">
        <el-option label="1" value="1" />
        <el-option label="2" value="2" />
        <el-option label="3" value="3" />
        <el-option label="4" value="4" />
        <el-option label="5" value="5" />
      </el-select>
    </div>
    <el-button type="primary" plain @click='addProjectHandler'>发布项目</el-button>

  </div>
</template>

<script>
import Upload from '@/components/Upload'
import {addProject} from '@/api/projects.js'
export default {
  components: {
    Upload
  },
  data() {
    return {
      form: {
        name: '',
        url: '',
        github: '',
        thumb: '',
        order: '1',
        description: ''
      }
    }
  },
  methods: {
      addProjectHandler(){
          let obj ={...this.form};
          obj.description = obj.description.split("；");
          obj.order = parseInt(obj.order);
          addProject(obj).then(() => {
              this.$router.push('/project/projects')
              this.$message.success('发布成功')
          })
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

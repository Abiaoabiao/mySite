<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="data"
      highlight-current-row
      element-loading-text="数据加载中"
      border
      fit
    >
      <!-- 序号 -->
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <!-- 名称 -->
      <el-table-column align="center" label="项目名称" width="120">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" class="proName">{{
            scope.row.name
          }}</a>
        </template>
      </el-table-column>

      <!-- 项目描述 -->
      <el-table-column label="项目描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>

      <!-- 预览图 -->
      <el-table-column align="center" label="预览图">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.thumb"
            style="width: 200px"
            :preview-src-list="srcList"
          />
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="Github & Gitee"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              class="github"
              icon="iconfont icon-github"
              circle
              @click="goToGithub(scope.row)"
            />
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              mini
              @click="editProject(scope.row)"
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              mini
              @click="deleteProject(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改项目信息" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="项目描述（描述之间使用中文分号；相隔）">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="Github & Gitee 地址">
          <el-input v-model="form.github" />
        </el-form-item>

        <el-form-item label="预览图">
          <Upload v-model="form.thumb" />
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="请选择排序等级">
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
            <el-option label="4" value="4" />
            <el-option label="5" value="5" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editProjectConfirm">
          确定修改
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProject, setProject, delProject } from '@/api/projects.js'
import { server_URL } from '@/urlConfig.js'
import Upload from '@/components/Upload.vue'
export default {
  components: {
    Upload
  },
  data() {
    return {
      data: [],
      listLoading: false,
      srcList: [],
      dialogFormVisible: false,
      form: {
        name: '',
        description: '',
        url: '',
        github: '',
        thumb: '',
        order: '1'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getProject().then(({ data }) => {
        this.data = data
        this.listLoading = false
        for (const i of this.data) {
        i.description = i.description.join('；')
          this.srcList.push(i.thumb)
        }
      })
    },
    goToGithub(projectInfo) {
      window.open(projectInfo.github)
    },
    editProject(projectInfo) {
      this.dialogFormVisible = true
      this.form = {
        ...projectInfo,
      }
    },
    deleteProject(projectInfo) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delProject(projectInfo.id).then(() => {
            this.fetchData()
            this.$message({ type: 'success', message: '删除成功!' })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    editProjectConfirm() {
        let obj = {...this.form}
        obj.description = this.form.description.split('；');
        obj.order = parseInt(this.form.order)
        setProject(obj.id,obj).then(() => {
            this.dialogFormVisible = false;
            this.fetchData();
            this.$message.success('修改成功')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.proName:hover {
  color: rgb(163, 163, 163);
}
.github {
  background-color: rgb(163, 163, 163);
  border: 1px solid rgb(163, 163, 163);
}
</style>

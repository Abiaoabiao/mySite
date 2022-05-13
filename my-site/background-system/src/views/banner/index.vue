<template>
  <div class="app-container">
    <el-button type="primary" @click="addBanner">+新建标语</el-button>

    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%; margin-top: 20px" border>
      <el-table-column prop="date" label="序号" align="center" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="150"
        align="center"
      ><template slot-scope="scope">
        {{ scope.row.title }}
      </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
      ><template slot-scope="scope">
        {{ scope.row.description }}
      </template>
      </el-table-column>
      <el-table-column
        label="中图预览"
        align="center"
      ><template slot-scope="scope">
        <el-image
          style="width: 150px"
          :src="scope.row.midImg2"
          fit="fill"
          :preview-src-list="midList"
        />
      </template>
      </el-table-column>
      <el-table-column
        label="大图预览"
        align="center"
      ><template slot-scope="scope">
        <el-image
          style="width: 150px"
          :src="scope.row.bigImg2"
          fit="fill"
          :preview-src-list="bigList"
        />
      </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
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
              @click="editBanner(scope.row)"
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
              @click="deleteBanner(scope)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑首页标语 -->
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <Upload v-model="form.midImg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页大图">
              <Upload v-model="form.bigImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">{{
          addB ? '添加' : '确定修改'
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, setBanner } from '@/api/banner.js'
import Upload from '@/components/Upload.vue'
import { server_URL } from '@/urlConfig.js'
export default {
  components: {
    Upload
  },
  data() {
    return {
      addB: false,
      midList: [],
      bigList: [],
      data: [],
      dialogFormVisible: false, // 编辑对话框是否显示
      form: {
        id: '',
        midImg: '',
        bigImg: '',
        title: '',
        description: ''
      }
      //   formLabelWidth: '120px'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getBanner().then((res) => {
        this.data = res.data
        for (const item of this.data) {
          item.midImg2 = server_URL + item.midImg
          item.bigImg2 = server_URL + item.bigImg
        }
        res.data.map((item) => {
          this.midList.push(item.midImg2)
          this.bigList.push(item.bigImg2)
        })
      })
    },
    // 编辑
    editBanner(bannerInfo) {
      // 1.将bannnerInfo的数据给form     2.打开dialog
      this.addB = false
      this.form = { ...bannerInfo }
      this.dialogFormVisible = true
    },
    // 删除
    deleteBanner(banner) {
      const arr = [...this.data]
      this.$alert(
        `确定删除序号${banner.$index + 1}标题为${banner.row.title}的标语`,
        '',
        {
          confirmButtonText: '确定',
          callback: (action) => {
            if (action == 'cancel') {
              this.$message({ type: 'info', message: `正在取消删除` })
            } else {
              for (let i = 0; i < arr.length; i++) {
                if (arr[i].id == banner.row.id) {
                  // 找到修改的元素并替换
                  arr.splice(i, 1)
                  i--
                }
              }
              setBanner(arr).then((res) => {
                this.fetchData()
              })
              this.$message({ type: 'success', message: `删除成功` })
            }
          }
        }
      )
    },
    editBannerConfirm() {
      // 因为api文档要求全部上传，那怕只改了一个
      const message = this.addB ? '添加成功' : '修改成功'
      const arr = [...this.data]
      if (this.addB) {
        arr.push(this.form)
      } else {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id == this.form.id) {
            // 找到修改的元素并替换
            arr[i] = this.form
          }
        }
      }
      setBanner(arr).then((res) => {
        this.dialogFormVisible = false // 关闭对话框
        this.$message({
          message,
          type: 'success'
        })
        this.fetchData()
      })
    },
    // 添加
    addBanner() {
      this.addB = true
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss" scoped></style>

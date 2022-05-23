<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="data"
      highlight-current-row
      style="width: 100%; margin-top: 20px"
      border
      element-loading-text="数据加载中"
      fit
    >
      <el-table-column label="序号" align="center" width="60">
        <template slot-scope="scope">
          {{ scope.$index + (currentPage - 1) * eachPage + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        width="80"
        label="头像"
        align="center"
      ><template slot-scope="scope">
        <el-avatar shape="square" size="small" :src="scope.row.avatar" />
      </template>
      </el-table-column>
      <el-table-column
        label="昵称"
        align="center"
        width="150"
      ><template slot-scope="scope">
        {{ scope.row.nickname }}
      </template>
      </el-table-column>
      <el-table-column
        label="留言内容"
        align="center"
      ><template slot-scope="scope">
        {{ scope.row.content }}
      </template>
      </el-table-column>
      <el-table-column
        label="评论日期"
        align="center"
        width="230"
      ><template slot-scope="scope">
        {{ scope.row.createDate }}
      </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
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
              @click="deleteComment(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 30px"
      background
      :page-size="eachPage"
      :page-sizes="[5, 10, 20]"
      layout="prev, pager, next, total, ->, sizes, jumper"
      :total="count"
      :current-page.sync="pagerCurrentPage"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
    />
  </div>
</template>

<script>
import { delMessage, getMessage } from '@/api/message.js'
import { formatDate } from '@/utils/tools.js'
import { server_URL } from '@/urlConfig.js'
export default {
  data() {
    return {
      data: [],
      listLoading: false,
      currentPage: 1,
      eachPage: 5,
      count: 0,
      pagerCurrentPage: 1
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getMessage(this.currentPage,this.eachPage).then(({ data }) => {
        this.listLoading = false
        this.data = data.rows
        for (const i of this.data) {
          i.createDate = formatDate(i.createDate)
        }
        this.count = data.total
        this.totalPage = Math.ceil(this.count / this.eachPage)
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage
          this.fetchData()
        }
      })
    },
    deleteComment({ id }) {
      this.$confirm('此操作将永久删除该评论, 是否继续?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delMessage(id).then(() => {
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
    sizeChangeHandle(pagerNum) {
      this.eachPage = parseInt(pagerNum)
      this.currentPage = 1
      this.pagerCurrentPage = 1 // 将分页组件重新回到1
      this.fetchData()
    },
    currentChangeHandle(pageNum) {
      this.currentPage = parseInt(pageNum)
      this.fetchData()
      this.listLoading = true
    },
    prevClickHandle() {
      this.currentPage -= 1
    },
    nextClickHandle() {
      this.currentPage += 1
    }
  }
}
</script>

<style lang="scss" scoped></style>

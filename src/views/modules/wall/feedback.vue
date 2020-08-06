<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('wall:feedback:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('wall:feedback:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="number"
        header-align="center"
        align="center"
        label="问题单号">
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="问题类型">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.type===1">账号问题</el-tag>
          <el-tag type="info" v-else-if="scope.row.type===2">项目问题</el-tag>
          <el-tag type="warning" v-else-if="scope.row.type===3">交易问题</el-tag>
          <el-tag type="success" v-else-if="scope.row.type ===4">建议反馈</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="targetId"
        header-align="center"
        align="center"
        label="对象ID">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.targetObj" placement="top-start">
            <span class="col-cont" v-html="scope.row.targetId"></span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="userId"
        header-align="center"
        align="center"
        label="提交人">
      </el-table-column>
      <el-table-column
        prop="title"
        header-align="center"
        align="center"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="description"
        header-align="center"
        align="center"
        label="描述">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.remark" placement="top-start">
            <span class="col-cont" v-html="scope.row.description"></span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="tel"
        header-align="center"
        align="center"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="email"
        header-align="center"
        align="center"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="image"
        header-align="center"
        align="center"
        label="反馈图片">
      </el-table-column>
      <el-table-column
        prop="reply"
        header-align="center"
        align="center"
        label="回复内容">
      </el-table-column>
      <el-table-column
        prop="appraise"
        header-align="center"
        align="center"
        label="用户评价">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.appraiseTime" placement="top-start">
            <el-tag type="success" v-if="scope.row.appraise===1">满意</el-tag>
            <el-tag type="warning" v-else-if="scope.row.appraise===2">不满意</el-tag>
            <el-tag type="info" v-else-if="scope.row.appraise ===3">待评价</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.status===1">待处理</el-tag>
          <el-tag type="warning" v-else-if="scope.row.status===2">处理中</el-tag>
          <el-tag type="success" v-else-if="scope.row.status ===3">已处理</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './feedback-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/wall/feedback/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/wall/feedback/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>

<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="服务类型：1账号问题，2项目问题,3交易问题，4建议反馈" prop="type">
      <el-input v-model="dataForm.type" placeholder="服务类型：1账号问题，2项目问题,3交易问题，4建议反馈"></el-input>
    </el-form-item>
    <el-form-item label="类型名称" prop="typeName">
      <el-input v-model="dataForm.typeName" placeholder="类型名称"></el-input>
    </el-form-item>
    <el-form-item label="分类名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="分类名称"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-model="dataForm.sort" placeholder="排序"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="最后一次更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="最后一次更新时间"></el-input>
    </el-form-item>
    <el-form-item label="状态是否是其他类型:1是，0不是" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态是否是其他类型:1是，0不是"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          type: '',
          typeName: '',
          name: '',
          sort: '',
          createTime: '',
          updateTime: '',
          status: ''
        },
        dataRule: {
          type: [
            { required: true, message: '服务类型：1账号问题，2项目问题,3交易问题，4建议反馈不能为空', trigger: 'blur' }
          ],
          typeName: [
            { required: true, message: '类型名称不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '分类名称不能为空', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '最后一次更新时间不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态是否是其他类型:1是，0不是不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/wall/feedback-type/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.type = data.wpFeedbackType.type
                this.dataForm.typeName = data.wpFeedbackType.typeName
                this.dataForm.name = data.wpFeedbackType.name
                this.dataForm.sort = data.wpFeedbackType.sort
                this.dataForm.createTime = data.wpFeedbackType.createTime
                this.dataForm.updateTime = data.wpFeedbackType.updateTime
                this.dataForm.status = data.wpFeedbackType.status
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/wall/feedback-type/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'type': this.dataForm.type,
                'typeName': this.dataForm.typeName,
                'name': this.dataForm.name,
                'sort': this.dataForm.sort,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime,
                'status': this.dataForm.status
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>

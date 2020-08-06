<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="URL" prop="url">
      <el-input v-model="dataForm.url" placeholder="URL"></el-input>
    </el-form-item>
    <el-form-item label="logo" prop="logo">
      <el-input v-model="dataForm.logo" placeholder="logo"></el-input>
    </el-form-item>
    <el-form-item label="顺序" prop="orderNum">
      <el-input v-model="dataForm.orderNum" placeholder="顺序"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
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
          name: '',
          url: '',
          logo: '',
          orderNum: '',
          remark: '',
          updateTime: ''
        },
        dataRule: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          url: [
            { required: true, message: 'URL不能为空', trigger: 'blur' }
          ],
          logo: [
            { required: true, message: 'logo不能为空', trigger: 'blur' }
          ],
          orderNum: [
            { required: true, message: '顺序不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/ugc/friendlylink/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.friendlyLink.name
                this.dataForm.url = data.friendlyLink.url
                this.dataForm.logo = data.friendlyLink.logo
                this.dataForm.orderNum = data.friendlyLink.orderNum
                this.dataForm.remark = data.friendlyLink.remark
                this.dataForm.updateTime = data.friendlyLink.updateTime
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
              url: this.$http.adornUrl(`/ugc/friendlylink/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'url': this.dataForm.url,
                'logo': this.dataForm.logo,
                'orderNum': this.dataForm.orderNum,
                'remark': this.dataForm.remark,
                'updateTime': this.dataForm.updateTime
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

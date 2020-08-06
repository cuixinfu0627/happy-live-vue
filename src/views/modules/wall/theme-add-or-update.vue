<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="主题名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="主题名称"></el-input>
    </el-form-item>
    <el-form-item label="显示颜色" prop="color">
      <el-input v-model="dataForm.color" placeholder="显示颜色"></el-input>
    </el-form-item>
    <el-form-item label="图片地址" prop="picUrl">
      <el-input v-model="dataForm.picUrl" placeholder="图片地址"></el-input>
    </el-form-item>
    <el-form-item label="点击量" prop="clickNum">
      <el-input v-model="dataForm.clickNum" placeholder="点击量"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createtime">
      <el-input v-model="dataForm.createtime" placeholder="创建时间"></el-input>
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
          color: '',
          picUrl: '',
          clickNum: '',
          createtime: ''
        },
        dataRule: {
          name: [
            { required: true, message: '主题名称不能为空', trigger: 'blur' }
          ],
          color: [
            { required: true, message: '显示颜色不能为空', trigger: 'blur' }
          ],
          picUrl: [
            { required: true, message: '图片地址不能为空', trigger: 'blur' }
          ],
          clickNum: [
            { required: true, message: '点击量不能为空', trigger: 'blur' }
          ],
          createtime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/wall/theme/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.wpTheme.name
                this.dataForm.color = data.wpTheme.color
                this.dataForm.picUrl = data.wpTheme.picUrl
                this.dataForm.clickNum = data.wpTheme.clickNum
                this.dataForm.createtime = data.wpTheme.createtime
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
              url: this.$http.adornUrl(`/wall/theme/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'color': this.dataForm.color,
                'picUrl': this.dataForm.picUrl,
                'clickNum': this.dataForm.clickNum,
                'createtime': this.dataForm.createtime
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

<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="圈字创建人:圈主" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="圈字创建人:圈主"></el-input>
    </el-form-item>
    <el-form-item label="圈子logo" prop="logo">
      <el-input v-model="dataForm.logo" placeholder="圈子logo"></el-input>
    </el-form-item>
    <el-form-item label="圈子关键词" prop="keyword">
      <el-input v-model="dataForm.keyword" placeholder="圈子关键词"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="dataForm.description" placeholder="描述"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="creatData">
      <el-input v-model="dataForm.creatData" placeholder="创建时间"></el-input>
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
          userId: '',
          logo: '',
          keyword: '',
          description: '',
          creatData: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '圈字创建人:圈主不能为空', trigger: 'blur' }
          ],
          logo: [
            { required: true, message: '圈子logo不能为空', trigger: 'blur' }
          ],
          keyword: [
            { required: true, message: '圈子关键词不能为空', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
          creatData: [
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
              url: this.$http.adornUrl(`/wall/circle/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.wpCircle.userId
                this.dataForm.logo = data.wpCircle.logo
                this.dataForm.keyword = data.wpCircle.keyword
                this.dataForm.description = data.wpCircle.description
                this.dataForm.creatData = data.wpCircle.creatData
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
              url: this.$http.adornUrl(`/wall/circle/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userId': this.dataForm.userId,
                'logo': this.dataForm.logo,
                'keyword': this.dataForm.keyword,
                'description': this.dataForm.description,
                'creatData': this.dataForm.creatData
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

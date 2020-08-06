<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="主题id" prop="themeId">
      <el-input v-model="dataForm.themeId" placeholder="主题id"></el-input>
    </el-form-item>
    <el-form-item label="一级分类" prop="classifyA">
      <el-input v-model="dataForm.classifyA" placeholder="一级分类"></el-input>
    </el-form-item>
    <el-form-item label="二级分类" prop="classifyB">
      <el-input v-model="dataForm.classifyB" placeholder="二级分类"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="picUrl">
      <el-input v-model="dataForm.picUrl" placeholder="图片"></el-input>
    </el-form-item>
    <el-form-item label="序号" prop="orderNo">
      <el-input v-model="dataForm.orderNo" placeholder="序号"></el-input>
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
          themeId: '',
          classifyA: '',
          classifyB: '',
          picUrl: '',
          orderNo: ''
        },
        dataRule: {
          themeId: [
            { required: true, message: '主题id不能为空', trigger: 'blur' }
          ],
          classifyA: [
            { required: true, message: '一级分类不能为空', trigger: 'blur' }
          ],
          classifyB: [
            { required: true, message: '二级分类不能为空', trigger: 'blur' }
          ],
          picUrl: [
            { required: true, message: '图片不能为空', trigger: 'blur' }
          ],
          orderNo: [
            { required: true, message: '序号不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/wall/carousel/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.themeId = data.wpCarousel.themeId
                this.dataForm.classifyA = data.wpCarousel.classifyA
                this.dataForm.classifyB = data.wpCarousel.classifyB
                this.dataForm.picUrl = data.wpCarousel.picUrl
                this.dataForm.orderNo = data.wpCarousel.orderNo
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
              url: this.$http.adornUrl(`/wall/carousel/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'themeId': this.dataForm.themeId,
                'classifyA': this.dataForm.classifyA,
                'classifyB': this.dataForm.classifyB,
                'picUrl': this.dataForm.picUrl,
                'orderNo': this.dataForm.orderNo
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

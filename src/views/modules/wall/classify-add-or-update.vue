<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="分类:一级分类0 二级为一级的id" prop="parentId">
      <el-input v-model="dataForm.parentId" placeholder="分类:一级分类0 二级为一级的id"></el-input>
    </el-form-item>
    <el-form-item label="名称" prop="classifyName">
      <el-input v-model="dataForm.classifyName" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="图标" prop="classifyPic">
      <el-input v-model="dataForm.classifyPic" placeholder="图标"></el-input>
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
          parentId: '',
          classifyName: '',
          classifyPic: '',
          orderNo: ''
        },
        dataRule: {
          parentId: [
            { required: true, message: '分类:一级分类0 二级为一级的id不能为空', trigger: 'blur' }
          ],
          classifyName: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          classifyPic: [
            { required: true, message: '图标不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/wall/classify/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.parentId = data.wpClassify.parentId
                this.dataForm.classifyName = data.wpClassify.classifyName
                this.dataForm.classifyPic = data.wpClassify.classifyPic
                this.dataForm.orderNo = data.wpClassify.orderNo
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
              url: this.$http.adornUrl(`/wall/classify/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'parentId': this.dataForm.parentId,
                'classifyName': this.dataForm.classifyName,
                'classifyPic': this.dataForm.classifyPic,
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

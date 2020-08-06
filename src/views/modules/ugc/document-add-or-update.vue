<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户ID" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户ID"></el-input>
    </el-form-item>
    <el-form-item label="分类" prop="catagoryId">
      <el-input v-model="dataForm.catagoryId" placeholder="分类"></el-input>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="关键词" prop="keyword">
      <el-input v-model="dataForm.keyword" placeholder="关键词"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input v-model="dataForm.content" placeholder="内容"></el-input>
    </el-form-item>
    <el-form-item label="图片URL" prop="img">
      <el-input v-model="dataForm.img" placeholder="图片URL"></el-input>
    </el-form-item>
    <el-form-item label="预览图片" prop="imageFile">
      <el-input v-model="dataForm.imageFile" placeholder="预览图片"></el-input>
    </el-form-item>
    <el-form-item label="排序字段" prop="sortname">
      <el-input v-model="dataForm.sortname" placeholder="排序字段"></el-input>
    </el-form-item>
    <el-form-item label="点击次数" prop="clickcount">
      <el-input v-model="dataForm.clickcount" placeholder="点击次数"></el-input>
    </el-form-item>
    <el-form-item label="是否置顶" prop="showtop">
      <el-input v-model="dataForm.showtop" placeholder="是否置顶"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="发布时间" prop="publishTime">
      <el-input v-model="dataForm.publishTime" placeholder="发布时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="状态（0:未发布 1:发布）" prop="state">
      <el-input v-model="dataForm.state" placeholder="状态（0:未发布 1:发布）"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
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
          catagoryId: '',
          title: '',
          keyword: '',
          content: '',
          img: '',
          imageFile: '',
          sortname: '',
          clickcount: '',
          showtop: '',
          createTime: '',
          publishTime: '',
          updateTime: '',
          state: '',
          remark: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户ID不能为空', trigger: 'blur' }
          ],
          catagoryId: [
            { required: true, message: '分类不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          keyword: [
            { required: true, message: '关键词不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '图片URL不能为空', trigger: 'blur' }
          ],
          imageFile: [
            { required: true, message: '预览图片不能为空', trigger: 'blur' }
          ],
          sortname: [
            { required: true, message: '排序字段不能为空', trigger: 'blur' }
          ],
          clickcount: [
            { required: true, message: '点击次数不能为空', trigger: 'blur' }
          ],
          showtop: [
            { required: true, message: '是否置顶不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          publishTime: [
            { required: true, message: '发布时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '状态（0:未发布 1:发布）不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/ugc/document/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.document.userId
                this.dataForm.catagoryId = data.document.catagoryId
                this.dataForm.title = data.document.title
                this.dataForm.keyword = data.document.keyword
                this.dataForm.content = data.document.content
                this.dataForm.img = data.document.img
                this.dataForm.imageFile = data.document.imageFile
                this.dataForm.sortname = data.document.sortname
                this.dataForm.clickcount = data.document.clickcount
                this.dataForm.showtop = data.document.showtop
                this.dataForm.createTime = data.document.createTime
                this.dataForm.publishTime = data.document.publishTime
                this.dataForm.updateTime = data.document.updateTime
                this.dataForm.state = data.document.state
                this.dataForm.remark = data.document.remark
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
              url: this.$http.adornUrl(`/ugc/document/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userId': this.dataForm.userId,
                'catagoryId': this.dataForm.catagoryId,
                'title': this.dataForm.title,
                'keyword': this.dataForm.keyword,
                'content': this.dataForm.content,
                'img': this.dataForm.img,
                'imageFile': this.dataForm.imageFile,
                'sortname': this.dataForm.sortname,
                'clickcount': this.dataForm.clickcount,
                'showtop': this.dataForm.showtop,
                'createTime': this.dataForm.createTime,
                'publishTime': this.dataForm.publishTime,
                'updateTime': this.dataForm.updateTime,
                'state': this.dataForm.state,
                'remark': this.dataForm.remark
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

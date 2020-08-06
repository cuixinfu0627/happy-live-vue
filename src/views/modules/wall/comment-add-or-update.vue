<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户ID" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户ID"></el-input>
    </el-form-item>
    <el-form-item label="壁纸ID" prop="wallpaperId">
      <el-input v-model="dataForm.wallpaperId" placeholder="壁纸ID"></el-input>
    </el-form-item>
    <el-form-item label="评论内容" prop="comment">
      <el-input v-model="dataForm.comment" placeholder="评论内容"></el-input>
    </el-form-item>
    <el-form-item label="评论时间" prop="commentTime">
      <el-input v-model="dataForm.commentTime" placeholder="评论时间"></el-input>
    </el-form-item>
    <el-form-item label="回复内容" prop="reply">
      <el-input v-model="dataForm.reply" placeholder="回复内容"></el-input>
    </el-form-item>
    <el-form-item label="回复时间" prop="replyTime">
      <el-input v-model="dataForm.replyTime" placeholder="回复时间"></el-input>
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
          wallpaperId: '',
          comment: '',
          commentTime: '',
          reply: '',
          replyTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户ID不能为空', trigger: 'blur' }
          ],
          wallpaperId: [
            { required: true, message: '壁纸ID不能为空', trigger: 'blur' }
          ],
          comment: [
            { required: true, message: '评论内容不能为空', trigger: 'blur' }
          ],
          commentTime: [
            { required: true, message: '评论时间不能为空', trigger: 'blur' }
          ],
          reply: [
            { required: true, message: '回复内容不能为空', trigger: 'blur' }
          ],
          replyTime: [
            { required: true, message: '回复时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/wall/comment/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.wpWallpaperComment.userId
                this.dataForm.wallpaperId = data.wpWallpaperComment.wallpaperId
                this.dataForm.comment = data.wpWallpaperComment.comment
                this.dataForm.commentTime = data.wpWallpaperComment.commentTime
                this.dataForm.reply = data.wpWallpaperComment.reply
                this.dataForm.replyTime = data.wpWallpaperComment.replyTime
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
              url: this.$http.adornUrl(`/wall/comment/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userId': this.dataForm.userId,
                'wallpaperId': this.dataForm.wallpaperId,
                'comment': this.dataForm.comment,
                'commentTime': this.dataForm.commentTime,
                'reply': this.dataForm.reply,
                'replyTime': this.dataForm.replyTime
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

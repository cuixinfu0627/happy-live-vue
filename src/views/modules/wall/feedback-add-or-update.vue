<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="问题单号" prop="number">
      <el-input v-model="dataForm.number" placeholder="问题单号"></el-input>
    </el-form-item>
    <el-form-item label="服务类型：1账号问题，2项目问题,3交易问题，4建议反馈" prop="type">
      <el-input v-model="dataForm.type" placeholder="服务类型：1账号问题，2项目问题,3交易问题，4建议反馈"></el-input>
    </el-form-item>
    <el-form-item label="问题对象id" prop="targetId">
      <el-input v-model="dataForm.targetId" placeholder="问题对象id"></el-input>
    </el-form-item>
    <el-form-item label="目标对象" prop="targetObj">
      <el-input v-model="dataForm.targetObj" placeholder="目标对象"></el-input>
    </el-form-item>
    <el-form-item label="提交人" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="提交人"></el-input>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="dataForm.description" placeholder="描述"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="联系手机号" prop="tel">
      <el-input v-model="dataForm.tel" placeholder="联系手机号"></el-input>
    </el-form-item>
    <el-form-item label="l联系邮箱" prop="email">
      <el-input v-model="dataForm.email" placeholder="l联系邮箱"></el-input>
    </el-form-item>
    <el-form-item label="反馈图片" prop="image">
      <el-input v-model="dataForm.image" placeholder="反馈图片"></el-input>
    </el-form-item>
    <el-form-item label="回复内容" prop="reply">
      <el-input v-model="dataForm.reply" placeholder="回复内容"></el-input>
    </el-form-item>
    <el-form-item label="处理人id" prop="replyUserId">
      <el-input v-model="dataForm.replyUserId" placeholder="处理人id"></el-input>
    </el-form-item>
    <el-form-item label="用户评价:1满意，2不满意,3待评价" prop="appraise">
      <el-input v-model="dataForm.appraise" placeholder="用户评价:1满意，2不满意,3待评价"></el-input>
    </el-form-item>
    <el-form-item label="评价时间" prop="appraiseTime">
      <el-input v-model="dataForm.appraiseTime" placeholder="评价时间"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="回复时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="回复时间"></el-input>
    </el-form-item>
    <el-form-item label="状态:1待处理，2处理中，3已处理" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态:1待处理，2处理中，3已处理"></el-input>
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
          number: '',
          type: '',
          targetId: '',
          targetObj: '',
          userId: '',
          title: '',
          description: '',
          remark: '',
          tel: '',
          email: '',
          image: '',
          reply: '',
          replyUserId: '',
          appraise: '',
          appraiseTime: '',
          createTime: '',
          updateTime: '',
          status: ''
        },
        dataRule: {
          number: [
            { required: true, message: '问题单号不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '服务类型：1账号问题，2项目问题,3交易问题，4建议反馈不能为空', trigger: 'blur' }
          ],
          targetId: [
            { required: true, message: '问题对象id不能为空', trigger: 'blur' }
          ],
          targetObj: [
            { required: true, message: '目标对象不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '提交人不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '联系手机号不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'l联系邮箱不能为空', trigger: 'blur' }
          ],
          image: [
            { required: true, message: '反馈图片不能为空', trigger: 'blur' }
          ],
          reply: [
            { required: true, message: '回复内容不能为空', trigger: 'blur' }
          ],
          replyUserId: [
            { required: true, message: '处理人id不能为空', trigger: 'blur' }
          ],
          appraise: [
            { required: true, message: '用户评价:1满意，2不满意,3待评价不能为空', trigger: 'blur' }
          ],
          appraiseTime: [
            { required: true, message: '评价时间不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '回复时间不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态:1待处理，2处理中，3已处理不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/wall/feedback/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.number = data.wpFeedback.number
                this.dataForm.type = data.wpFeedback.type
                this.dataForm.targetId = data.wpFeedback.targetId
                this.dataForm.targetObj = data.wpFeedback.targetObj
                this.dataForm.userId = data.wpFeedback.userId
                this.dataForm.title = data.wpFeedback.title
                this.dataForm.description = data.wpFeedback.description
                this.dataForm.remark = data.wpFeedback.remark
                this.dataForm.tel = data.wpFeedback.tel
                this.dataForm.email = data.wpFeedback.email
                this.dataForm.image = data.wpFeedback.image
                this.dataForm.reply = data.wpFeedback.reply
                this.dataForm.replyUserId = data.wpFeedback.replyUserId
                this.dataForm.appraise = data.wpFeedback.appraise
                this.dataForm.appraiseTime = data.wpFeedback.appraiseTime
                this.dataForm.createTime = data.wpFeedback.createTime
                this.dataForm.updateTime = data.wpFeedback.updateTime
                this.dataForm.status = data.wpFeedback.status
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
              url: this.$http.adornUrl(`/wall/feedback/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'number': this.dataForm.number,
                'type': this.dataForm.type,
                'targetId': this.dataForm.targetId,
                'targetObj': this.dataForm.targetObj,
                'userId': this.dataForm.userId,
                'title': this.dataForm.title,
                'description': this.dataForm.description,
                'remark': this.dataForm.remark,
                'tel': this.dataForm.tel,
                'email': this.dataForm.email,
                'image': this.dataForm.image,
                'reply': this.dataForm.reply,
                'replyUserId': this.dataForm.replyUserId,
                'appraise': this.dataForm.appraise,
                'appraiseTime': this.dataForm.appraiseTime,
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

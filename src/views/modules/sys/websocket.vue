<template>
  <div>
    <el-card>
      <el-tag type="success"> <h1>测试WebSocket 消息弹框的接收和发送</h1></el-tag>
      <br>
      <br>
      <el-button type="success" @click="sendMessage(1)">单发消息</el-button>
      <el-button type="success" @click="sendMessage(2)">群发消息</el-button>
      <el-button type="success" @click="sendMessage(3)">对象消息</el-button>
      <el-button type="warning" @click="receiveMessage">查看测试请求接口[F12-查看]</el-button>
    </el-card>
    <el-dialog title="发送服务消息" :visible.sync="dialogFormVisible" width="40%" center>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.title" style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="5" v-model="ruleForm.content" style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认发送</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>

  export default {
    components: {

    },
    data () {
      return {
        sendType: 1,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        ruleForm: {
          userId: 123456,
          title: '',
          content: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入模板标题', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入消息内容', trigger: 'blur' }
          ]
        },
      }
    },
    mounted () {
      // WebSocket 页面创建生命周期函数
      if ('WebSocket' in window) {
        this.websocket = new WebSocket('ws://localhost:8807/websocket/' + this.ruleForm.userId)
        this.initWebSocket()
      } else {
        alert('当前浏览器 Not support websocket')
      }
    },
    beforeDestroy() {
      this.onbeforeunload()
    },
    methods: {
      sendMessage (val) {
        this.sendType = val
        this.dialogFormVisible = true
      },
      /**
       * 发送消息
       * @param formName
       */
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.sendType == 1){
              this.dialogFormVisible = true
              this.$http({
                url: this.$http.adornUrl('/sys/websocket/sendMessageByUserId'),
                method: 'post',
                params: this.$http.adornParams(this.ruleForm)
              }).then(({data}) => {
                if (data && data.code === 0) {

                } else {
                }
                this.dialogFormVisible = false
              })
            }else if (this.sendType == 2){
              this.dialogFormVisible = true
              this.$http({
                url: this.$http.adornUrl('/sys/websocket/sendMessageAll'),
                method: 'post',
                params: this.$http.adornParams(this.ruleForm)
              }).then(({data}) => {
                if (data && data.code === 0) {

                } else {
                }
                this.dialogFormVisible = false
              })
            }else if (this.sendType == 3){
              this.dialogFormVisible = true
              this.$http({
                url: this.$http.adornUrl('/sys/websocket/sendMessageObject'),
                method: 'get',
                params: this.$http.adornParams(this.ruleForm)
              }).then(({data}) => {
                if (data && data.code === 0) {

                } else {
                }
                this.dialogFormVisible = false
              })
            }
          }
        })
      },
      receiveMessage() {
        console.log("-群发消息-")
        console.log("http://xf-admin.zhxf.ltd/apiAdmin/socket/sendAllWebSocket")
        console.log("-单发消息-")
        console.log("http://xf-admin.zhxf.ltd/apiAdmin/socket/sendOneWebSocket/123456")
        console.log("-对象消息-")
        console.log("http://xf-admin.zhxf.ltd/apiAdmin/socket/sendMessageObject?userId=123456")
      },
      //WebSocket-初始化Websocket
      initWebSocket () {
        // 连接错误
        this.websocket.onerror = this.setErrorMessage

        // 连接成功
        this.websocket.onopen = this.setOnopenMessage

        // 收到消息的回调
        this.websocket.onmessage = this.setOnmessageMessage

        // 连接关闭的回调
        this.websocket.onclose = this.setOncloseMessage

        // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = this.onbeforeunload
      },
      setErrorMessage () {
        console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
      },
      setOnopenMessage () {
        console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
      },
      setOnmessageMessage (event) {
        // 根据服务器推送的消息做自己的业务处理
        console.log('服务端返回：' + event.data)
        const h = this.$createElement;
        let message = this.$message({
          type: 'success',
          message: h('p', null, [
            h('span', null, '接收到服务端新的消息:'),
            h('i', { style: 'color: teal' }, event.data),
          ]),
          duration:6000
        })
        //消息点击事件
        message.$el.querySelector('span').onclick = () => {
          this.$router.push('/home')
        }
      },

      setOncloseMessage () {
        console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
      },
      onbeforeunload () {
        this.closeWebSocket()
      },
      closeWebSocket () {
        this.websocket.close()
      }
    },
  }
</script>

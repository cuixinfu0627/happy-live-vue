<template>
  <div>
    <el-card>
      <el-tag type="success"> <h1>测试webSocket</h1></el-tag>
      <br>
      <br>
      <el-button type="success" @click="sendMessage">发送消息</el-button>
      <el-button type="warning" @click="receiveMessage">接收推送消息</el-button>

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

  import {socketSendMessage} from '@/api/message/message/message'

  export default {
    components: {

    },
    data () {
      return {
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
        this.websocket = new WebSocket('ws://api.live.xingfu999.com/websocket/' + this.ruleForm.userId)
        this.initWebSocket()
      } else {
        alert('当前浏览器 Not support websocket')
      }
    },
    beforeDestroy() {
      this.onbeforeunload()
    },
    methods: {
      sendMessage () {
        this.dialogFormVisible = true
      },
      /**
       * 发送消息
       * @param formName
       */
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            socketSendMessage(this.ruleForm).then(data => {
              this.dialogFormVisible = false
              if (data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '发送成功!'+data.message
                })
                this.resetForm(formName)
              } else {
                this.$message({
                  type: 'error',
                  message: data.message
                })
                this.resetForm(formName)
              }
            }).catch(data => {
              this.dialogFormVisible = false
            })
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      receiveMessage() {
        //http://xf-admin.zhxf.ltd/apiAdmin/socket/sendOneWebSocket/123456
        //http://xf-admin.zhxf.ltd/apiAdmin/socket/sendAllWebSocket
        console.log("http://api.live.xingfu999.com/socket/sendAllWebSocket")
        console.log("http://api.live.xingfu999.com/socket/sendOneWebSocket/123456")
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
          this.$router.push('/message/socket')
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

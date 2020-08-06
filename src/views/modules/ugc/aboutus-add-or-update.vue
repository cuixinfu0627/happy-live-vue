<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="公司介绍" prop="introduce">
      <el-input v-model="dataForm.introduce" placeholder="公司介绍"></el-input>
    </el-form-item>
    <el-form-item label="企业文化" prop="culture">
      <el-input v-model="dataForm.culture" placeholder="企业文化"></el-input>
    </el-form-item>
    <el-form-item label="客户价值" prop="value">
      <el-input v-model="dataForm.value" placeholder="客户价值"></el-input>
    </el-form-item>
    <el-form-item label="公司风采" prop="appearance">
      <el-input v-model="dataForm.appearance" placeholder="公司风采"></el-input>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="地址"></el-input>
    </el-form-item>
    <el-form-item label="联系人" prop="linkman">
      <el-input v-model="dataForm.linkman" placeholder="联系人"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="dataForm.phone" placeholder="电话"></el-input>
    </el-form-item>
    <el-form-item label="座机" prop="telephone">
      <el-input v-model="dataForm.telephone" placeholder="座机"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
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
          introduce: '',
          culture: '',
          value: '',
          appearance: '',
          address: '',
          linkman: '',
          phone: '',
          telephone: '',
          email: '',
          remark: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          introduce: [
            { required: true, message: '公司介绍不能为空', trigger: 'blur' }
          ],
          culture: [
            { required: true, message: '企业文化不能为空', trigger: 'blur' }
          ],
          value: [
            { required: true, message: '客户价值不能为空', trigger: 'blur' }
          ],
          appearance: [
            { required: true, message: '公司风采不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ],
          linkman: [
            { required: true, message: '联系人不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '电话不能为空', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '座机不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/ugc/aboutus/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.introduce = data.aboutUs.introduce
                this.dataForm.culture = data.aboutUs.culture
                this.dataForm.value = data.aboutUs.value
                this.dataForm.appearance = data.aboutUs.appearance
                this.dataForm.address = data.aboutUs.address
                this.dataForm.linkman = data.aboutUs.linkman
                this.dataForm.phone = data.aboutUs.phone
                this.dataForm.telephone = data.aboutUs.telephone
                this.dataForm.email = data.aboutUs.email
                this.dataForm.remark = data.aboutUs.remark
                this.dataForm.createTime = data.aboutUs.createTime
                this.dataForm.updateTime = data.aboutUs.updateTime
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
              url: this.$http.adornUrl(`/ugc/aboutus/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'introduce': this.dataForm.introduce,
                'culture': this.dataForm.culture,
                'value': this.dataForm.value,
                'appearance': this.dataForm.appearance,
                'address': this.dataForm.address,
                'linkman': this.dataForm.linkman,
                'phone': this.dataForm.phone,
                'telephone': this.dataForm.telephone,
                'email': this.dataForm.email,
                'remark': this.dataForm.remark,
                'createTime': this.dataForm.createTime,
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

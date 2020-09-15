<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="上传人id" prop="userId">
        <el-input v-model="dataForm.userId" placeholder="上传人id"></el-input>
      </el-form-item>
      <el-form-item label="一级分类" prop="classifyA">
        <el-input v-model="dataForm.classifyA" placeholder="一级分类"></el-input>
      </el-form-item>
      <el-form-item label="二级分类" prop="classifyB">
        <el-input v-model="dataForm.classifyB" placeholder="二级分类"></el-input>
      </el-form-item>
      <!--    <el-form-item label="图片地址" prop="picUrl">-->
      <!--      <el-input v-model="dataForm.picUrl" placeholder="图片地址"></el-input>-->
      <!--    </el-form-item>-->
      <el-form-item label="商品图片:" prop="image">
        <div class="myhead">
          <el-tooltip content="点击上传Logo" placement="top">
            <el-image style="width: 300px; height: 150px" :src="dataForm.picUrl" fit="contain" @click="uploadHandle()"
                      alt=""/>
          </el-tooltip>
        </div>
      </el-form-item>
      <el-form-item label="是否上架 0未审核1上架2下架3审核未通过" prop="isShelve">
        <el-input v-model="dataForm.isShelve" placeholder="是否上架 0未审核1上架2下架3审核未通过"></el-input>
      </el-form-item>
      <el-form-item label="是否推荐 1推荐0不推荐" prop="isRecommend">
        <el-input v-model="dataForm.isRecommend" placeholder="是否推荐 1推荐0不推荐"></el-input>
      </el-form-item>
      <el-form-item label="上架时间" prop="shelvedate">
        <el-input v-model="dataForm.shelvedate" placeholder="上架时间"></el-input>
      </el-form-item>
      <el-form-item label="上传时间" prop="creatdate">
        <el-input v-model="dataForm.creatdate" placeholder="上传时间"></el-input>
      </el-form-item>
      <el-form-item label="点击量" prop="clickNum">
        <el-input v-model="dataForm.clickNum" placeholder="点击量"></el-input>
      </el-form-item>
      <el-form-item label="收藏量" prop="collectionNum">
        <el-input v-model="dataForm.collectionNum" placeholder="收藏量"></el-input>
      </el-form-item>
      <el-form-item label="下载量" prop="downloadNum">
        <el-input v-model="dataForm.downloadNum" placeholder="下载量"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-input v-model="dataForm.label" placeholder="标签"></el-input>
      </el-form-item>
      <el-form-item label="分辨率类型 1.18:9 2.16:9" prop="ratioLx">
        <el-input v-model="dataForm.ratioLx" placeholder="分辨率类型 1.18:9 2.16:9"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    <!-- 弹窗, 上传文件 -->
    <wallpaper-upload-image v-if="uploadVisible" ref="itemUploadImage"
                            @refreshDataList="refreshFileUrl"></wallpaper-upload-image>
  </el-dialog>
</template>

<script>

  // 文件上传
  import WallpaperUploadImage from './wallpaper-upload-image'

  export default {
    data() {
      return {
        visible: false,
        dataForm: {
          id: 0,
          userId: '',
          classifyA: '',
          classifyB: '',
          picUrl: '',
          isShelve: '',
          isRecommend: '',
          shelvedate: '',
          creatdate: '',
          clickNum: '',
          collectionNum: '',
          downloadNum: '',
          label: '',
          ratioLx: ''
        },
        dataRule: {
          userId: [
            {required: true, message: '上传人id不能为空', trigger: 'blur'}
          ],
          classifyA: [
            {required: true, message: '一级分类不能为空', trigger: 'blur'}
          ],
          classifyB: [
            {required: true, message: '二级分类不能为空', trigger: 'blur'}
          ],
          picUrl: [
            {required: true, message: '图片地址不能为空', trigger: 'blur'}
          ],
          isShelve: [
            {required: true, message: '是否上架 0未审核1上架2下架3审核未通过不能为空', trigger: 'blur'}
          ],
          isRecommend: [
            {required: true, message: '是否推荐 1推荐0不推荐不能为空', trigger: 'blur'}
          ],
          shelvedate: [
            {required: true, message: '上架时间不能为空', trigger: 'blur'}
          ],
          creatdate: [
            {required: true, message: '上传时间不能为空', trigger: 'blur'}
          ],
          clickNum: [
            {required: true, message: '点击量不能为空', trigger: 'blur'}
          ],
          collectionNum: [
            {required: true, message: '收藏量不能为空', trigger: 'blur'}
          ],
          downloadNum: [
            {required: true, message: '下载量不能为空', trigger: 'blur'}
          ],
          label: [
            {required: true, message: '标签不能为空', trigger: 'blur'}
          ],
          ratioLx: [
            {required: true, message: '分辨率类型 1.18:9 2.16:9不能为空', trigger: 'blur'}
          ]
        },
        /** 上传单位Logo相关**/
        uploadVisible: false,
      }
    },
    components: {
      WallpaperUploadImage
    },
    methods: {
      init(id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/wall/wallpaper/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.wpWallpaper.userId
                this.dataForm.classifyA = data.wpWallpaper.classifyA
                this.dataForm.classifyB = data.wpWallpaper.classifyB
                this.dataForm.picUrl = data.wpWallpaper.picUrl
                this.dataForm.isShelve = data.wpWallpaper.isShelve
                this.dataForm.isRecommend = data.wpWallpaper.isRecommend
                this.dataForm.shelvedate = data.wpWallpaper.shelvedate
                this.dataForm.creatdate = data.wpWallpaper.creatdate
                this.dataForm.clickNum = data.wpWallpaper.clickNum
                this.dataForm.collectionNum = data.wpWallpaper.collectionNum
                this.dataForm.downloadNum = data.wpWallpaper.downloadNum
                this.dataForm.label = data.wpWallpaper.label
                this.dataForm.ratioLx = data.wpWallpaper.ratioLx
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/wall/wallpaper/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userId': this.dataForm.userId,
                'classifyA': this.dataForm.classifyA,
                'classifyB': this.dataForm.classifyB,
                'picUrl': this.dataForm.picUrl,
                'isShelve': this.dataForm.isShelve,
                'isRecommend': this.dataForm.isRecommend,
                'shelvedate': this.dataForm.shelvedate,
                'creatdate': this.dataForm.creatdate,
                'clickNum': this.dataForm.clickNum,
                'collectionNum': this.dataForm.collectionNum,
                'downloadNum': this.dataForm.downloadNum,
                'label': this.dataForm.label,
                'ratioLx': this.dataForm.ratioLx
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
      },
      // 上传文件
      uploadHandle() {
        this.uploadVisible = true
        this.$nextTick(() => {
          this.$refs.wllpaperUploadImage.init()
        })
      },
      // 上传文件
      refreshFileUrl(filePath) {
        this.dataForm.picUrl = filePath
        this.uploadVisible = false
      },
    }
  }
</script>

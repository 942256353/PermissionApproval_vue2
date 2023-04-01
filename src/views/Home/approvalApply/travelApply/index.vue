<template>
  <div class="about">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h4>差旅申请</h4>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="申请人" prop="applicant">
          <el-select
            v-model="ruleForm.applicant"
            placeholder="请选择申请人"
            style="width: 100%"
          >
            <el-option
              v-for="v in user"
              :key="v.id"
              :label="v.account"
              :value="v.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="申请时间" prop="created">
          <el-date-picker
            v-model="ruleForm.created"
            style="width: 100%"
            type="datetime"
            placeholder="请选择申请时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="出差天数" prop="travel_days">
          <el-input-number
            v-model="ruleForm.travel_days"
            :min="1"
            :max="100"
            label="出差天数"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="报销金额" prop="money">
          <el-input
            type="number"
            min="1"
            placeholder="请输入报销金额"
            v-model="ruleForm.money"
          ></el-input>
        </el-form-item>
        <!-- http-request:覆盖默认的上传行为，可以自定义上传的实现  on-exceed:文件超出个数限制时的钩子-->
        <el-form-item label="上传发票" prop="bill">
          <el-upload
            class="upload-demo"
            action=""
            :http-request="uploadFile"
            multiple
            :limit="limitPic"
            :on-exceed="handleEcxeed"
            :before-upload="beforeUpload"
            :on-remove="onRemove"
            list-type="picture"
            style="width: 400px"
          >
            <el-button size="small" type="primary"
              >点击上传<i class="el-icon-upload"></i
            ></el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传{{ typePic }}文件，且不超过2MB
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="出差城市" prop="destination">
          <el-cascader
            v-model="ruleForm.destination"
            placeholder="请选择出差城市"
            :options="areaData"
            style="width: 100%"
          ></el-cascader>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" v-no-more-click
            >立即申请</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getEmployee, submitTravelApply, getArea } from "@/api/api";
export default {
  data() {
    return {
      user: [],
      areaData: [],
      limitPic: 1,
      typePic: "jpeg/png",
      ruleForm: {
        applicant: "",
        created: "",
        destination: [],
        travel_days: 1,
        money: "",
        bill: [],
      },
      rules: {
        applicant: [
          { required: true, message: "请选择申请人", trigger: "change" },
        ],
        created: [
          { required: true, message: "请选择申请时间", trigger: "change" },
        ],
        destination: [
          { required: true, message: "请选择出差城市", trigger: "change" },
        ],
        travel_days: [
          { required: true, message: "请选择出差天数", trigger: "blur" },
        ],
        money: [{ required: true, message: "请输入报销金额", trigger: "blur" }],
        bill: [{ required: true, message: "请上传发票", trigger: "change" }],
      },
    };
  },
  mounted() {
    this.getEmployeeData();
    this.getAreaData();
  },
  methods: {
    async getEmployeeData() {
      let res = await getEmployee();
      let { code, data, msg } = res.data;
      if (code === 20000) {
        this.user = data;
      } else {
        this.$notify.error({
          title: "员工数据获取失败",
          message: msg,
        });
      }
    },
    async getAreaData() {
      let res = await getArea();
      let { code, data, msg } = res.data;
      if (code === 20000 && data.length > 0) {
        this.areaData = this.dataFilter(data);
      } else {
        this.$notify.error({
          title: "省市数据获取失败",
          message: msg,
        });
      }
    },
    uploadFile(params) {
      //覆盖默认的上传行为，可以自定义上传的实现
      //暂存
       this.ruleForm.bill = params.file;
    },
    handleEcxeed() {
      //文件超出个数限制时的钩子
      this.$message({
        message: `最多可以上传${this.limitPic}张图片`,
        type: "warning",
        duration: 2000,
      });
    },
    beforeUpload(file) {
      //上传文件之前的钩子，参数为上传的文件 限制上传的格式或大小
      const isJPGOrPNG = file.type == "image/jpeg" || file.type == "image/png";
      const isSize = file.size / 2024 / 1024 <= 2;
      if (!isJPGOrPNG) {
        this.$message({
          message: `只能上传${this.typePic}格式文件`,
          type: "warning",
          duration: 2000,
        });
      }
      if (!isSize) {
        this.$message({
          message: `上传文件大小不能超过2MB`,
          type: "warning",
          duration: 2000,
        });
      }
      return isJPGOrPNG && isSize;
    },
    dataFilter(data) {
      let res = data.map((v) => ({
        label: v.AreaName,
        value: v.AreaName,
        ...v,
      }));
      let root = [];
      res.forEach((item) => {
        if (item.ParentId === 1) {
          root.push({ ...item, children: [] });
        }
      });
      this.createTree(root, res);
      return root;
    },
    createTree(pData, arr) {
      for (let i = 0; i < pData.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (pData[i].AreaID === arr[j].ParentId) {
            if (pData[i].AreaLevel >= 2) {
              pData[i].children.push({ ...arr[j] });
            } else {
              pData[i].children.push({ ...arr[j], children: [] });
            }
          }
        }
        if (pData[i].children) {
          this.createTree(pData[i].children, arr);
        }
      }
    },
    submitForm(formName) {
      let formdata = new FormData();
      for (let k in this.ruleForm) {
        if(k==='destination'){
          this.ruleForm['destination'] = this.ruleForm['destination'].join(',');
        }
        formdata.append(k, this.ruleForm[k]);
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await submitTravelApply(formdata);
          let { code, msg } = res.data;
          if (code === 20000) {
            this.$notify({
              title: "提交成功",
              message: msg,
              type: "success",
              duration: 2000,
            });
            this.$router.push("/approvalManage/travelManage");
          } else {
            this.$notify.error({
              title: "提交失败",
              message: msg,
            });
          }
        } else {
          this.$notify({
            title: "温馨提示",
            message: "请完善表单信息",
            type: "warning",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onRemove(file, fileList){
      this.ruleForm.bill = '';
    }
  },
};
</script>



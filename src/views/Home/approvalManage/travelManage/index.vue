<template>
  <div class="about">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h4>差旅审批</h4>
      </div>
      <div class="filter-container">
        <el-input
          v-model="listQuery.name"
          prefix-icon="el-icon-search"
          placeholder="请输入用户名"
          class="filter-item"
          size="miedium"
          @input="debouncedClick"
        >
        </el-input>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        :default-sort="{ prop: 'created', order: 'descending' }"
        max-height="800"
      >
        <el-table-column flxed type="index" label="序号"> </el-table-column>
        <el-table-column
          flxed
          prop="account"
          label="申请人"
          column-key="account"
        >
        </el-table-column>
        <el-table-column
          flxed
          prop="created"
          label="申请时间"
          column-key="created"
          sortable
          :filters="filterDate(tableData, this)"
          :filter-method="filterHandler"
        >
          <template slot-scope="{ row }">
            {{ row.created | formatDateTime }}
          </template>
        </el-table-column>
        <el-table-column
          flxed
          prop="destination"
          label="出差城市"
          column-key="destination"
        >
          <!-- <template slot-scope="{ row }">
            {{ getGoodsName[row.apply_goods] || row.apply_goods }}
          </template> -->
        </el-table-column>
        <el-table-column flxed prop="money" label="报销金额" column-key="money">
        </el-table-column>
        <el-table-column
          flxed
          prop="travel_days"
          label="出差天数"
          column-key="travel_days"
        >
        </el-table-column>
        <el-table-column flxed prop="bill" label="发票文件" column-key="bill">
          <template slot-scope="{ row }">
            <el-image
              style="width: 40px; height: 40px"
              :src="row.bill"
              fit="cover"
              :preview-src-list="[row.bill]"
              ><div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          flxed
          prop="status"
          label="审批状态"
          width="100"
          :filters="filterStatus(tableData, this)"
          :filter-method="filterHandler"
        >
          <template slot-scope="{ row }">
            <el-tag :type="row.status | statusStyle">
              {{ row.status | statusFilter }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              :disabled="scope.row.status | btnController"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.status | btnDelController"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="success"
              :disabled="scope.row.status | btnController"
              @click="handleSubmit(scope.$index, scope.row)"
              v-no-more-click
              >提交</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Dialog
        dialogTitle="删除"
        btnTitle="删除"
        :visible.sync="dialogDelVisible"
        @confirm="delData"
        ><span>确定删除？</span></Dialog
      >
      <Dialog
        dialogTitle="编辑"
        btnTitle="提交"
        :visible.sync="dialogUpdVisible"
        @confirm="updateData"
      >
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
              disabled
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
              style="width: 100%"
              :file-list="fileList"
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
        </el-form>
      </Dialog>
      <my-pagination
        :total="rows"
        :page.sync="listQuery.pageNo"
        :sizes.sync="listQuery.pageSize"
        @action="getList"
      />
    </el-card>
  </div>
</template>
<script>
import {
  travelList,
  submitTravelApply,
  delTravelManage,
  submitTravelManage,
  getEmployee,
  getArea,
} from "@/api/api";
import {
  debounce,
  filterStatus,
  filterDate,
  tableRowClassName,
  filterHandler,
} from "@/utils/function";
import Dialog from "@/components/dialog.vue";
export default {
  components: { Dialog },
  data() {
    return {
      filterDate,
      filterStatus,
      tableRowClassName,
      filterHandler,
      tableData: [],
      user: [],
      areaData: [],
      limitPic: 1,
      typePic: "jpeg/png",
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        name: "",
      },
      rows: 0, //总条数
      debouncedClick: null,
      dialogDelVisible: false,
      dialogUpdVisible: false,
      temp: {},
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
      fileList: [],
    };
  },
  mounted() {
    this.getList();
    this.getAreaData();
    this.debouncedClick = debounce(this.getList, 1500); //防抖
  },
  unmounted() {
    // 移除组件时，取消定时器
    this.debouncedClick.cancel();
  },
  methods: {
    async getEmployeeData() {
      let res = await getEmployee();
      let { code, data } = res.data;
      if (code === 20000) {
        this.user = data;
      }
    },
    async getList() {
      let res = await travelList(this.listQuery);
      let { code, data, msg } = res.data;
      if (code === 20000) {
        this.tableData = data.list;
        if (this.tableData.length > 0) {
          this.tableData.forEach(
            (v) => (v.bill = process.env.VUE_APP_protalurl + v.bill_path)
          );
        }
        this.rows = data.rows;
      } else {
        this.$notify.error({
          title: "列表获取失败",
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
    handleEdit(index, row) {
      this.ruleForm = { ...row };
      this.ruleForm["destination"] = this.ruleForm["destination"].split(",");
      if (!this.fileList.length > 0) {
        this.fileList.push({ uid:1,url: this.ruleForm["bill"] });
      }
      this.dialogUpdVisible = true;
    },
    //编辑数据
    async updateData() {
      let formdata = new FormData();
      for (let k in this.ruleForm) {
        if (k === "destination") {
          this.ruleForm["destination"] = this.ruleForm["destination"].join(",");
        }
        formdata.append(k, this.ruleForm[k]);
      }
      this.$refs["ruleForm"].validate(async (valid) => {
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
            this.dialogUpdVisible = false;
            this.getList();
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
    //删除
    handleDelete(index, row) {
      this.dialogDelVisible = true;
      this.temp = { ...row };
    },
    //提交删除
    async delData() {
      let res = await delTravelManage(this.temp.id);
      let { code, msg } = res.data;
      if (code === 20000) {
        this.$notify.success({
          title: "删除成功",
          message: msg,
        });
        this.dialogDelVisible = false;
        this.getList();
      } else {
        this.$notify.error({
          title: "删除失败",
          message: msg,
        });
      }
    },
    async handleSubmit(indx, row) {
      let res = await submitTravelManage({ id: row.id });
      let { code, data, msg } = res.data;
      if (code === 20000) {
        this.$notify.success({
          title: "提交成功",
          message: msg,
        });
        this.getList();
      } else {
        this.$notify.error({
          title: "提交失败",
          message: msg,
        });
      }
    },
    onRemove(file, fileList) {
      this.ruleForm.bill = "";
    },
  },
};
</script>



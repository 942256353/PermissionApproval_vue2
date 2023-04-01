<template>
  <div class="about">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h4>办公审批</h4>
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
        max-height="690"
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
          prop="apply_goods"
          label="商品名称"
          column-key="apply_goods"
        >
          <template slot-scope="{ row }">
            {{ getGoodsName[row.apply_goods] || row.apply_goods }}
          </template>
        </el-table-column>
        <el-table-column
          flxed
          prop="apply_goods_num"
          label="申请数量"
          column-key="apply_goods_num"
        >
        </el-table-column>
        <el-table-column
          flxed
          prop="apply_reason"
          label="申请原因"
          column-key="apply_reason"
        >
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
              :disabled="scope.row.status | btnController"
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
              placeholder="请选择申请时间"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="申请商品" prop="apply_goods">
            <el-select
              v-model="ruleForm.apply_goods"
              placeholder="请选择申请商品"
              style="width: 100%"
            >
              <el-option
                v-for="v in office"
                :key="v.key"
                :label="v.goodsName"
                :value="v.key"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="申请数量" prop="apply_goods_num">
            <el-input-number
              v-model="ruleForm.apply_goods_num"
              :min="1"
              :max="100"
              label="申请数量"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="申请原因" prop="apply_reason">
            <el-input
              type="textarea"
              placeholder="请输入申请原因"
              v-model="ruleForm.apply_reason"
            ></el-input>
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
  officeList,
  submitOfficeManage,
  delOfficeManage,
  submitOfficeApply,
  getEmployee
} from "@/api/api";
import { office } from "@/utils/selectData"; //公共数据
import { debounce, filterStatus, filterDate,tableRowClassName,filterHandler} from "@/utils/function";
import Dialog from "@/components/dialog.vue";
export default {
  components: { Dialog },
  data() {
    return {
      filterStatus,
      filterDate,
      tableRowClassName,
      filterHandler,
      office,
      user: [],
      tableData: [],
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
        apply_goods: "",
        apply_goods_num: 1,
        apply_reason: "",
      },
      rules: {
        applicant: [
          { required: true, message: "请选择申请人", trigger: "change" },
        ],
        created: [
          { required: true, message: "请选择申请时间", trigger: "blur" },
        ],
        apply_goods: [
          { required: true, message: "请选择申请商品", trigger: "change" },
        ],
        apply_goods_num: [
          { required: true, message: "请选择申请数量", trigger: "blur" },
        ],
        apply_reason: [
          { required: true, message: "请输入申请原因", trigger: "blur" },
        ],
      },
    };
  },
  // filters: {//局部组件过滤器
  //   statusFilter(val) {
  //     switch (val) {
  //       case 0:
  //         return "进阶初始";
  //       case 1:
  //         return "提交一审";
  //       case 2:
  //         return "一审通过";
  //       case 3:
  //         return "一审拒绝";
  //       case 4:
  //         return "提交二审";
  //       case 5:
  //         return "二审通过";
  //       case 6:
  //         return "二审拒绝";
  //       case 7:
  //         return "提交终审";
  //       case 8:
  //         return "终审通过";
  //       case 9:
  //         return "终审拒绝";
  //       case 10:
  //         return "审批完成";
  //       case 11:
  //         return "生成凭证";
  //       default:
  //         return val;
  //     }
  //   },
  //   statusStyle(val) {
  //     switch (val) {
  //       case 0:
  //         return "";
  //       case 1:
  //         return "";
  //       case 2:
  //         return "success";
  //       case 3:
  //         return "warning";
  //       case 4:
  //         return "";
  //       case 5:
  //         return "success";
  //       case 6:
  //         return "warning";
  //       case 7:
  //         return "";
  //       case 8:
  //         return "success";
  //       case 9:
  //         return "danger";
  //       case 10:
  //         return "success";
  //       case 11:
  //         return "info";
  //       default:
  //         return '';
  //     }
  //   },
  // },
  mounted() {
    this.getList();
    this.getEmployeeData();
    this.debouncedClick = debounce(this.getList, 1500); //防抖
  },
  unmounted() {
    // 移除组件时，取消定时器
    this.debouncedClick.cancel();
  },
  computed: {
    getGoodsName() {
      let obj = {};
      office.forEach((v) => (obj[v.key] = v.goodsName));
      return obj;
    },
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
      let res = await officeList(this.listQuery);
      let { code, data, msg } = res.data;
      if (code === 20000) {
        this.tableData = data.list;
        this.rows = data.rows;
      } else {
        this.$notify.error({
          title: "列表获取失败",
          message: msg,
        });
      }
    },
    async handleSubmit(index, row) {
      let res = await submitOfficeManage({ id: row.id });
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

    //删除
    handleDelete(index, row) {
      this.dialogDelVisible = true;
      this.temp = { ...row };
    },
    //提交删除
    async delData() {
      let res = await delOfficeManage(this.temp.id);
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
    handleEdit(index, row) {
      this.ruleForm = { ...row };
      this.dialogUpdVisible = true;
    },
    //编辑数据
    async updateData() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          let res = await submitOfficeApply(this.ruleForm);
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
  },
};
</script>


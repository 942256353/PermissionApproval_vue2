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
          prop="leave_days"
          label="请假天数"
          column-key="leave_days"
        >
        </el-table-column>
        <el-table-column
          flxed
          prop="leave_reason"
          label="请假原因"
          column-key="leave_reason"
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

          <el-form-item label="请假天数" prop="leave_days">
            <el-input-number
              v-model="ruleForm.leave_days"
              :min="1"
              :max="100"
              label="请假天数"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="请假原因" prop="leave_reason">
            <el-input
              type="textarea"
              placeholder="请输入请假原因"
              v-model="ruleForm.leave_reason"
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
leaveList;
import {
  leaveList,
  submitLeaveManage,
  delLeaveManage,
  submitLeaveApply,
  getEmployee,
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
      filterStatus,
      filterDate,
      tableRowClassName,
      filterHandler,
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
        leave_days: 1,
        leave_reason: "",
      },
      rules: {
        applicant: [
          { required: true, message: "请选择申请人", trigger: "change" },
        ],
        created: [
          { required: true, message: "请选择申请时间", trigger: "blur" },
        ],
        leave_days: [
          { required: true, message: "请选择请假天数", trigger: "blur" },
        ],
        leave_reason: [
          { required: true, message: "请输入申请原因", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getList();
    this.getEmployeeData();
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
      let res = await leaveList(this.listQuery);
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
    //编辑
    handleEdit(index, row) {
      this.ruleForm = { ...row };
      this.dialogUpdVisible = true;
    },
    //编辑数据
    async updateData() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          let res = await submitLeaveApply(this.ruleForm);
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
      let res = await delLeaveManage(this.temp.id);
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
    async handleSubmit(index, row) {
      let res = await submitLeaveManage({ id: row.id });
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
  },
};
</script>



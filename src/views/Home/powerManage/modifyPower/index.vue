<template>
  <div class="about">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h4>审批员权限</h4>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        :default-sort="{ prop: 'created', order: 'descending' }"
        max-height="750"
      >
        <el-table-column flxed type="index" label="序号"> </el-table-column>
        <el-table-column
          flxed
          prop="account"
          label="审批管理员"
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
          prop="permission"
          label="设置权限"
          column-key="permission"
        >
          <template slot-scope="{ row }">
            <el-checkbox-group v-model="row.permission">
              <el-checkbox label="one">一审</el-checkbox>
              <el-checkbox label="two">二审</el-checkbox>
              <el-checkbox label="end">终审</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="handleUpdate(scope.$index, scope.row)"
              >修改权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Dialog
        dialogTitle="修改"
        btnTitle="修改"
        :visible.sync="dialogUpdVisible"
        @confirm="updData"
        ><span>确定修改？</span></Dialog
      >
    </el-card>
  </div>
</template>
  
<script>
import { updatePermission, permissionList } from "@/api/api";
import Dialog from "@/components/dialog.vue";
import { tableRowClassName,filterDate,filterHandler } from "@/utils/function";
export default {
  components: { Dialog },
  data() {
    return {
      filterDate,
      filterHandler,
      tableRowClassName,
      tableData: [],
      dialogUpdVisible: false,
      temp: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await permissionList();
      let { code, data, msg } = res.data;
      if (code === 20000) {
        this.tableData = data.list;
      } else {
        this.$notify.error({
          title: "列表获取失败",
          message: msg,
        });
      }
    },
    handleUpdate(index, row) {
      this.dialogUpdVisible = true;
      this.temp = { ...row };
    },
    async updData() {
      let res = await updatePermission(this.temp);
      let { code, msg } = res.data;
      if (code === 20000) {
        this.$notify.success({
          title: "修改成功",
          message: msg,
        });
        this.dialogUpdVisible = false;
        this.getList();
      } else {
        this.$notify.error({
          title: "修改失败",
          message: msg,
        });
      }
    },
  },
};
</script>
  
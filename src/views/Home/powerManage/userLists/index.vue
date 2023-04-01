<template>
  <div class="about">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h4>员工与审批列表</h4>
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
        max-height="632"
      >
        <el-table-column flxed type="index" label="序号"> </el-table-column>
        <el-table-column
          flxed
          prop="account"
          label="用户名"
          column-key="account"
        >
        </el-table-column>

        <el-table-column
          flxed
          prop="password"
          label="密码"
          column-key="password"
        >
        </el-table-column>

        <el-table-column
          flxed
          prop="reg_time"
          label="创建时间"
          column-key="reg_time"
          sortable
          :filters="filterReg_time()"
          :filter-method="filterHandlerReg_time"
        >
          <template slot-scope="{ row }">
            {{ row.reg_time | formatDateTime }}
          </template>
        </el-table-column>

        <el-table-column
          flxed
          prop="role_name"
          label="权限分配"
          column-key="role_name"
          :filters="filterRole_name(tableData, this)"
          :filter-method="filterHandler"
        >
          <template slot-scope="{ row }">
            <el-tag  :type="row.role_name|role_nameStyle">
              {{row.role_name|role_nameFilter}}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          flxed
          prop="creator"
          label="创建人"
          column-key="creator"
        >
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
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
import { userList, permissionRemove } from "@/api/api";
import Dialog from "@/components/dialog.vue";
import {tableRowClassName, debounce,filterHandler,filterRole_name } from "@/utils/function";
export default {
  components: { Dialog },
  data() {
    return {
      filterRole_name,
      filterHandler,
      tableRowClassName,
      tableData: [],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        name: "",
      },
      rows: 0, //总条数
      debouncedClick: null,
      dialogDelVisible: false,
      temp: {},
    };
  },
  mounted() {
    this.getList();
    this.debouncedClick = debounce(this.getList, 1500); //防抖
  },
  unmounted() {
    // 移除组件时，取消定时器
    this.debouncedClick.cancel();
  },
  methods: {
    async getList() {
      let res = await userList(this.listQuery);
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
    //删除
    handleDelete(index, row) {
      this.dialogDelVisible = true;
      this.temp = { ...row };
    },
    //提交删除
    async delData() {
      let res = await permissionRemove(this.temp.id);
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
    filterReg_time() {
      //去重
      let map = new Map();
      for (let item of this.tableData) {
        let v = { ...item };
        if (!map.has(v)) {
          v.date = this.$options.filters["formatDate"](v.reg_time);
          map.set(v.date, v);
        }
      }
      const data = [...map.values()];
      return data.map((item) => ({ text: item.date, value: item.date }));
    },
    filterHandlerReg_time(value, row, column) {
      const property = column["property"];
      if (property === "reg_time") {
        return this.$options.filters["formatDate"](row[property]) === value;
      } else {
        return row[property] === value;
      }
    },
  },
};
</script>
  
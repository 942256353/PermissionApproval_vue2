<template>
    <div class="about">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h4>{{title}}</h4>
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
            prop="app_type"
            label="申请类别"
            :filters="filterCategory(tableData, this)"
            :filter-method="filterHandler"
          >
            <template slot-scope="{ row }">
              <el-tag :type="row.app_type | categoryStyle">
                {{ row.app_type | categoryFilter }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            flxed
            prop="result"
            label="审批状态"
            column-key="result"
          >
            <template slot-scope="{ row }">
              <el-tag v-if="row.result === 'pass'" type="success"> 通过 </el-tag>
              <el-tag v-else-if="row.result === 'reject'" type="danger">
                驳货
              </el-tag>
              <el-tag v-else type="primary"> 待审批 </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                :disabled="
                  scope.row.result === 'pass' || scope.row.result === 'reject'
                "
                @click="handleSubmit(scope.row, '通过')"
                >通过</el-button
              >
              <el-button
                size="mini"
                type="danger"
                :disabled="
                  scope.row.result === 'pass' || scope.row.result === 'reject'
                "
                @click="handleSubmit(scope.row, '驳回')"
                >驳回</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <Dialog
          :dialogTitle="`${title}${passOrRejectType}`"
          :btnTitle="`${passOrRejectType}`"
          :visible.sync="dialogVisible"
          @confirm="confirm"
          ><span>确定{{ passOrRejectType }}？</span></Dialog
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
  import { oneList, onePass, oneReject, twoList, twoPass, twoReject,endList, endPass, endReject } from "@/api/api";
  import { debounce, filterCategory, filterDate,filterHandler } from "@/utils/function";
  import Dialog from "@/components/dialog.vue";
  export default {
    components: { Dialog },
    props:{
        instance:{
            type:String,
            require:true,
            validator(val){
                return ['one','two','end'].indexOf(val) !==-1;
            }
        },
        title:{
            type:String,
            default:'审核'
        }
    },
    data() {
      return {
        filterCategory,
        filterDate,
        filterHandler,
        tableData: [],
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          name: "",
        },
        debouncedClick: null,
        rows: 0, //总条数
        passOrRejectType: "通过", //通过或者驳回
        dialogVisible: false,
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
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex % 2 === 0) {
          return "warning-row";
        } else {
          return "success-row";
        }
      },
      async getList() {
        let listFn;
        if(this.instance==='one'){
            listFn = oneList;
        }else if(this.instance==='two'){
            listFn = twoList;
        }else if(this.instance==='end'){
            listFn = endList;
        }else{
            listFn = oneList;
        }
        let res = await listFn(this.listQuery);
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
      handleSubmit(row, type) {
        this.temp = { ...row };
        this.passOrRejectType = type;
        this.dialogVisible = true;
      },
      //提交
      async confirm() {
        let passFn,rejectFn;
        let { app_id, app_type, id } = this.temp;
        let res;
        if(this.instance==='one'){
            passFn = onePass;
            rejectFn = oneReject;
        }else if(this.instance==='two'){
            passFn = twoPass;
            rejectFn = twoReject;
        }else if(this.instance==='end'){
            passFn = endPass;
            rejectFn = endReject;
        }
        this.passOrRejectType == "通过"
          ? (res = await passFn({ app_id, app_type, id }))
          : (res = await rejectFn({ app_id, app_type, id }));
        let { code, msg } = res.data;
        if (code === 20000) {
          this.$notify.success({
            title: `${this.passOrRejectType}成功`,
            message: msg,
          });
          this.dialogVisible = false;
          this.getList(); //查询数据
        } else {
          this.$notify.error({
            title: `${this.passOrRejectType}失败`,
            message: msg,
          });
        }
      },
    },
  };
  </script>
  
  
  
<template>
  <div class="about">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h4>档案管理</h4>
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
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button size="mini" type="primary" v-no-more-click :disabled="row.file_path !=null" @click="handleCreate(row)">生成凭证</el-button>
            <el-button size="mini" type="success" v-no-more-click :disabled="row.file_path ==null" @click="handleDownload(row)">下载凭证</el-button>
          </template>
        </el-table-column>
      </el-table>
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
docList;
import { docList,createFile,docDownload} from "@/api/api";
import { debounce, filterCategory, filterDate,filterHandler,tableRowClassName } from "@/utils/function";
import {getToken} from '@/utils/auth'
export default {
  data() {
    return {
      filterCategory,
      filterDate,
      filterHandler,
      tableRowClassName,
      tableData: [],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        name: "",
      },
      debouncedClick: null,
      rows: 0, //总条数
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
      let res = await docList(this.listQuery);
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
    async handleCreate(row){ //生成
      let res = await createFile({id:row.id});
      let { code, msg } = res.data;
      if (code === 20000) {
        this.$notify.success({
          title: "凭证生成成功",
          message: msg,
        });
        this.getList();
      } else {
        this.$notify.error({
          title: "凭证生成失败",
          message: msg,
        });
      }
    },
    async handleDownload(row){//获取下载路径
      let res = await docDownload({id:row.id});
      let { code,data,msg } = res.data;
      if (code === 20000) {
        this.downloadFile(`${process.env.VUE_APP_protalurl}static/${data.file_path}`,data.file_path);
      } else {
        this.$notify.error({
          title: "获取凭证下载路径失败",
          message: msg,
        });
      }
    },
    downloadFile(url,fileName){//获取文件流
      const xhr = new XMLHttpRequest();
      xhr.open('GET',url);
      xhr.responseType = "blob"; //字节流
      xhr.setRequestHeader('token',getToken()); //传入token
      xhr.send();
      //onreadystatechange(状态码从0,1,2,3,4) onload(请求状态码为4) 
      xhr.onload = ()=>{
        if(xhr.status ===200){
          this.createA(xhr.response,fileName)
        }else{
          this.$notify.error({
          title: "获取文件流失败",
          message: msg,
        });
        }
      }
    },
    createA(data,fileName){//创建a标签进行文件下载
      let _blob = new Blob([data]);
      //window对象下有URL对象作用：专门将blob或者file读取成url;
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(_blob);
      a.download = fileName; //文件下载名称
      a.click();
      this.$message({
          message: '下载成功',
          type: 'success',
          duration:2000
        });
    }
  },
};
</script>



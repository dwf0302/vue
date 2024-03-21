<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">

      <el-form-item label="名称：">
        <el-input v-model="formInline.name" placeholder="姓名" clearable/>
      </el-form-item>

      <el-form-item label="性别：" label-width="100px" size="default">
        <el-select v-model="formInline.sex" placeholder="性别" clearable>
          <el-option label="女" value="0"/>
          <el-option label="男" value="1"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="formattedStu">
      <el-table-column prop="id" label="编号"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="age" label="年龄"/>
      <el-table-column prop="sex" label="性别"/>
    </el-table>
    <div class="pager" v-if="isHasPage">
      <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentChange"
                     :page-sizes="pageSizes" :page-size="pageSize" :current-page="currentPage"
                     layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import request from '../../utils/http-request'
import {reactive} from 'vue'
import {HTTP_METHOD} from "@/enums/HttpType";

export default {
  name: 'MyEleUi',
  props: {
    pageSizes: {
      type: Array,
      default: () => [5, 10, 20, 30, 40]
    },
  },
  data() {
    return {
      stus: [],
      currentPage: 1,
      pageNo: 0,
      pageSize: 10,
      total: 0,
      isHasPage: true,
      formInline: reactive({
        name: '',
        sex: "0",
      })
    }
  },
  methods: {
    async getStuList(requestData) {
      const resp = await request(HTTP_METHOD.POST, "/getStuListByPage", {
        pageSize: this.pageSize,
        pageNo: this.currentPage,
        name: requestData?.name ?? "",
        sex: requestData?.sex ?? ""
      })
      this.stus = resp.data
      this.total = resp.total
      this.pageNo = resp.pageNo
      this.pageSize = resp.pageSize
    },
    onSubmit() {
      const requestData = {
        name: this.formInline.name,
        sex: this.formInline.sex,
      };
      this.getStuList(requestData)
    },
    handlePageSizeChange(val) {
      this.pageSize = val
      this.getStuList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getStuList()
    }
  },
  mounted() {
    this.getStuList()
  },
  computed: {
    formattedStu() {
      return this.stus.map(stu => {
        return {
          ...stu,
          sex: stu.sex === '0' ? '女' : '男'
        };
      });
    }
  }
}
</script>

<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>

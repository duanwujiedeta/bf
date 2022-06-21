<template>
  <div id="app-index">
    <div class="header-session">
      <div class="header">
        <el-input
          v-model="form.enWord"
          style="width: 250px; margin-right: 15px"
          placeholder="EN-Word"
        ></el-input>
        <el-input
          v-model="form.cnWord"
          style="width: 250px; margin-right: 15px"
          placeholder="CN-Word"
        ></el-input>
        <el-checkbox v-model="form.isShow" style="margin-right: 15px"
          >是否显示</el-checkbox
        >
        <el-button @click="addItem">添加S</el-button>
        <el-button>清空列表</el-button>
        <el-button @click="saveInConsole">保存列表</el-button>
        <el-button @click="hideen = !hideen">HIDE EN</el-button>
        <el-button @click="hidecn = !hidecn">HIED CN</el-button>
      </div>
      <div class="head-content">
        <el-table
          :data="list"
          style="width: 100%"
          height="100%"
          :row-key="
            (row) => {
              row.enWord;
            }
          "
        >
          <el-table-column prop="date" label="EN-WORDS">
            <template slot-scope="scope">
              <div v-show="!hideen">{{ scope.row.enWord }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="CN-WORDS">
            <template slot-scope="scope">
              <div v-show="!hidecn">{{ scope.row.cnWord }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="是否显示">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.isShow"
                style="margin-right: 15px"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button @click="delItem(scope.$index, scope.row)"
                >删除</el-button
              >
              <el-button @click="handlerClick(scope.$index, scope.row)"
                >clear</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="index-container">
      <div class="detail-container">
        <div class="detail-desc"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [{"enWord":"delta airline","cnWord":"达美航空公司","isShow":true},{"enWord":"depart for","cnWord":"出发去","isShow":true},{"enWord":"proceed to gate 27","cnWord":"前往 27 号登机口","isShow":true},{"enWord":"passenger","cnWord":"乘客","isShow":true},{"enWord":"flight 1425","cnWord":"1425航班","isShow":true},{"enWord":"thank you for your patience","cnWord":"感谢您的耐心等待","isShow":true},{"enWord":"regret to","cnWord":"后悔","isShow":true},{"enWord":"aircraft maintenance","cnWord":"飞机维修","isShow":true},{"enWord":"dedicated assistance counter","cnWord":"专门的援助柜台","isShow":true},{"enWord":"the departure gate","cnWord":"登机口","isShow":true},{"enWord":"preboarding announcement","cnWord":"登机前公告","isShow":true},{"enWord":"assistance","cnWord":"协助","isShow":true},{"enWord":"in approximately 10 minutes time","cnWord":"在大约 10 分钟的时间内","isShow":true},{"enWord":"seattle","cnWord":"西雅图","isShow":true},{"enWord":"captain","cnWord":"队长","isShow":true}],
      hideen: false,
      hidecn: false,
      form: {
        enWord: "",
        cnWord: "",
        isShow: true,
      },
    };
  },
  methods: {
    saveInConsole() {
      console.log(JSON.stringify(this.list));
    },
    delItem(index) {
      this.list.splice(index, 1);
    },
    handlerClick() {},
    addItem() {
      let { enWord, cnWord, isShow } = this.form;
      this.list.push({ enWord, cnWord, isShow });
      this.form = {
        enWord: "",
        cnWord: "",
        isShow: true,
      };
    },
  },
};
</script>

<style lang="less">
#app-index {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  .header-session {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .header {
    position: fixed;
    height: 76px;
    top: 0px;
    width: 100%;
    z-index: 2;
    padding: 0 40px;
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    align-items: center;
  }
  .head-content {
    margin-top:76px;
    min-height: 850px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .c-title {
      font-size: 56px;
      line-height: 78px;
      font-weight: 600;
      color: #ffffff;
      white-space: nowrap;
    }
    .c-sub-title {
      font-size: 20px;
      line-height: 28px;
      color: #ffffff;
      white-space: nowrap;
    }
    .be-developer {
      background-color: #ec5b44;
      color: #ffffff;
      border-radius: 6px;
      width: 150px;
      height: 50px;
      margin-top: 40px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
  .index-container {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    .detail-container {
      width: 1280px;
      border-radius: 21px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .detail-title {
        font-weight: 500;
        color: #000000;
        font-size: 24px;
        line-height: 34px;
        margin-top: 80px;
        position: relative;
        &::before {
          content: "";
          display: inline-block;
          width: 20px;
          height: 18px;
          position: absolute;
          background: url(~@/assets/images/index/float-left-cion.svg) center
            center/100% 100% no-repeat;
          left: -30px;
          top: 9px;
        }
        &::after {
          content: "";
          display: inline-block;
          width: 20px;
          height: 18px;
          position: absolute;
          background: url(~@/assets/images/index/float-right-icon.svg) center
            center/100% 100% no-repeat;
          top: 9px;
          right: -30px;
        }
      }
      .detail-desc {
        display: flex;
        flex-direction: row;
        margin-top: 60px;
        margin-bottom: 155px;
        width: 100%;
        .detail-desc-item {
        }
      }
    }
  }
}
</style>

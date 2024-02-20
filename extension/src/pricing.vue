<template>
  <div id="app">
    <el-input
      v-model="input"
      placeholder="原文"
      type="textarea"
      :autosize="{ minRows: 4, maxRows: 10 }"
    ></el-input>
    <el-input
      style="margin-top: 20px"
      v-model="tran_input"
      placeholder="译文"
      type="textarea"
      :autosize="{ minRows: 4, maxRows: 10 }"
    ></el-input>
    <div>
      <el-button
        :disabled="disabled"
        style="margin-top: 20px"
        type="primary"
        @click="save"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import defaultObj from "@/util/defaultObj";
import {
  openDB,
  addData,
  getDataByKey,
  cursorGetData,
  getDataByIndex,
  cursorGetDataByIndex,
  updateDB,
  deleteDB,
  deleteDBAll,
  closeDB,
  getDataAll,
  uuid,
} from "@/util/indexdDB";
export default {
  ...defaultObj,
  data() {
    return {
      disabled: false,
      input: "",
      tran_input: "",
    };
  },
  mounted() {
    let urlParams = new URLSearchParams(window.location.search);
    let text = urlParams.get("text");
    text && (this.input = text);
  },
  methods: {
    save() {
      if (!this.input) return;
      this.disabled = true;
      let that = this;
      openDB("luey", "favorites").then((db) => {
        addData(db, "favorites", {
          word: this.input,
          tran: this.tran_input,
        });
        that.input = "";
        that.tran_input = "";
        this.disabled = false;
        /* getDataAll(db, "favorites").then((res) => {
          console.log(JSON.stringify(res));
        }); */
        /*list.forEach((v, k) => {
        updateDB(db, "favorites", v).then((res) => { console.log("更新成功"); });
    })*/
      });
    },
  },
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>

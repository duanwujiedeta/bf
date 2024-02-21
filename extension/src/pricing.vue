<template>
  <div id="app">
    <vue-editor
      v-model="input"
      style="margin-bottom: 20px"
      v-if="use_rich"
    ></vue-editor>
    <vue-editor
      v-model="tran_input"
      style="margin-bottom: 20px"
      v-if="use_rich"
    ></vue-editor>
    <el-input
      v-if="!use_rich"
      v-model="input"
      placeholder="原文"
      type="textarea"
      :autosize="{ minRows: 4, maxRows: 10 }"
    ></el-input>
    <el-input
      v-if="!use_rich"
      style="margin-top: 20px"
      v-model="tran_input"
      placeholder="译文"
      type="textarea"
      :autosize="{ minRows: 4, maxRows: 10 }"
    ></el-input>
    <!-- start bottom -->
    <div>
      <el-button
        :disabled="disabled"
        style="margin-top: 20px"
        type="primary"
        @click="save"
        >保存</el-button
      >

      <el-button
        :disabled="disabled"
        style="margin-top: 20px"
        type="primary"
        @click="trigRich"
        >trigRich</el-button
      >
    </div>
    <!-- end bottom -->
  </div>
</template>

<script>
import defaultObj from "@/util/defaultObj";
import { VueEditor } from "vue2-editor";
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
      use_rich: true,
      disabled: false,
      input: "",
      tran_input: "",
    };
  },
  components: {
    VueEditor,
  },
  mounted() {
    let urlParams = new URLSearchParams(window.location.search);
    let text = urlParams.get("text");
    text && (this.input = text);
  },
  methods: {
    trigRich() {
      this.use_rich = !this.use_rich;
    },
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

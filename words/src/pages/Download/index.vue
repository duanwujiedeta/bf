<template>
  <div id="app-index-download">
    <div class="header-session">
      <div class="header">
        <!-- <el-input
          v-model="form.enWord"
          style="max-width: 200px; margin-right: 15px"
          placeholder="EN-Word"
        ></el-input> -->
        <el-button @click="downloadEn(1)">Down EN</el-button>
        <el-button @click="downloadEn(0)">Down US</el-button>
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
// import aline from "./airline.json"
import { deepCopy } from "@/util/common";
import configs from "./config";
export default {
  data() {
    return {
      failed: 0,
      index: 0,
      start: 0,
      hideen: false,
      hidecn: false,
      hidensp: false,
      form: {
        enWord: "",
        cnWord: "",
        isShow: true,
      },
      ...configs.dataObj,
    };
  },
  methods: {
    downloadEn(sec) {
      // 美是 0  英是 1
      let data = this.amen;
      this.start = this.index;
      data.forEach((v, k) => {
        let index = this.index;
        if (index - this.start > 50) {
          return;
        }
        if (k > index) {
          this.index = k;
        }
        let has_val =
          v.results.BingDictWeb &&
          typeof v.results.BingDictWeb.phonetic != "undefined";
        let phonetic = has_val ? v.results.BingDictWeb.phonetic : [];
        if (phonetic.length && k > this.start) {
          // console.log(k);
          window.open(phonetic[sec].ttsURI, "_blank");
        } else {
          if (k > this.start) {
            this.failed++;
          }
          console.log("failed");
          console.log(this.failed);
        }
      });
    },
    search() {
      let key_word = this.form.enWord;
    },
  },
};
</script>

<style lang="less"></style>

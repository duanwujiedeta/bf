<template>
  <div id="cen-index">
    <div class="header-session">
      <div class="head-content">
        <el-table
          :data="tranData"
          style="width: 100%"
          height="100%"
          :row-key="
            (row) => {
              row.text + row.id;
            }
          "
        >
          <el-table-column prop="date" label="WORDS">
            <template slot-scope="scope">
              <div style="display: flex; gap: 15px" :id="'abc' + scope.row.id">
                <!-- start left -->
                <div class="left" style="flex-grow: 1">
                  <div :style="{ visibility: hideen ? 'hidden' : 'visible' }">
                    {{ scope.row.text }}
                  </div>
                  <!-- start google -->
                  <div
                    :style="{ visibility: hidecn ? 'hidden' : 'visible' }"
                    v-if="
                      scope.row.results.GoogleWeb &&
                      scope.row.results.GoogleWeb.result
                    "
                    style="
                      border-bottom: 1px solid #cccccc;
                      margin-bottom: 5px;
                      padding-bottom: 5px;
                    "
                  >
                    <div>Google词典</div>
                    <p>
                      <span
                        v-for="(ditem, dindex) in scope.row.results.GoogleWeb
                          .result"
                        :key="'goo' + dindex"
                      >
                        <span>{{ ditem }} </span>
                        <span
                          >{{
                            dindex ==
                            scope.row.results.GoogleWeb.result.length - 1
                              ? ""
                              : ","
                          }}
                        </span>
                      </span>
                    </p>
                  </div>
                  <!-- end google -->
                  <!-- start deepl -->
                  <div
                    v-if="
                      scope.row.results.DeepLWeb &&
                      scope.row.results.DeepLWeb.result
                    "
                  >
                    <div
                      :style="{ visibility: hidensp ? 'hidden' : 'visible' }"
                    >
                      deepl辞典
                    </div>
                    <p :style="{ visibility: hidecn ? 'hidden' : 'visible' }">
                      <span
                        v-for="(ditem, dindex) in scope.row.results.DeepLWeb
                          .result"
                        :key="'deepl' + dindex"
                      >
                        <!-- <span>{{ item.pos }} </span> -->
                        <span>
                          {{ ditem
                          }}{{
                            dindex ==
                            scope.row.results.DeepLWeb.result.length - 1
                              ? ""
                              : ","
                          }}
                        </span>
                      </span>
                    </p>
                  </div>
                  <!-- end deepl -->
                </div>
                <!-- start left -->
                <div class="right" style="display: none">
                  <div
                    style="display: flex; flex-direction: column"
                    :style="{ visibility: hide_right ? 'hidden' : 'visible' }"
                  >
                    <el-button
                      v-if="!scope.row.readed"
                      size="mini"
                      @click="setReaded(scope.row)"
                      style="margin-bottom: 10px"
                      >read</el-button
                    >
                    <el-button
                      size="mini"
                      @click="setIndex(scope.row)"
                      style="margin-left: 0px; margin-bottom: 10px"
                      >S-idx</el-button
                    >
                    <!-- <el-button
                      size="mini"
                      @click="playBen(scope.row)"
                      style="margin-left: 0px; margin-bottom: 10px"
                      >B-En</el-button
                    >
                    <el-button
                      size="mini"
                      @click="playBus(scope.row)"
                      style="margin-left: 0px; margin-bottom: 10px"
                      >B-Us</el-button
                    > -->
                    <el-button
                      size="mini"
                      @click="loopPlay(scope.row)"
                      style="margin-left: 0px"
                      >loop</el-button
                    >
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="header">
        <div v-if="show_left" class="left-setting">
          <div>
            <el-input
              style="margin-top: 10px"
              v-model="form.key_word"
              @change="search"
              size="medium"
              placeholder="EN-Word"
            >
              <el-select
                size="medium"
                v-model="value"
                placeholder="请选择"
                slot="prepend"
                style="width: 80px"
                @change="changeList"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-button slot="append" @click="findIndex">find</el-button>
            </el-input>
          </div>
          <div>
            <span>
              loop
              <el-switch
                v-model="loop"
                :active-value="true"
                :inactive-value="false"
              >
                loop
              </el-switch>
            </span>
            <span>
              scroll
              <el-switch
                v-model="auto_scroll"
                :active-value="true"
                :inactive-value="false"
              >
              </el-switch>
            </span>
          </div>
          <div>
            <el-select
              size="medium"
              v-model="speedWord"
              placeholder="速度"
              slot="prepend"
              style="width: 80px"
              @change="changeSpeed"
            >
              <el-option
                v-for="item in speedOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-button
              @click="msgLength"
              type="text"
              style="flex-basis: 20px; margin-left: 10px"
              >length</el-button
            >
            <el-button
              @click="hide_right = !hide_right"
              type="text"
              style="flex-basis: 20px; margin-left: 10px"
              >rarea</el-button
            >
          </div>
          <div>
            <el-button
              @click="reflash"
              type="text"
              style="flex-basis: 20px; margin-left: 10px"
              >ref</el-button
            >
            <el-button
              @click="clearStorage"
              type="text"
              style="flex-basis: 20px; margin-left: 10px"
              >cls</el-button
            >
          </div>
        </div>
        <el-button
          @click="show_left = !show_left"
          type="text"
          style="min-width: 30px"
          >{{ show_left ? "《《" : "》》" }}</el-button
        >
        <div class="buttons">
          <el-button @click="$router.push({ name: 'home' })" type="text"
            >back</el-button
          >
        </div>
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
  data() {
    return {
      current_row_index: 0,
      auto_scroll: false,
      show_left: false,
      hide_right: false,
      value: "fish",
      loop: false,
      speedWord: 1,
      speedOpt: [
        {
          value: 1,
          label: 1,
        },
        {
          value: 1.5,
          label: 1.5,
        },
        {
          value: 2,
          label: 2,
        },
        {
          value: 2.5,
          label: 2.5,
        },
        {
          value: 3,
          label: 3,
        },
        {
          value: 3.5,
          label: 3.5,
        },
        {
          value: 4,
          label: 4,
        },
        {
          value: 4.5,
          label: 4.5,
        },
        {
          value: 5,
          label: 5,
        },
        {
          value: 0.5,
          label: 0.5,
        },
      ],
      options: [
        {
          value: "fish",
          label: "fish",
        },
        {
          value: "level",
          label: "level",
        },
        {
          value: "home",
          label: "home",
        },
        {
          value: "level07",
          label: "level07",
        },
        {
          value: "chd",
          label: "chd",
        },
      ],
      origTranData: [],
      tranData: [],
      fish: deepCopy(require("./cen/fish.json"), []),
      level: deepCopy(require("./cen/level.json"), []),
      home: deepCopy(require("./cen/home.json"), []),
      level07: deepCopy(require("./cen/level07.json"), []),
      chd: deepCopy(require("./cen/chd.json"), []),
      hideen: false,
      hidecn: false,
      hidensp: false,
      us: false,
      form: {
        key_word: localStorage.getItem("keyword_word") || "",
        enWord: "",
        cnWord: "",
        isShow: true,
      },
      currentItem: null,
      i: localStorage.getItem("i") || 0,
    };
  },
  mounted() {
    window.message = this.$message.warning;
    this.changeList();
  },
  methods: {
    addOrUpdateStore(storeName, data) {
      let ret = deepCopy(data, {});
      // ret.id = uuid();
      openDB("words", storeName).then((db) => {
        // getDataAll(db, "favorites").then((res) => { console.log(JSON.stringify(res)); })
        updateDB(db, storeName, ret).then((res) => {
          this.$message({
            message: "更新成功",
            type: "success",
            duration: 500,
          });
        });
      });
    },
    msgLength() {
      this.$message({
        message: this.tranData.length + "-------" + this.i,
        type: "success",
        duration: 500,
      });
    },
    changeSpeed() {
      // https://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp
      let speedWord = this.speedWord;
      window.speedWord = speedWord;
    },
    next() {
      let i = this.i;
      let list = this.tranData;
      let len = list.length;
      if (i < len) {
        this.i++;
      } else {
        this.i = 0;
      }
      this.loopPlay(list[this.i]);
    },
    loopPlay(row) {
      this.clear();
      let index = this.tranData.indexOf(row);
      localStorage.setItem("keyword_word", row.text);
      this.i = index;
      this.playAllEn(false, true);
    },
    findIndex() {
      let key_word = this.form.key_word;
      let list = this.tranData;
      let res = list.filter((v, k) => {
        return v.text.indexOf(key_word) >= 0;
      });
      if (res.length) {
        let row = res[0];
        let index = this.tranData.indexOf(row);
        this.i = index;
        this.scrollToPoint(row, true);
      }
    },
    setIndex(row) {
      let index = this.tranData.indexOf(row);
      this.i = index;
      localStorage.setItem("i", index);
    },
    scrollNext() {
      this.i++;
      let i = this.i;
      let row = this.tranData[i];
      row && this.scrollToPoint(row, true);
    },
    clear() {
      this.stop();
      this.i = 0;
    },
    stop() {
      let audio;
      window.audio && window.audio.pause && window.audio.pause();
    },
    startOrStop() {
      let audio = window.audio;
      if (!audio) {
        return;
      }
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    changeList() {
      let value = this.value;
      let list = this[value];
      this.origTranData = deepCopy(list, []);
      this.$nextTick(() => {
        this.search();
      });
    },
    search() {
      /* if (this.form.key_word == 1) {
        this.tranData = this.origTranData.slice(0, 150);
      } else if (this.form.key_word == 2) {
        this.tranData = this.origTranData.slice(149, 300);
      } else if (this.form.key_word == 3) {
        this.tranData = this.origTranData.slice(299);
      } else {
      } */
      this.tranData = this.origTranData;
    },
    getStr() {
      return localStorage.getItem("readed") || "";
    },
    setReaded(row) {
      let text = row.text; /* .replace(/\s/g, "") */
      let str = this.getStr();
      if (str.indexOf(text) < 0) {
        str += str ? `,${text}` : `${text}`;
      }
      localStorage.setItem("readed", str);
      row.readed = true;
    },
    clearStorage() {
      localStorage.clear();
    },
    reflash() {
      let str = this.getStr();
      this.tranData = this.tranData.filter((v, k) => {
        return !v.readed || str.indexOf(v.text) < 0;
      });
    },
    playAllEn(once, loop) {
      let us = this.us;
      let list = this.tranData;
      let len = list.length;
      let inscr_i = this.i;
      if (!loop) {
        inscr_i++;
      }
      if (this.i >= len) {
        if (this.loop) {
          inscr_i = 0;
          this.i = 0;
          this.reflash();
          return this.$nextTick(() => {
            this.playAllEn();
          });
        } else {
          return;
        }
      }
      this.currentItem = list[this.i];
      let row = this.currentItem;
      this.scrollToPoint(row);
      if (loop) {
        // 单曲循环
        this.playBen(row, this.loopPlay.bind(this, row), once, loop);
      } else {
        !us && this.playBen(row, this.playAllEn.bind(this, once), once);
        us && this.playBus(row, this.playAllEn.bind(this, once), once);
      }
      this.i = inscr_i; // 播放完毕之后，再添加1
    },
    scrollToPoint(row, manual) {
      row = this.tranData[this.i];
      try {
        if (this.auto_scroll || manual) {
          let el_container = document.querySelector(".el-table__body-wrapper");
          let ele = document.querySelector(`#abc${row.id}`);
          let table_height = el_container.offsetHeight;
          let el_height = ele.offsetHeight;
          let scroll_to = this.getScrollHeight();
          el_container.scrollTo({
            top: scroll_to - table_height + el_height + 25,
            behavior: "smooth",
          });
        }
      } catch (error) {
        this.$message.warning(error);
      }
    },
    getScrollHeight() {
      let res = 0;
      let i = this.i;
      for (let ii = 0; ii < i; ii++) {
        let row = this.tranData[ii];
        let ele = document.querySelector(`#abc${row.id}`);
        res += ele.offsetHeight + 25;
      }
      return res;
    },
    playBen(row, cb, once, loop) {
      let phonetic =
        (row.results.BingDictWeb && row.results.BingDictWeb.phonetic) || [];
      let mp3_file = phonetic[1] || "";
      window.playMp3(
        (mp3_file && mp3_file.ttsURI) || "",
        true,
        cb || "",
        once,
        loop
      );
    },
    playBus(row, cb, once) {
      let phonetic =
        (row.results.BingDictWeb && row.results.BingDictWeb.phonetic) || {};
      let mp3_file = phonetic[0] || "";
      window.playMp3(
        (mp3_file && mp3_file.ttsURI) || "",
        false,
        cb || "",
        once
      );
    },
    playGen(row) {
      let mp3_file = row.results.GoogleWeb.ttsURI || "";
      window.playMp3(row.results.GoogleWeb.ttsURI);
    },
    handlerClick() {},
  },
};
</script>

<style lang="less">
#cen-index {
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
    min-height: calc(100% - 76px);
  }

  .header {
    width: 100%;
    position: fixed;
    min-height: 76px;
    bottom: 0px;
    z-index: 2;
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    align-items: center;
    .left-setting {
      display: inline-flex;
      flex-direction: column;
      height: 76px;
      min-width: 220px;
      padding: 5px;
      justify-content: flex-start;
      overflow-y: auto;
      flex-basis: 220px;
      & > div {
        margin-bottom: 10px;
      }
    }

    .buttons {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      padding-right: 15px;

      & > button {
        flex-basis: 30px;
        flex-shrink: 0;
      }
    }
  }

  .head-content {
    height: calc(100% - 76px);
    flex-grow: 1;
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

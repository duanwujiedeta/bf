<template>
  <div id="note-index">
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
          <el-table-column prop="date">
            <template slot-scope="scope">
              <div style="display: flex; gap: 15px" :id="'abc' + scope.row.id">
                <!-- start left -->
                <div class="left" style="flex-grow: 1">
                  <p>{{ scope.row.word }}</p>
                </div>
                <!-- start left -->
                <!-- <div class="right">
                  <div
                    style="display: flex; flex-direction: column"
                    :style="makeShowObj(hide_right,'flex')"
                  >
                    <el-button
                      type="text"
                      v-if="!scope.row.readed"
                      :key="'read'"
                      size="mini"
                      @click="setReaded(scope.row)"
                      style="margin-left: 0px; margin-bottom: 5px"
                      >read</el-button
                    >
                    <el-button
                      type="text"
                      v-if="!scope.row.harded"
                      :key="'hard'"
                      size="mini"
                      @click="setHeaded(scope.row)"
                      style="margin-left: 0px; margin-bottom: 5px"
                      >hard</el-button
                    >
                    <el-button
                      type="text"
                      size="mini"
                      @click="setIndexText(scope.row)"
                      style="margin-left: 0px; margin-bottom: 5px"
                      >stidx</el-button
                    >
                    <el-button
                      type="text"
                      size="mini"
                      @click="delCur(scope.$index)"
                      style="margin-left: 0px; margin-bottom: 5px"
                      >del</el-button
                    >
                    <el-button
                      type="text"
                      size="mini"
                      @click="loopPlay(scope.row)"
                      style="margin-left: 0px"
                      >loop</el-button
                    >
                  </div>
                </div> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
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
      dis_mode: false,
      auto_link: false,
      auto_scroll: true,
      show_left: false,
      hide_right: false,
      value: localStorage.getItem("value") || "yuren",
      loop: true,
      speedWord: 2,
      origTranData: [],
      tranData: [
        { id: "14c94599-e7f4-4ad1-91d1-94e43f7f9b02", word: "fswgww" },
      ],
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
      alphabets: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ],
    };
  },
  mounted() {},
  methods: {
    makeShowObj(hidden, dis_play) {
      let dis_mode = this.dis_mode;
      let res;
      if (dis_mode) {
        res = { display: hidden ? "none" : dis_play || "block" };
      } else {
        res = { visibility: hidden ? "hidden" : "visible" };
      }
      return res;
    },
    group() {
      let alphabets = this.alphabets;
      let tranData = this.tranData;
      let res = {};
      let show_item;
      for (let i = 0; i < alphabets.length; i++) {
        // 分组完毕
        let al_char = alphabets[i];
        while (tranData.length) {
          try {
            let item = tranData.shift();
            show_item = item;
            let text = item.text.toLowerCase().trim()[0];
            item && (res[text] = res[text] || []);
            item && res[text].push(item);
          } catch (error) {
            console.log(tranData.length);
            console.log(show_item);
          }
        }
      }
      this.recMake(alphabets, res);
    },
    recMake(alphabets, res, list) {
      let newList = list || [];
      // 按照最多三个进行处理
      for (let i = 0; i < alphabets.length; i++) {
        let arr = res[alphabets[i]];
        // 取三个
        arr && arr.length && newList.push(arr.shift());
        // arr && arr.length && newList.push(arr.shift());
        // arr && arr.length && newList.push(arr.shift());
        arr && !res[alphabets[i]].length && delete res[alphabets[i]];
      }
      if (Object.getOwnPropertyNames(res).length) {
        this.recMake(alphabets, res, newList);
      } else {
        this.$nextTick(() => {
          this.$message.success("分组成功");
          this.tranData = deepCopy(newList, []);
        });
      }
    },
    sortList() {
      let origTranData = deepCopy(this.tranData, []);
      let newList = origTranData.sort((v, vv) => {
        let text1 = v.text.trim().split(" ")[0].toLowerCase();
        let text2 = vv.text.trim().split(" ")[0].toLowerCase();
        if (text1 < text2) {
          return -1;
        }
        if (text1 > text2) {
          return 1;
        }

        // name 必须相等
        return 0;
      });
      this.$nextTick(() => {
        this.$message.success("排序成功");
        this.tranData = newList;
      });
    },
    openNew(url) {
      this.auto_link && url && window.open(url, "_blank");
    },
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
    delCur(index) {
      this.tranData.splice(index, 1);
    },
    setIndexText(row) {
      let index = this.tranData.indexOf(row);
      this.i = index;
      localStorage.setItem("i", index);
      localStorage.setItem("keyword_word", row.text);
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
      localStorage.setItem("value", value);
      let list = this[value];
      let str = this.getStr("readed");
      let hstr = this.getStr("harded");
      list.forEach((v, k) => {
        if (str.indexOf(v.text) >= 0) {
          v.readed = true;
        } else {
          v.readed = false;
        }
        if (hstr.indexOf(v.text) >= 0) {
          v.harded = true;
        } else {
          v.harded = false;
        }
      });
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
      this.tranData = deepCopy(this.origTranData, []);
    },
    getStr(str) {
      return localStorage.getItem(str) || "";
    },
    setHeaded(row) {
      let text = row.text; /* .replace(/\s/g, "") */
      let str = this.getStr("harded");
      if (str.split(",").length >= 10) {
        return this.$message.warning("已经有10个了");
      }
      if (str.indexOf(text) < 0) {
        str += str ? `,${text}` : `${text}`;
      }
      localStorage.setItem("harded", str);
      row.harded = true;
    },
    setReaded(row) {
      let text = row.text; /* .replace(/\s/g, "") */
      let str = this.getStr("readed");
      if (str.indexOf(text) < 0) {
        str += str ? `,${text}` : `${text}`;
      }
      localStorage.setItem("readed", str);
      row.readed = true;
    },
    clearChoose(str) {
      localStorage.removeItem(str);
    },
    clearStorage() {
      localStorage.clear();
    },
    getHarded(str) {
      let strs = this.getStr(str);
      this.tranData = this.tranData.filter((v, k) => {
        return v.harded;
      });
    },
    reflash(str) {
      let strs = this.getStr(str);
      this.tranData = this.tranData.filter((v, k) => {
        return !v.readed || strs.indexOf(v.text) < 0;
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
          this.reflash("readed");
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
#note-index {
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
    min-height: 100%;
    // min-height: calc(100% - 76px);
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

<template>
  <div id="app-index">
    <div class="header-session">
      <div class="head-content">
        <el-table :data="tranData" style="width: 100%" height="100%" :row-key="(row) => {
          row.text + row.id;
        }
          ">
          <el-table-column prop="date">
            <template slot-scope="scope">
              <div style="display: flex; gap: 15px" :id="'abc' + scope.row.id">
                <!-- start left -->
                <div class="left" style="flex-grow: 1">
                  <div :style="makeShowObj(hideen)">
                    <span style="color: red; margin-right: 5px" v-if="scope.$index % 5 === 0">{{ scope.$index / 5
                      }}*</span>

                    <!-- <el-button @click="scope.row.show_myself=!scope.row.show_myself" type="text" style="flex-basis: 25px; margin-right: 10px">stg</el-button> -->
                    <myInput :quizCheck="quizCheck" :row="scope.row" :index="scope.$index" :quizing="quizing"
                      :totalIndex="totalIndex" :fc="totalIndex === scope.$index" :clearTotal="clearTotal"></myInput>
                    <span style="margin-right: 20px" v-show="!quizing || scope.row.single_show">{{ scope.row.text
                      }}</span>

                    <wordCal :scope="scope" :copyText="copyText" :dic="dic" :stac="stac"
                      :goNoteWithParam="goNoteWithParam" :setHeaded="setHeaded"></wordCal>
                  </div>
                  <!-- start google -->

                  <googleEl :scope="scope" :makeShowObj="makeShowObj" :hidecn="hidecn"
                    :show_myself="scope.row.show_myself"></googleEl>
                  <!-- end google -->
                  <!-- start Bing -->
                  <bingEl :scope="scope" :makeShowObj="makeShowObj" :hidecn="hidecn" :hidensp="hidensp"
                    :show_myself="scope.row.show_myself"></bingEl>
                  <!-- end Bing -->
                </div>
                <!-- start left -->
                <rightEl :hide_right="hide_right" :scope="scope" :makeShowObj="makeShowObj" :setReaded="setReaded"
                  :setHeaded="setHeaded" :setIndexText="setIndexText" :delCur="delCur" :loopPlay="loopPlay"></rightEl>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="header">
        <div v-if="show_left" class="left-setting">
          <bottomSel :changeList="selChange" :options="options" :goIndex="subGo"></bottomSel>
          <div>
            <el-button @click="reflash('readed')" type="text"
              style="flex-basis: 20px; margin-left: 10px">ref</el-button>
            <el-button @click="clearStorage" type="text" style="flex-basis: 20px; margin-left: 10px">cls</el-button>
            <el-button @click="$router.push({ name: 'mem' })" type="text"
              style="flex-basis: 20px; margin-left: 10px">mem</el-button>
            <el-button @click="$router.push({ name: 'note' })" type="text"
              style="flex-basis: 20px; margin-left: 10px">note</el-button>
            <el-button @click="$router.push({ name: 'cen' })" type="text"
              style="flex-basis: 20px; margin-left: 10px">cen</el-button>
          </div>
          <!-- speed area -->
          <speedArea :speedWord="speedWord" :changeSpeed="changeSpeed" :speedOpt="speedOpt" :msgLength="msgLength"
            :triggRight="triggRight" :search="search" :changeDisMode="changeDisMode">
          </speedArea>
          <!-- speed area -->
          <div>
            <span>
              loop
              <el-switch v-model="loop" :active-value="true" :inactive-value="false">
                loop
              </el-switch>
            </span>
            <span>
              scroll
              <el-switch v-model="auto_scroll" :active-value="true" :inactive-value="false">
              </el-switch>
            </span>
            <span>
              link
              <el-switch v-model="auto_link" :active-value="true" :inactive-value="false">
              </el-switch>
            </span>
          </div>
        </div>
        <el-button @click="show_left = !show_left" type="text" style="min-width: 30px">{{ show_left ? "《《" : "》》"
          }}</el-button>
        <div class="buttons">
          <el-button @click="cquiz" type="text">quiz</el-button>
          <el-button @click="rquiz" type="text">rquiz</el-button>
          <el-button @click="playAllEn(false)" type="text">英美</el-button>
          <el-button @click="
          us = false;
        playAllEn(true);
        " type="text" style="flex-basis: 20px">英</el-button>
          <el-button @click="
          us = true;
        playAllEn(true);
        " type="text" style="flex-basis: 20px">美</el-button>
          <el-button @click="getHarded('harded')" type="text"
            style="flex-basis: 20px; margin-left: 10px">har</el-button>
          <el-button @click="clearChoose('harded')" type="text"
            style="flex-basis: 20px; margin-left: 10px">clhar</el-button>
          <!-- start 操作栏 -->
          <el-button @click="startOrStop" type="text" style="flex-basis: 42px">past</el-button>
          <el-button @click="clear" type="text" style="width: 38px">stop</el-button>
          <!-- <el-button @click="start" type="text" style="width: 38px"
            >start</el-button
          > -->
          <!-- end 操作栏 -->
          <el-button @click="hidensp = !hidensp" type="text">音标</el-button>
          <el-button @click="hideen = !hideen" type="text" style="flex-basis: 50px">EN隐显</el-button>
          <el-button @click="hidecn = !hidecn" type="text" style="flex-basis: 50px">CN隐显</el-button>
          <el-button @click="next" type="text" style="flex-basis: 30px">next</el-button>
          <el-button @click="scrollNext" type="text" style="flex-basis: 30px">snext</el-button>
          <el-button @click="sortList" type="text" style="flex-basis: 30px">sort</el-button>
          <el-button @click="group" type="text" style="flex-basis: 30px">group</el-button>
          <el-button @click="reflash('readed')" type="text" style="flex-basis: 30px">not</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import aline from "./airline.json"
import { deepCopy, copyWord } from "@/util/common";
import configs from "./config";
import myInput from "@/components/MyInput";
import bottomSel from "@/components/BottomSel";
import wordCal from "@/components/WordCal";
import rightEl from "@/components/RightEl";
import googleEl from "@/components/GoogleEl";
import bingEl from "@/components/BingEl";
import speedArea from "@/components/SpeedArea";
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
  components: {
    rightEl,
    myInput,
    bottomSel,
    wordCal,
    googleEl,
    bingEl,
    speedArea,
  },
  data() {
    return {
      // kdgnnagjiakhaebnfddplffafniakfkc
      totalIndex: 0,
      quizing: false,
      current_row_index: 0,
      dis_mode: true,
      auto_link: false,
      auto_scroll: true,
      show_left: false,
      hide_right: true,
      value: localStorage.getItem("value") || "yuren",
      loop: true,
      speedWord: 2,
      origTranData: [],
      tranData: [],
      hideen: false,
      hidecn: true,
      hidensp: true,
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
      speedOpt: configs.speedOpt,
      options: configs.options,
      text: "",
      ...configs.dataObj,
    };
  },
  mounted() {
    this.text = this.$route.query.text || "";
    window.message = this.$message.warning;
    this.changeSpeed();
    this.changeList();
  },
  methods: {
    changeDisMode(mode) {
      this.dis_mode = mode;
    },
    triggRight() {
      this.hide_right = !this.hide_right;
    },
    copyText(text) {
      copyWord(text);
    },
    clearTotal() {
      setTimeout(() => {
        this.totalIndex = "";
      });
    },
    quizCheck(row, index, qw) {
      row.quiz_word = qw;
      let quiz_word = row.quiz_word.toLowerCase();
      let text = row.text.toLowerCase();
      if (quiz_word.trim() == text.trim()) {
        this.$message({
          message: "passed",
          type: "success",
          duration: 500,
        });
        // row.quiz_word = "";
        this.totalIndex = parseInt(index, 10) + 1;
        return true;
      } else {
        this.$message({
          message: "no passed",
          type: "warning",
          duration: 500,
        });
      }
    },
    rquiz() {
      this.quizing = false;
      this.hidecn = true;
    },
    cquiz() {
      this.quizing = true;
      this.hidecn = false;
    },
    changeList() {
      let value = this.value;
      localStorage.setItem("value", value);
      let list = this[value];
      let str = this.getStr("readed");
      let hstr = this.getStr("harded");
      list.forEach((v, k) => {
        v.quiz_word = "";
        v.single_show = false;
        v.show_myself = true;
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
    subGo(key_word) {
      this.key_word = key_word;
      this.goIndex();
    },
    selChange(value) {
      this.value = value;
      this.changeList();
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
      let text = this.text; // url 参数，用作滚动
      this.tranData = deepCopy(this.origTranData, []);
      this.$nextTick(() => {
        text && this.findIndex(text);
      });
    },
    goNoteWithParam(row) {
      let text = row.text;
      this.$router.push({ name: "note", query: { text } });
    },
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
    dic(text) {
      text = text.trim();
      if (text.indexOf(" ") >= 0) {
        return "javascript:;";
      }
      return `https://sentence.yourdictionary.com/${text}`;
    },
    bab(text) {
      text = text.trim();
      text = text.replace(/\s+/g, "-");
      return `https://en.bab.la/sentences/english/${text}`;
    },
    leng(text) {
      text = text.trim();
      text = text.replace(/\s+/g, "%20");
      return `https://lengusa.com/sentence-examples/${text}`;
    },
    coli(text) {
      text = text.trim();
      text = text.replace(/\s+/g, "-");
      return `https://www.collinsdictionary.com/sentences/english/${text}`;
    },
    stac(text) {
      text = text.trim();
      text = text.replace(/\s+/g, "_");
      return `https://sentencestack.com/q/${text}`;
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
    changeSpeed(speed) {
      // https://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp
      let speedWord = speed || this.speedWord;
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
    goIndex() {
      this.findIndex();
    },
    findIndex(text) {
      let key_word = text || this.form.key_word;
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
    getStr(str) {
      return localStorage.getItem(str) || "";
    },
    setHeaded(row) {
      let text = row.text; /* .replace(/\s/g, "") */
      let str = this.getStr("harded");
      /* if (str.split(",").length >= 10) {
        return this.$message.warning("已经有10个了");
      } */
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
    handlerClick() { },
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
    // display: flex;
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

      &>div {
        margin-bottom: 10px;
      }
    }

    .buttons {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      padding-right: 15px;

      &>button {
        flex-basis: 30px;
        flex-shrink: 0;
      }
    }
  }

  .head-content {
    height: 100%;
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
          background: url(~@/assets/images/index/float-left-cion.svg) center center/100% 100% no-repeat;
          left: -30px;
          top: 9px;
        }

        &::after {
          content: "";
          display: inline-block;
          width: 20px;
          height: 18px;
          position: absolute;
          background: url(~@/assets/images/index/float-right-icon.svg) center center/100% 100% no-repeat;
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
      }
    }
  }
}
</style>

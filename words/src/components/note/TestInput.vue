<template>
  <div class="hello" v-show="quizing">
    <el-input :enterkeyhint="'done'" v-model="quiz_word" clearable :ref="'quiz'" :id="'a' + index + 'quizel'"
      @focus="clearTotal" @keyup.enter.native="sub(row, index)">
      <el-button slot="append">tri</el-button>
    </el-input>
  </div>
</template>

<script>
import { favoriteObj, keyObj } from "@/util/dbFunc";
export default {
  data() {
    return {
      quiz_word: "",
    };
  },
  props: [
    "quizCheck",
    "row",
    "index",
    "quizing",
    "totalIndex",
    "fc",
    "clearTotal",
    "quizDb",
  ],
  watch: {
    fc: {
      handler(editForm, oldName) {
        if (this.fc) {
          this.selfFocus();
        }
      },
      deep: true,
    },
  },
  methods: {
    sub(row, index) {
      if (this.$store.state.toDbOrNot) {
        this.updateToDb(row, index);
      } else {
        this.quiz(row, index);
      }
    },
    quiz(row, index) {
      let res = this.quizCheck(row, index, this.quiz_word);
      res && (this.quiz_word = "");
    },
    updateToDb(row, index) {
      this.quizDb(row, index, this.quiz_word);
      this.quiz_word = ""
    },
    selfFocus() {
      document
        .querySelector(`#a${this.index}quizel`)
        .scrollIntoView({ block: "center", inline: "nearest" });
      this.$refs[`quiz`].focus();
    },
  },
};
</script>

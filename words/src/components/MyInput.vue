<template>
  <div class="hello">
    <el-input :enterkeyhint="'done'" v-model="quiz_word" clearable :ref="'quiz'" v-show="quizing" @focus="clearTotal"
      @keyup.enter.native="sub(row, index)">
      <el-button slot="append" @click="row.single_show = !row.single_show">trig</el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quiz_word: "",
    };
  },
  props: ["quizCheck", "row", "index", "quizing", "totalIndex", "fc", "clearTotal"],
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
      this.quizCheck(row, index, this.quiz_word);
    },
    selfFocus() {
      this.$refs[`quiz`].focus();
    },
  },
};
</script>

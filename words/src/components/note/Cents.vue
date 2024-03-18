<template>
  <div style="display: flex; gap: 15px" :id="'abc' + scope.row.id">
    <!-- start left -->
    <div class="left" style="flex-grow: 1">
      <span style="color: red; margin-right: 5px" v-if="scope.$index % 4 === 0">{{ scope.$index / 4 }}*</span>

      <testInput :quizCheck="quizCheck" :row="scope.row" :index="scope.$index" :quizing="quizing"
        :totalIndex="totalIndex" :fc="totalIndex === scope.$index" :clearTotal="clearTotal" :quizDb="quizDb">
      </testInput>

      <p v-html="scope.row.word.replace(/    /g, '&nbsp;&nbsp;&nbsp;&nbsp;')"
        :style="makeShowObj(hideen)"></p>
      <p v-if="scope.row.tran" v-html="scope.row.tran" :style="makeShowObj(hidecn)"></p>
    </div>
    <!-- start left -->
    <div class="right" v-show="!hide_right">
      <div style="display: flex; flex-direction: column">
        <el-button type="text" v-show="!scope.row.notRead" :key="'read'" size="mini" @click="NotRead(scope.row)"
          style="margin-left: 0px; margin-bottom: 5px">noread</el-button>
        <el-button type="text" size="mini" @click="delFromDb(scope.row)"
          style="margin-left: 0px; margin-bottom: 5px">del</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import testInput from "./TestInput";
export default {
  components: {
    testInput
  },
  data() {
    return {};
  },
  props: ["makeShowObj", "scope", "hideen", "hidecn", "NotRead", "delFromDb", "hide_right", "quizing", "quizCheck", "totalIndex", "clearTotal", "quizDb"],
  methods: {

  },
};
</script>
<style lang="less" scoped></style>

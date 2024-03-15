<template>
  <div class="right">
    <div
      style="display: flex; flex-direction: column"
      :style="makeShowObj(hide_right, 'flex')"
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
      <!-- <el-button
                      size="mini"
                      @click="playBen(scope.row)"
                      style="margin-left: 0px; margin-bottom: 5px"
                      >B-En</el-button
                    >
                    <el-button
                      size="mini"
                      @click="playBus(scope.row)"
                      style="margin-left: 0px; margin-bottom: 10px"
                      >B-Us</el-button
                    > -->
      <el-button
        type="text"
        size="mini"
        @click="loopPlay(scope.row)"
        style="margin-left: 0px"
        >loop</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: [
    "hide_right",
    "scope",
    "makeShowObj",
    "setReaded",
    "setHeaded",
    "setIndexText",
    "delCur",
    "loopPlay",
  ],
  methods: {},
};
</script>
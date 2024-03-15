<template>
  <span>
    <a
      :href="dic(scope.row.text)"
      target="_blank"
      style="margin-right: 20px; cursor: pointer; color: #4131d4"
      >dic</a
    >
    <a
      :href="stac(scope.row.text)"
      style="margin-right: 20px; cursor: pointer; color: #4131d4"
      >stac</a
    >
    <!-- <a
                      :href="coli(scope.row.text)"
                      style="
                        margin-right: 20px;
                        cursor: pointer;
                        color: #4131d4;
                      "
                      >coli</a
                    > -->
    <!-- <a
                      :href="leng(scope.row.text)"
                      style="
                        margin-right: 20px;
                        cursor: pointer;
                        color: #4131d4;
                      "
                      >leng</a
                    >
                    <a
                      :href="bab(scope.row.text)"
                      style="
                        margin-right: 20px;
                        cursor: pointer;
                        color: #4131d4;
                      "
                      >bab</a
                    > -->
    <el-button type="text" @click="goNoteWithParam(scope.row)">cen</el-button>
    <el-button
      v-if="!scope.row.harded"
      type="text"
      @click="setHeaded(scope.row)"
      >hd</el-button
    >
    <el-button type="text" @click="copyText(scope.row.text)">cp</el-button>
  </span>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["scope", "copyText", "dic", "stac", "goNoteWithParam", "setHeaded"],
  methods: {},
};
</script>
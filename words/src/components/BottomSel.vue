<template>
  <div>
    <el-input style="margin-top: 10px" v-model="key_word" size="medium" placeholder="EN-Word">
      <el-select size="medium" v-model="value" placeholder="请选择" slot="prepend" style="width: 80px"
        @change="changeList(value)">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button slot="append" @click="goIndex(key_word)">find</el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      key_word: localStorage.getItem("keyword_word") || "",
      value: localStorage.getItem("value") || "yuren",
    };
  },
  props: ["goIndex", "options", "changeList"],
  methods: {},
};
</script>
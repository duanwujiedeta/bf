<template>
  <div class="header">
    <div v-if="show_left" class="left-setting">
      <div>
        <el-input style="margin-top: 10px" v-model="note_keyword" size="medium" placeholder="EN-Word">
          <el-select size="medium" v-model="value" placeholder="请选择" slot="prepend" style="width: 80px"
            @change="subChange(value)">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button slot="append" @click="subFind(note_keyword)">find</el-button>
        </el-input>
      </div>
    </div>
    <el-button @click="show_left = !show_left" type="text" style="min-width: 30px">{{ show_left ? "《《" : "》》"
      }}</el-button>
    <div class="buttons">
      <el-button @click="rquiz" type="text" style="flex-basis: 25px; margin-left: 10px">quiz</el-button>

      <el-button @click="cquiz" type="text" style="flex-basis: 25px; margin-left: 10px">cquiz</el-button>

      <el-button @click="$store.state.toDbOrNot = !$store.state.toDbOrNot" type="text"
        style="flex-basis: 45px; margin-left: 10px">{{ $store.state.toDbOrNot ? 'cur db' : 'cur qz' }}</el-button>

      <el-button @click="backHome" type="text" style="flex-basis: 25px; margin-left: 10px">home</el-button>

      <el-button @click="getAllDbData" type="text" style="flex-basis: 25px; margin-left: 10px">db</el-button>

      <el-button @click="changeList" type="text" style="flex-basis: 25px; margin-left: 10px">all</el-button>

      <el-button @click="triggerPs" type="text" style="flex-basis: 25px; margin-left: 10px">stg</el-button>

      <el-button @click="triggerEn" type="text" style="flex-basis: 25px; margin-left: 10px">en</el-button>

      <el-button @click="triggerCn" type="text" style="flex-basis: 25px; margin-left: 10px">cn</el-button>

      <el-button @click="triggerRight" type="text" style="flex-basis: 25px; margin-left: 10px">rig</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show_left: false,
      note_keyword: localStorage.getItem("mem_keyword_word") || "",
      value: localStorage.getItem("mem_value") || "linking",
    };
  },
  props: ["makeShowObj", "triggerCn", "triggerEn", "changeList", "getAllDbData", "backHome", "subFind", "options", "subChange", "triggerRight", "rquiz", "cquiz", "triggerPs"],
  methods: {},
};
</script>
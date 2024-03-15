<template>
  <div>
    <el-select
      size="medium"
      v-model="speedWord"
      placeholder="速度"
      slot="prepend"
      style="width: 80px"
      @change="changeSpeed(speedWord)"
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
      >len</el-button
    >
    <el-button
      @click="triggRight"
      type="text"
      style="flex-basis: 20px; margin-left: 10px"
      >rig</el-button
    >
    <el-button
      @click="search"
      type="text"
      style="flex-basis: 20px; margin-left: 10px"
      >all</el-button
    >
    <span>
      dis
      <el-switch
        v-model="dis_mode"
        :active-value="true"
        :inactive-value="false"
        @change="changeDisMode(dis_mode)"
      >
        loop
      </el-switch>
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      speedWord: 2,
      dis_mode: true,
    };
  },
  props: [
    "changeSpeed",
    "speedOpt",
    "msgLength",
    "triggRight",
    "search",
    "changeDisMode",
  ],
  methods: {},
};
</script>


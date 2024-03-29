<template>
  <div>
    <!-- words -->
    <div v-if="scope.row.results.BingDictWeb &&
      scope.row.results.BingDictWeb.dict &&
      !scope.row.results.BingDictWeb.error
      ">
      <div style="cursor: pointer" @click="openNew(scope.row.results.BingDictWeb.link)"
        :style="makeShowObj(!show_myself ? show_myself : hidensp)">
        必应辞典
      </div>
      <p :style="makeShowObj(!show_myself ? show_myself : hidensp)">
        <span v-for="(ditem, dindex) in scope.row.results.BingDictWeb.phonetic" :key="dindex">
          {{ ditem.name }}/{{ ditem.value }}/
        </span>
      </p>
      <p v-for="(item, index) in scope.row.results.BingDictWeb.dict" :key="index"
        :style="makeShowObj(!show_myself ? show_myself : hidecn)">
        <span v-for="(ditem, dindex) in item.terms" :key="dindex">
          <span>{{ item.pos }} </span>
          <span> {{ ditem }}{{ dindex - 1 == ditem.length ? "" : "," }} </span>
        </span>
      </p>
    </div>
    <!-- end words -->
    <!-- cens -->
    <div v-else-if="scope.row.results.DeepLWeb &&
      scope.row.results.DeepLWeb.dict &&
      !scope.row.results.DeepLWeb.error
      ">
      <div :style="makeShowObj(show_myself ? show_myself : hidensp)">deepl辞典</div>
      <p v-for="(item, index) in scope.row.results.DeepLWeb.dict" :key="index"
        :style="makeShowObj(!show_myself ? show_myself : hidecn)">
        <span v-for="(ditem, dindex) in item.terms" :key="dindex">
          <span> {{ ditem }}{{ dindex - 1 == ditem.length ? "" : "," }} </span>
        </span>
      </p>
    </div>
    <div v-else-if="scope.row.results.DeepLWeb && scope.row.results.DeepLWeb.result
      ">
      <div :style="makeShowObj(show_myself ? show_myself : hidensp)">deepl辞典</div>
      <p :style="makeShowObj(!show_myself ? show_myself : hidecn)">
        <span v-for="(ditem, dindex) in scope.row.results.DeepLWeb.result" :key="'deepl' + dindex">
          <!-- <span>{{ item.pos }} </span> -->
          <span>
            {{ ditem
            }}{{
      dindex == scope.row.results.DeepLWeb.result.length - 1 ? "" : ","
    }}
          </span>
        </span>
      </p>
    </div>
    <!-- end cens -->
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["makeShowObj", "scope", "hidecn", "hidensp", "show_myself"],
  methods: {},
};
</script>

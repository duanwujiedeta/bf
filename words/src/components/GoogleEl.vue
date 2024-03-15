<template>
  <div>
    <!-- words -->
    <div
      :style="makeShowObj(hidecn)"
      v-if="scope.row.results.GoogleWeb.dict"
      style="
        border-bottom: 1px solid #cccccc;
        margin-bottom: 5px;
        padding-bottom: 5px;
      "
    >
      <div>Google词典</div>
      <p v-for="(item, index) in scope.row.results.GoogleWeb.dict" :key="index">
        <span v-for="(ditem, dindex) in item.terms" :key="dindex">
          <span>{{ item.pos }} </span>
          <span> {{ ditem }}{{ dindex - 1 == ditem.length ? "" : "," }} </span>
        </span>
      </p>
    </div>
    <!-- end words -->
    <!-- cens -->
    <div
      :style="makeShowObj(hidecn)"
      v-else
      style="
        border-bottom: 1px solid #cccccc;
        margin-bottom: 5px;
        padding-bottom: 5px;
      "
    >
      <div>Google词典</div>
      <p>
        <span
          v-for="(ditem, dindex) in scope.row.results.GoogleWeb.result"
          :key="'goo' + dindex"
        >
          <span>{{ ditem }} </span>
          <span
            >{{
              dindex == scope.row.results.GoogleWeb.result.length - 1 ? "" : ","
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
  props: [
    "makeShowObj",
    "scope",
    "hidecn",
  ],
  methods: {},
};
</script>


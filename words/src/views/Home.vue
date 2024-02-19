<template>
  <div class="home">
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  watch: {
    login(newVal) {
      if (newVal) {
        this.$router.replace({ name: "admin" });
      }
    }
  },
  computed: {
    ...mapGetters(["login"])
  }
};
</script>

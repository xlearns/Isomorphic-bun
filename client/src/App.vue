<script setup lang="ts">
import api from "@/utils/api";

(async () => {
  const res = await api.test.login("test", "123");
  console.log(res);
})();
</script>

<template></template>

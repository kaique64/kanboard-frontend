<template>
  <div class="drop-zone">

  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const items = ref([
  {
    id: 0,
    title: 'Item A',
    list: 1,
  },
  {
    id: 1,
    title: 'Item B',
    list: 1,
  },
  {
    id: 2,
    title: 'Item C',
    list: 2,
  },
]);
</script>
<style scoped>
.drop-zone {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
}

.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}
</style>


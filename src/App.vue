<template>
  <div class="row justify-center items-start full-width">
    <Kanban group-name="kanboard" />
  </div>
</template>
<script setup lang="ts">
import Kanban from './modules/kanban/component/Kanban.vue';
</script>
<style scoped>
.placeholder {
  background: rgba(0, 0, 0);
  border-radius: 0.4rem;
}
</style>


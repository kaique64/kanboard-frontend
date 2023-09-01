<template>
  <div class="text-h3">Hello</div>
  {{ store.text }}
</template>
<script setup lang="ts">
import { Test } from './store/teststore'

const store = Test()
</script>

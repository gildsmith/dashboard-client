<script setup lang="ts">
defineProps(['text'])

</script>

<template>
<div class="badge">
    <div class="dot"></div>
    <div class="text">{{ text }}</div>
</div>
</template>

<style scoped>
.badge {
    @apply inline-flex items-center gap-1.5 border py-0.5 px-1.5 rounded shadow-xs;
}

.dot {
    @apply h-1.5 w-1.5 rounded-full bg-emerald-600;
}

.text {
    @apply text-sm;
}
</style>
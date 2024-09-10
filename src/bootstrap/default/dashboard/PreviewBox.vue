<script setup>
/* ---------------------------------------------------------------------------
 | Preview Box
 | ---------------------------------------------------------------------------
 | This static element alerts users that the current version is still
 | in development and not stable. It will be removed once Gildsmith has
 | all key features implemented and passes thorough testing.
 */
</script>

<template>
    <div class="preview-box">
        <div class="preview-box-header">Preview!</div>
        <div>Welcome to Gildsmith! You're currently exploring an early version of our platform. Please avoid using it for production purposes.</div>
    </div>
</template>

<style scoped>
.preview-box {
    @apply m-4 p-4 rounded-lg bg-flint-50 text-flint-600 text-sm;
}

.preview-box-header {
    @apply font-semibold text-malachite-600;
}

.dashboard--navigation-folded .preview-box {
    @apply hidden;
}
</style>
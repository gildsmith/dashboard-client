<script setup>
import {IconMoodPuzzled, IconRefresh} from '@tabler/icons-vue'

defineProps(['status', 'error'])
const emits = defineEmits(['refresh'])
</script>

<template>
    <div v-if="['idle', 'submitting'].includes(status)" class="loading-container">
        <div v-for="i in 4" :key="i" class="line"></div>
    </div>
    <div v-if="['error'].includes(status)" class="error-container">
        <IconMoodPuzzled size="16" stroke="2"/>
        <span class="statusHandleFailureMessage">{{ error }}</span>
        <div class="statusHandleFailureRefresh" @click="emits('refresh')">
            <IconRefresh size="16" stroke="2"/>
        </div>
    </div>
</template>

<style scoped>
.loading-container {
    @apply animate-pulse grid gap-4 grid-cols-3;
}

.line {
    @apply h-2 bg-slate-300 rounded-full col-span-3;
}

.line:first-of-type {
    @apply col-span-1 mb-4;
}

.line:last-of-type {
    @apply col-span-2;
}

.error-container {
    @apply flex items-center gap-4 p-4 bg-white border;
}

.statusHandleFailureMessage {
    @apply flex-1;
}

.statusHandleFailureRefresh {
    @apply p-3 bg-white rounded border cursor-pointer;
    @apply hover:bg-slate-100;
}
</style>
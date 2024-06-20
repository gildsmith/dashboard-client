<script setup>
import {IconMoodPuzzled, IconRefresh} from '@tabler/icons-vue'

defineProps(['error'])
const emits = defineEmits(['refresh'])
</script>

<template>
    <div class="statusHandleFailureContainer">
        <div>
            <IconMoodPuzzled size="16" stroke="2"/>
        </div>
        <span class="statusHandleFailureMessage">{{ error }}</span>
        <div class="statusHandleFailureRefresh" @click="emits('refresh')">
            <IconRefresh size="16" stroke="2"/>
        </div>
    </div>
</template>

<style scoped>
.statusHandleFailureContainer {
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
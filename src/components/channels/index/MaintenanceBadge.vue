<script setup>
import {IconFlag} from '@tabler/icons-vue'

defineProps(['channel'])
</script>

<template>
    <div v-if="channel.maintenance" class="maintenance">
        <div>
            <IconFlag size="16" stroke="2"/>
        </div>
        <span>
            This channel is currently in maintenance mode. It cannot be
            accessed by anyone but authenticated administrators.
        </span>
    </div>
</template>

<style scoped>

.maintenance {
    @apply flex items-center gap-2 px-4 py-3 bg-slate-950 text-white text-sm;
}
</style>
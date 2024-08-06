<script setup>
import {IconFlag} from '@tabler/icons-vue'
import {useI18n} from 'vue-i18n'

defineProps(['channel'])
const {t} = useI18n()
</script>

<template>
    <div v-if="channel.maintenance" class="maintenance">
        <IconFlag size="16" stroke="2"/>
        <span>{{ t('This channel is currently in maintenance mode. It cannot be accessed by anyone but authenticated administrators.') }}</span>
    </div>
</template>

<style scoped>

.maintenance {
    @apply flex items-center gap-2 px-4 py-3 bg-slate-950 text-white text-sm;
}
</style>
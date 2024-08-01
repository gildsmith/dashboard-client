<script setup>
import {IconSettings2} from '@tabler/icons-vue'
import MaintenanceBadge from './MaintenanceBadge.vue'
import {useI18n} from 'vue-i18n'

/*
 | ---------------------------------------------------------------------------
 | Channel Card Component
 | ---------------------------------------------------------------------------
 | This component presents essential information about a single channel
 | and provides actions for editing and deleting the channel.
 */

defineProps(['channel'])
const {t} = useI18n()
</script>

<template>
    <div class="list">
        <div class="list-item">
            <div class="channel-text-wrapper">
                <div class="channel-name">
                    <div class="channel-id">#{{ channel.id }}</div>
                    <h2 class="subheader">{{ t(channel.name) }}</h2>
                </div>
                <div v-if="channel.description" class="channel-description footnote">{{ t(channel.description) }}</div>
            </div>
            <RouterLink :to="{ name: 'dashboard.channels.show', params: { id: channel.id }}" class="channel-edit">
                <IconSettings2 size="16" stroke="2"/>
                <span>{{ t('Edit') }}</span>
            </RouterLink>
        </div>
        <MaintenanceBadge :channel="channel"/>
    </div>
</template>

<style scoped>
.channel-text-wrapper {
    @apply flex flex-col gap-2;
}

.channel-edit {
    @apply flex gap-2 items-center text-sm border border-slate-100 text-slate-950 py-2 px-4 rounded-full;
    @apply hover:bg-slate-100;
}

.channel-id {
    @apply text-xs font-semibold text-slate-500;
}

.channel-name {
    @apply flex items-center gap-2;
}

.channel-description {
    @apply max-w-96;
}
</style>
<script setup>
import {IconCircleCheckFilled, IconFlagFilled, IconSettings2} from '@tabler/icons-vue'
import {useI18n} from 'vue-i18n'

import ChannelCardAvatar from './ChannelCardAvatar.vue'

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
    <div class="channel-card">
        <div class="channel-details">
            <div class="channel-header">
                <ChannelCardAvatar :id="channel.id" :name="channel.name"/>
                <div class="channel-identity">
                    <div class="channel-name">{{ t(channel.name) }}</div>
                    <div class="channel-id">{{ t('Channel ID:') }} {{ channel.id }}</div>
                </div>
            </div>
            <div>
                <IconCircleCheckFilled v-if="!channel.maintenance" class="channel-status--active" size="16" stroke="2"/>
                <IconFlagFilled v-else class="channel-status--maintenance" size="16" stroke="2"/>
            </div>
        </div>
        <div v-if="channel.description" class="channel-description footnote">{{ t(channel.description) }}</div>
        <div class="channel-actions">
            <RouterLink :to="{ name: 'dashboard.channels.show', params: { id: channel.id }}" class="button">
                <IconSettings2 size="16" stroke="2"/>
                <span>{{ t('Edit') }}</span>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.channel-card {
    @apply bg-white rounded-md shadow;
}

.channel-details {
    @apply m-4 flex gap-4;
}

.channel-header {
    @apply flex gap-3 items-center flex-1;
}

.channel-name {
    @apply font-semibold text-lg truncate max-w-48;
}

.channel-id {
    @apply text-xs text-slate-600;
}

.channel-description {
    @apply m-4;
}

.channel-status--active {
    @apply text-emerald-500;
}

.channel-status--maintenance {
    @apply text-amber-500;
}

.channel-actions {
    @apply p-4 flex border-t border-slate-100;
}
</style>
<!--suppress CssUnusedSymbol -->

<script setup>
import {IconSettings2} from '@tabler/icons-vue'
import LanguageSticker from './stickers/LanguageSticker.vue'
import CurrencySticker from './stickers/CurrencySticker.vue'
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
    <div class="channelCardContainer">
        <div class="channelCard">
            <div class="channelEssentials">
                <div class="channelHeader">
                    <div class="channelNameContainer">
                        <div class="channelId">#{{ channel.id }}</div>
                        <h1 class="channelName header">{{ t(channel.name) }}</h1>
                    </div>
                    <div v-if="channel.description" class="channelDescription">{{ t(channel.description) }}</div>
                </div>
                <RouterLink :to="{ name: 'dashboard.channels.show', params: { id: channel.id }}" class="channelEditButton">
                    <IconSettings2 size="16" stroke="2"/>
                    <span>{{ t('Edit') }}</span>
                </RouterLink>
            </div>
            <div class="channelStickersContainer">
                <LanguageSticker :channel="channel"/>
                <CurrencySticker :channel="channel"/>
            </div>
        </div>
        <MaintenanceBadge :channel="channel"/>
    </div>
</template>

<style scoped>
.channelCardContainer {
    @apply border;
}

.channelCard {
    @apply grid bg-white;
}

.channelEssentials {
    @apply p-4 flex gap-4 items-start justify-between;
}

.channelHeader {
    @apply flex flex-col gap-2;
}

.channelEditButton {
    @apply flex gap-2 items-center text-sm border border-slate-100 text-slate-950 py-2 px-4 rounded-full;
    @apply hover:bg-slate-100;
}

.channelNameContainer {
    @apply flex items-center gap-2;
}

.channelId {
    @apply text-xs font-semibold text-slate-500;
}

.channelName {
    @apply text-xl;
}

.channelDescription {
    @apply text-sm max-w-96;
}

.channelActions {
    @apply flex gap-2 flex-wrap;
}

.channelStickersContainer {
    @apply grid grid-cols-2;
}
</style>
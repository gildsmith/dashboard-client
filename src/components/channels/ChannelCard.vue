<!--suppress CssUnusedSymbol -->

<script setup>
import LanguageSticker from './stickers/LanguageSticker.vue'
import CurrencySticker from './stickers/CurrencySticker.vue'
import MaintenanceBadge from './MaintenanceBadge.vue'
import DeleteChannelButton from './DeleteChannelButton.vue'

/*
 | ---------------------------------------------------------------------------
 | Channel Card Component
 | ---------------------------------------------------------------------------
 | This component presents essential information about a single channel
 | and provides actions for editing and deleting the channel.
 */

defineProps(['channel'])
</script>

<template>
    <div class="channelCardContainer">
        <div class="channelCard">
            <div class="channelEssentials">
                <div class="channelHeader">
                    <div class="channelId">#{{ channel.id }}</div>
                    <h1 class="channelName">{{ channel.name }}</h1>
                </div>
                <div v-if="channel.description" class="channelDescription">{{ channel.description }}</div>
                <div class="channelActions">
                    <RouterLink :to="{ name: 'dashboard.channels.show', params: { channel: channel.id }}" class="button">Edit</RouterLink>
                    <DeleteChannelButton :channel="channel"/>
                </div>
            </div>
            <div class="channelStickersContainer">
                <LanguageSticker :channel="channel"/>
                <CurrencySticker :channel="channel"/>
            </div>
        </div>
        <MaintenanceBadge/>
    </div>
</template>

<style>
.channelCardContainer {
    @apply border;
    @apply dark:border-slate-700;
}

.channelCard {
    @apply grid bg-white;
    @apply dark:bg-slate-700;
}

.channelEssentials {
    @apply p-4 flex flex-col gap-2;
}

.channelHeader {
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

/* Common Stickers Styles */
.channelSticker {
    @apply dark:bg-slate-800;
    @apply flex flex-col justify-center gap-1 p-4 bg-slate-50;
}

.channelStickerHeader {
    @apply flex items-center gap-1;
}

.channelStickerIcon {
    @apply text-slate-500;
}

.channelStickerName {
    @apply text-base;
}

.channelStickerDescription {
    @apply text-sm;
}
</style>
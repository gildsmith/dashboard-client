<!--suppress CssUnusedSymbol -->

<script setup>
import ProtectionFull from './ChannelStickers/ProtectionFull.vue'
import ScopePublic from './ChannelStickers/ScopePublic.vue'
import LanguagesTotal from './ChannelStickers/LanguagesTotal.vue'
import CurrenciesTotal from './ChannelStickers/CurrenciesTotal.vue'
import MaintenanceBadge from './MaintenanceBadge.vue'

defineProps(['channel'])
</script>

<template>
    <div class="channelCardContainer">
        <div class="channelCard">
            <div class="channelEssentials">
                <h1 class="channelName">{{ channel.name }}</h1>
                <div v-if="channel.description" class="channelDescription">{{ channel.description }}</div>
                <div class="channelActions">
                    <RouterLink :to="{ name: 'dashboard.channels.show', params: { channel: channel.id }}" class="button">Edit</RouterLink>
                </div>
            </div>
            <!-- todo these should depend on channel configuration -->
            <div class="channelStickersContainer">
                <ProtectionFull/>
                <ScopePublic/>
                <LanguagesTotal/>
                <CurrenciesTotal/>
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
    @apply grid gap-16 grid-cols-2 bg-white;
    @apply dark:bg-slate-700;
}

.channelEssentials {
    @apply p-4 flex flex-col gap-2;
}

.channelSticker {
    @apply bg-slate-50;
    @apply dark:bg-slate-800;
}

.channelName {
    @apply text-xl;
}

.channelActions {
    @apply flex gap-2 flex-wrap;
}

.channelStickersContainer {
    @apply grid grid-cols-1;
}

.channelSticker {
    @apply flex items-center gap-4 p-4;
}

.channelStickerHeader {
    @apply flex flex-col gap-0;
}

.channelStickerName {
    @apply text-base;
}

.channelStickerDescription {
    @apply text-sm;
}
</style>
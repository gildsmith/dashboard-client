<script setup>
import {useI18n} from 'vue-i18n'

defineProps(['channel'])
const {t} = useI18n()
</script>

<template>
    <div class="section">
        <div class="channelNameContainer">
            <div class="channelId">#{{ channel.id }}</div>
            <h1 class="header">{{ t(channel.name) }}</h1>
        </div>
        <!-- todo programme contenteditable description and name -->
        <div class="description">{{ t(channel.description || 'Click to add description...') }}</div>
    </div>
</template>

<style scoped>
.channelNameContainer {
    @apply flex items-center gap-2;
}

.channelId {
    @apply text-xs font-semibold text-flint-500;
}
</style>
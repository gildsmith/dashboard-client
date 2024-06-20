<script setup>
import {IconLanguage} from '@tabler/icons-vue'
import {useI18n} from 'vue-i18n'

defineProps(['channel'])
const {t} = useI18n()
</script>

<template>
    <div class="channelSticker">
        <div class="channelStickerHeader">
            <div class="channelStickerIcon">
                <IconLanguage size="16" stroke="2"/>
            </div>
            <h2 class="channelStickerName">{{ t('Languages') }}</h2>
        </div>
        <span class="channelStickerDescription">
            {{ t('Default language is') }}
            {{ t('language.' + channel.default_language.code.toLowerCase()) }}
            ({{ channel.default_language.code.toUpperCase() }}).
            {{ t('Total supported languages:') }}
            {{ channel.languages.length }}
        </span>
    </div>
</template>

<style scoped>
.channelSticker {
    @apply flex flex-col justify-center gap-1 p-4 bg-slate-50;
}

.channelStickerHeader {
    @apply flex items-center gap-1;
}

.channelStickerIcon {
    @apply text-slate-500;
}

.channelStickerName {
    @apply font-medium;
}

.channelStickerDescription {
    @apply text-sm;
}
</style>
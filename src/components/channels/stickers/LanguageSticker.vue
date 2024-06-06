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
            <h2 class="channelStickerName">Languages</h2>
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
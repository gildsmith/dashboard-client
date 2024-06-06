<script setup>
import {IconCurrencyEuro} from '@tabler/icons-vue'
import {useI18n} from 'vue-i18n'

defineProps(['channel'])
const {t} = useI18n()
</script>

<template>
    <div class="channelSticker">
        <div class="channelStickerHeader">
            <div class="channelStickerIcon">
                <IconCurrencyEuro size="16" stroke="2"/>
            </div>
            <h2 class="channelStickerName">Currencies</h2>
        </div>
        <span class="channelStickerDescription">
            {{ t('Default currency is') }}
            {{ t('currency.' + channel.default_currency.code.toLowerCase()) }}
            ({{ channel.default_currency.code }}).
            {{ t('Total supported currencies:') }}
            {{ channel.currencies.length }}
        </span>
    </div>
</template>
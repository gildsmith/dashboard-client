<script setup>
import MatrixCell from './ChannelsMatrix/MatrixCell.vue'
import MatrixAddLanguage from './ChannelsMatrix/MatrixAddLanguage.vue'
import MatrixAddCurrency from './ChannelsMatrix/MatrixAddCurrency.vue'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
defineProps(['channel'])

function key(l, c) {
    return [l, c].join('-')
}
</script>

<template>
    <div class="channelMatrixContainer">
        <table class="channelMatrixTable">
            <tr class="row">
                <td class="placeholder"/>
                <th v-for="(currency, key) in channel.currencies" :key="key" class="currency">
                    <div>{{ t('currency.' + currency.code.toLowerCase()) }}</div>
                    <div>({{ currency.code }})</div>
                </th>
                <MatrixAddCurrency :span="channel.languages.length + 1" :channel="channel"/>
            </tr>
            <tr class="row" v-for="(language, l) in channel.languages" :key="language">
                <th class="language">{{ t('language.' + language.code) }}</th>
                <MatrixCell v-for="(currency, c) in channel.currencies" :key="key(l, c)" :currency="currency" :language="language"/>
            </tr>
            <tr>
                <MatrixAddLanguage :span="channel.currencies.length + 1" :channel="channel"/>
            </tr>
        </table>
    </div>
</template>

<style scoped>
.channelMatrixContainer {
    @apply overflow-x-auto max-w-full border-collapse;
}

.channelMatrixTable {
    @apply min-w-max overflow-x-scroll table-fixed rounded;
}

.row {
    @apply h-16;
}

.currency {
    @apply px-4 whitespace-nowrap border border-blue-100;
}

.language {
    @apply bg-blue-100 sticky left-0 text-center px-4;
}

.placeholder {
    @apply bg-blue-100;
}
</style>
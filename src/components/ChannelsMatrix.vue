<script setup>
import MatrixCell from './ChannelsMatrix/MatrixCell.vue'
import DetachableCurrencyCell from './ChannelsMatrix/DetachableCurrencyCell.vue'
import AttachCurrencyCell from './ChannelsMatrix/AttachCurrencyCell.vue'
import DetachableLanguageCell from './ChannelsMatrix/DetachableLanguageCell.vue'
import AttachLanguageCell from './ChannelsMatrix/AttachLanguageCell.vue'

defineProps(['channel'])

function key(l, c) {
    return [l, c].join('-')
}
</script>

<template>
    <div class="channelMatrixContainer">
        <table class="channelMatrixTable">
            <tr class="row">
                <td class="placeholder" data-col="1">Language</td>
                <DetachableCurrencyCell v-for="(currency, key) in channel.currencies" :key="key" :currency="currency"/>
                <AttachCurrencyCell :channel="channel" :span="channel.languages.length + 1"/>
            </tr>
            <tr class="row" v-for="(language, l) in channel.languages" :key="language">
                <DetachableLanguageCell :language="language"/>
                <MatrixCell v-for="(currency, c) in channel.currencies" :key="key(l, c)" :currency="currency" :language="language"/>
            </tr>
            <tr>
                <AttachLanguageCell/>
            </tr>
        </table>
    </div>
</template>

<style scoped>
.channelMatrixContainer {
    @apply overflow-x-auto max-w-full border-collapse;
}

.channelMatrixTable {
    @apply min-w-max overflow-x-scroll table-fixed;
}

.row {
    @apply h-16;
}

.currency {
    @apply px-4 whitespace-nowrap border;
}

.placeholder,
.language {
    @apply sticky left-0 text-center px-4 border bg-white z-50;
}

</style>
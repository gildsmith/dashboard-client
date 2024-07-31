<script setup>
import {useI18n} from 'vue-i18n'
import {useChannelAttachments} from '../../../composables/channels/channelAttachments.ts'
import {useChannelsStore} from '../../../stores/channels.js'
import {useDatasetsStore} from '../../../stores/datasets.js'
import {computed} from 'vue'
import {IconTrash} from '@tabler/icons-vue'
import SearchableDropdown from '../../inputs/SearchableDropdown.vue'

const {t} = useI18n()
const props = defineProps(['channel'])
const {attachCurrency, detachCurrency} = useChannelAttachments()
const channelsStore = useChannelsStore()
const datasetsStore = useDatasetsStore()
datasetsStore.fetchCurrencies()

const currentCurrencies = computed(() => props.channel.currencies.map(currencies => currencies.id))

const currencies = computed(() => {
    return datasetsStore.currencies
        .filter(currency => !currentCurrencies.value.includes(currency.id))
        .map(currency => {
            let translatedName = t('currency.' + currency.code.toLowerCase())
            return {
                name: translatedName,
                value: currency.id,
                tokens: [translatedName, currency.code],
            }
        })
})

async function attach(currencyId) {
    const response = await attachCurrency(props.channel.id, currencyId)
    await channelsStore.upsert(response)
}

async function detach(currencyId) {
    const response = await detachCurrency(props.channel.id, currencyId)
    await channelsStore.upsert(response)
}
</script>

<template>
    <div class="section">
        <div class="subheader">{{ t('Currencies') }}</div>
        <div class="list">
            <div v-for="currency in channel.currencies" :key="currency.id" class="listElement">
                <span>{{ t('currency.' + currency.code) }}</span>
                <IconTrash v-if="currency.id !== channel.default_currency.id" size="16" stroke="2" @click="detach(currency.id)"/>
            </div>
        </div>
        <div>
            <div>Add new currency</div>
            <SearchableDropdown :options="currencies" class="channelLanguagesSearch" @optionClicked="attach"/>
        </div>
    </div>
</template>

<style scoped>
.listElement span {
    @apply flex-1;
}
</style>
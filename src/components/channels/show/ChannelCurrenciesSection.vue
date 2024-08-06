<!--suppress JSUnresolvedReference -->
<script setup>
import {useI18n} from 'vue-i18n'
import {useUpdateChannelRelations} from '../../../composables/channels/updateChannelRelations.js'
import {useChannelsStore} from '../../../stores/channels.js'
import {useDatasetsStore} from '../../../stores/datasets.js'
import {computed} from 'vue'
import {IconTrash} from '@tabler/icons-vue'
import SearchableDropdown from '../../inputs/SearchableDropdown.vue'

const {t} = useI18n()
const props = defineProps(['channel'])
const {attachCurrency, detachCurrency} = useUpdateChannelRelations()
const channelsStore = useChannelsStore()
const datasetsStore = useDatasetsStore()
datasetsStore.fetchCurrencies()

/**
 * Extracts the IDs of the currencies currently selected
 * in the channel. This computed value is used primarily
 * to filter out already selected currencies from the list
 * of available options.
 */
const currentCurrenciesIds = computed(() => props.channel.currencies.map(currencies => currencies.id))

/**
 * Generates options for a dropdown component that lists
 * currencies which have not yet been added to the channel.
 * This helps users add new currencies from the available list.
 *
 * @see SearchableDropdown
 */
const remainingCurrenciesDropdownOptions = computed(() => {
    return datasetsStore.currencies
        .filter(currency => !currentCurrenciesIds.value.includes(currency.id))
        .map(currency => {
            let translatedName = t('currency.' + currency.code.toLowerCase())
            return {
                name: translatedName,
                value: currency.id,
                tokens: [translatedName, currency.code],
            }
        })
})

/*
 * Functions to manage currency operations in the channel.
 * These functions wrap request-making functions and update
 * the channel store immediately after the response is received.
 */
async function attach(currencyId) {
    const response = await attachCurrency(props.channel.id, currencyId)
    await channelsStore.upsert(response.data)
}

async function detach(currencyId) {
    const response = await detachCurrency(props.channel.id, currencyId)
    await channelsStore.upsert(response.data)
}
</script>

<template>
    <div class="channel-currencies section">
        <h1 class="subheader">{{ t('Currencies') }}</h1>
        <span class="description">{{ t('This section allows you to manage the list of available currencies for this channel.') }}</span>
        <div class="list">
            <div v-for="currency in channel.currencies" :key="currency.id" class="list-item">
                <span>{{ t('currency.' + currency.code) }}</span>
                <IconTrash v-if="currency.id !== channel.default_currency.id" size="16" stroke="2" @click="detach(currency.id)"/>
            </div>
        </div>
        <SearchableDropdown :options="remainingCurrenciesDropdownOptions" @optionClicked="attach"/>
    </div>
</template>

<style scoped>
.channel-currencies {
    @apply grid items-start;
}
</style>
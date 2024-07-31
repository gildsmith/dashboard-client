<script setup>

import {useI18n} from 'vue-i18n'
import {computed} from 'vue'
import SearchableDropdown from '../../inputs/SearchableDropdown.vue'
import {useChannelsStore} from '../../../stores/channels.js'
import {useUpdateChannel} from '../../../composables/channels/updateChannel.ts'

const {t} = useI18n()
const props = defineProps(['channel'])
const channelsStore = useChannelsStore()
const {submit} = useUpdateChannel()

const languageOptions = computed(() => {
    return props.channel.languages.map(language => {
        let translatedName = t('language.' + language.code.toLowerCase())
        return {
            value: language.id,
            name: translatedName,
            tokens: [translatedName, language.code],
        }
    })
})

const currencyOptions = computed(() => {
    return props.channel.currencies.map(currency => {
        let translatedName = t('currency.' + currency.code.toLowerCase())
        return {
            value: currency.id,
            name: translatedName,
            tokens: [translatedName, currency.code],
        }
    })
})

// TODO move to composables
async function updateDefaultCurrency(v) {
    const response = await submit(props.channel.id, {default_currency_id: v})
    await channelsStore.upsert(response.data)
}

async function updateDefaultLanguage(v) {
    const response = await submit(props.channel.id, {default_language_id: v})
    await channelsStore.upsert(response.data)
}
</script>

<template>
    <div class="channelDefaults section">
        <h2 class="subheader">{{ t('Default Configuration') }}</h2>
        <div class="description">{{ t('Select the default language and currency that will act as fallbacks.') }}</div>
        <div class="description footnote">
            {{ t('To display more currencies and languages, you must first enable them for this channel.') }}
        </div>
        <div class="list">
            <div class="listElement">
                <span class="flex-1">{{ t('Default language') }}</span>
                <SearchableDropdown :modelValue="props.channel.default_language.id" :options="languageOptions" @optionClicked="updateDefaultLanguage"/>
            </div>
            <div class="listElement">
                <span class="flex-1">{{ t('Default currency') }}</span>
                <SearchableDropdown :modelValue="props.channel.default_currency.id" :options="currencyOptions" @optionClicked="updateDefaultCurrency"/>
            </div>
        </div>
    </div>
</template>
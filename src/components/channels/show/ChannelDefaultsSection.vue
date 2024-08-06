<script setup>
import {computed} from 'vue'
import SearchableDropdown from '../../inputs/SearchableDropdown.vue'
import {useChannelsStore} from '../../../stores/channels.js'
import {useI18n} from 'vue-i18n'
import {useUpdateChannel} from '../../../composables/channels/updateChannel.js'

const {t} = useI18n()
const {submit} = useUpdateChannel()
const props = defineProps(['channel'])
const channelsStore = useChannelsStore()

/**
 * Generates options for a dropdown component that lists
 * the currently selected languages. Each option includes
 * a translated name and a unique identifier.
 *
 * @see SearchableDropdown
 */
const languagesDropdownOptions = computed(() => {
    return props.channel.languages.map(language => {
        const translatedName = t('language.' + language.code.toLowerCase())
        return {
            value: language.id,
            name: translatedName,
            tokens: [translatedName, language.code],
        }
    })
})

/**
 * Generates options for a dropdown component that lists
 * the currently selected currencies. Each option includes
 * a translated name and a unique identifier.
 *
 * @see SearchableDropdown
 */
const currenciesDropdownOptions = computed(() => {
    return props.channel.currencies.map(currency => {
        let translatedName = t('currency.' + currency.code.toLowerCase())
        return {
            value: currency.id,
            name: translatedName,
            tokens: [translatedName, currency.code],
        }
    })
})

async function updateDefaultLanguage(v) {
    const response = await submit(props.channel.id, {default_language_id: v})
    await channelsStore.upsert(response.data)
}

async function updateDefaultCurrency(v) {
    const response = await submit(props.channel.id, {default_currency_id: v})
    await channelsStore.upsert(response.data)
}
</script>

<template>
    <div class="list">
        <div class="list-item">
            <div>
                <div>{{ t('Default language') }}</div>
                <span class="footnote">{{ t('The default language is used when a user-selected language is not available.') }}</span>
            </div>
            <SearchableDropdown :modelValue="props.channel.default_language.id" :options="languagesDropdownOptions" @optionClicked="updateDefaultLanguage"/>
        </div>
        <div class="list-item">
            <div>
                <h2>{{ t('Default currency') }}</h2>
                <span class="footnote">{{ t('The default currency is used when a user-selected currency is not available.') }}</span>
            </div>
            <SearchableDropdown :modelValue="props.channel.default_currency.id" :options="currenciesDropdownOptions" @optionClicked="updateDefaultCurrency"/>
        </div>
    </div>
</template>

<style scoped>

</style>
<script setup>

import {useI18n} from 'vue-i18n'
import {computed, ref, watch} from 'vue'
import SearchableDropdown from '../../inputs/SearchableDropdown.vue'

const {t} = useI18n()
const props = defineProps(['channel'])

const languageModel = ref(props.channel.default_language.id)
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

const currencyModel = ref(props.channel.default_currency.id)
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

// TODO
watch(languageModel, (v) => {
    console.log(v)
})

watch(currencyModel, (v) => {
    console.log(v)
})
</script>

<template>
    <!-- todo -->
    <div class="channelDefaults">
        <h2 class="subheader">{{ t('Default Configuration') }}</h2>
        <div class="description">{{ t('Select the default language and currency that will act as fallbacks.') }}</div>
        <div class="description footnote">{{
                t('To display more currencies and languages, you must first enable them in the Channel Localization Matrix.')
            }}
        </div>
        <div class="channelDefaultsDropdownsContainer">
            <span>{{ t('Default language') }}</span>
            <SearchableDropdown v-model="languageModel" :options="languageOptions"/>
            <span>{{ t('Default currency') }}</span>
            <SearchableDropdown v-model="currencyModel" :options="currencyOptions"/>
        </div>
    </div>
</template>

<style scoped>
.channelDefaults {
    @apply grid gap-4;
}

.channelDefaultsDropdownsContainer {
    @apply grid grid-cols-2 gap-4 items-center;
    grid-template-columns: minmax(100px, 150px) auto;
}
</style>
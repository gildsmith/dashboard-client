<script setup>
import {computed, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {useDatasetsStore} from '../../../stores/datasets.js'
import {useChannelsStore} from '../../../stores/channels.js'
import SearchableSelect from '../../inputs/SearchableList.vue'
import {useAttachLanguage} from '../../../composables/channels/attachLanguage.ts'
import {useAttachCurrency} from '../../../composables/channels/attachCurrency.ts'
import {useDetachLanguage} from '../../../composables/channels/detachLanguage.ts'
import {useDetachCurrency} from '../../../composables/channels/detachCurrency.ts'
import {IconTrash} from '@tabler/icons-vue'

const {t} = useI18n()
const props = defineProps(['channel'])
const channelsStore = useChannelsStore()
const datasetsStore = useDatasetsStore()
datasetsStore.fetchCurrencies()
datasetsStore.fetchLanguages()
const activeMatrixTab = ref('languages')

const currentCurrencies = computed(() => {
    return props.channel.currencies.map(currencies => currencies.id)
})

const currentLanguages = computed(() => {
    return props.channel.languages.map(languages => languages.id)
})

const currencies = computed(() => {
    return datasetsStore.currencies.filter(currency => {
        return !currentCurrencies.value.includes(currency.id)
    }).map(currency => {
        let translatedName = t('currency.' + currency.code.toLowerCase())
        return {
            name: translatedName,
            value: currency.id,
            tokens: [translatedName, currency.code],
        }
    })
})

const languages = computed(() => {
    return datasetsStore.languages.filter(language => {
        return !currentLanguages.value.includes(language.id)
    }).map(language => {
        let translatedName = t('language.' + language.code.toLowerCase())
        return {
            name: translatedName,
            value: language.id,
            tokens: [translatedName, language.code],
        }
    })
})

const {submit: submitAttachLanguage} = useAttachLanguage()
const {submit: submitAttachCurrency} = useAttachCurrency()
const {submit: submitDetachLanguage} = useDetachLanguage()
const {submit: submitDetachCurrency} = useDetachCurrency()

async function addLanguage(languageId) {
    const response = await submitAttachLanguage(props.channel.id, languageId)
    await channelsStore.upsert(response)
}

async function addCurrency(currencyId) {
    const response = await submitAttachCurrency(props.channel.id, currencyId)
    await channelsStore.upsert(response)
}

async function deleteLanguage(languageId) {
    const response = await submitDetachLanguage(props.channel.id, languageId)
    await channelsStore.upsert(response)
}

async function deleteCurrency(currencyId) {
    const response = await submitDetachCurrency(props.channel.id, currencyId)
    await channelsStore.upsert(response)
}
</script>

<template>
    <div class="localizationContainer">
        <div class="localizationHeader">
            <h2 class="subheader">{{ t('Channel Localization Matrix') }}</h2>
            <div class="description">{{ t('Here you can configure which combinations of channels, currencies, and languages are allowed.') }}</div>
            <div class="description footnote">{{ t('Please note that the default language and currency cannot be removed.') }}</div>
        </div>
        <div class="localizationTableWrapper">
            <table class="localizationTable">
                <tr class="localizationTableRow">
                    <td class="localizationTableCell"></td>
                    <td v-for="language in channel.languages" :key="language.id" class="localizationTableCell">
                        <div class="localizationTableCellWrapper">
                            <span>{{ t('language.' + language.code) }}</span>
                            <IconTrash size="16" stroke="2" @click="deleteLanguage(language.id)" v-if="language.id !== channel.default_language.id"/>
                        </div>
                    </td>
                </tr>
                <tr v-for="currency in channel.currencies" :key="currency.id" class="localizationTableRow">
                    <td class="localizationTableCell">
                        <div class="localizationTableCellWrapper">
                            <IconTrash size="16" stroke="2" @click="deleteCurrency(currency.id)" v-if="currency.id !== channel.default_currency.id"/>
                            <span>{{ t('currency.' + currency.code.toLowerCase()) }}</span>
                        </div>
                    </td>
                    <td v-for="language in channel.languages" :key="language.id" class="localizationTableCell">
                        <span>{{ currency.code }} × {{ language.code }}</span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="localizationExtensionContainer">
            <div class="localizationExtensionTabsContainer">
                <div class="localizationExtensionTab" @click="activeMatrixTab = 'languages'">{{ t('Languages') }}</div>
                <div class="localizationExtensionTab" @click="activeMatrixTab = 'currencies'">{{ t('Currencies') }}</div>
            </div>
            <SearchableSelect v-if="activeMatrixTab === 'languages'" :options="languages" @optionClicked="addLanguage"/>
            <SearchableSelect v-if="activeMatrixTab === 'currencies'" :options="currencies" @optionClicked="addCurrency"/>
        </div>
    </div>
</template>

<style>
/*
 * Localization container occupies both columns of
 * the dashboard router view and implements its own
 * three-column grid.
 */
.localizationContainer {
    @apply col-span-2 grid grid-cols-3 gap-8 items-stretch;
}

.localizationHeader {
    @apply flex flex-col gap-4 col-span-3;
}

/*
 * Localization matrix occupies 2/3 columns and allows
 * horizontal scrolling of larger tables.
 *
 * Localization table does not use border collapsing,
 * as it isn't the prettiest solution with sticky rows.
 */
.localizationTableWrapper {
    @apply overflow-x-auto max-w-full col-span-2 border;
}

.localizationTable {
    @apply min-w-max overflow-x-scroll table-fixed bg-white border-separate border-spacing-0;
}

.localizationTableRow {
    @apply h-16;
}

.localizationTableRow:first-child .localizationTableCell {
    @apply border-b;
}

.localizationTableCell {
    @apply p-4 max-w-48 truncate;
}

.localizationTableCell:first-child {
    @apply sticky left-0 bg-white border-r;
}

.localizationTableCellWrapper {
    @apply flex items-center gap-2;
}

/*
 * Remaining 1/3 of the container goes to a tab
 * box that holds selects allowing for extension of
 * the localization matrix.
 */
.localizationExtensionTabsContainer {
    @apply grid grid-cols-2 border-l border-r border-t;
}

.localizationExtensionTab {
    @apply p-4 text-center bg-white cursor-pointer;
    @apply hover:bg-slate-50;
}

/*noinspection CssUnusedSymbol*/
.localizationExtensionContainer .selectOptionsContainer {
    @apply max-h-96;
}
</style>
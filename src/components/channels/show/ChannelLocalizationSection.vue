<script setup>
import {computed, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {useDatasetsStore} from '../../../stores/datasets.js'
import {useChannelsStore} from '../../../stores/channels.js'
import SearchableSelect from '../../inputs/SearchableList.vue'
import {IconTrash} from '@tabler/icons-vue'
import {useChannelAttachments} from '../../../composables/channels/channelAttachments.ts'

const {t} = useI18n()
const props = defineProps(['channel'])
const activeMatrixTab = ref('languages')
const {attachCurrency, attachLanguage, detachCurrency, detachLanguage} = useChannelAttachments()
const channelsStore = useChannelsStore()
const datasetsStore = useDatasetsStore()
datasetsStore.fetchCurrencies()
datasetsStore.fetchLanguages()

/* ---------------------------------------------------------------------------
 * Currencies & Languages List
 * ---------------------------------------------------------------------------
 * TODO this piece filters currencies and languages and only displays unchecked
 *
 *
 */
const currentLanguages = computed(() => props.channel.languages.map(languages => languages.id))
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

const languages = computed(() => {
    return datasetsStore.languages
        .filter(language => !currentLanguages.value.includes(language.id))
        .map(language => {
            let translatedName = t('language.' + language.code.toLowerCase())
            return {
                name: translatedName,
                value: language.id,
                tokens: [translatedName, language.code],
            }
        })
})

/* ---------------------------------------------------------------------------
 * Extension Operations
 * ---------------------------------------------------------------------------
 * TODO these methods make requests and immediately modify store
 *
 *
 */
async function clickAttachLanguage(languageId) {
    const response = await attachLanguage(props.channel.id, languageId)
    await channelsStore.upsert(response)
}

async function clickAttachCurrency(currencyId) {
    const response = await attachCurrency(props.channel.id, currencyId)
    await channelsStore.upsert(response)
}

async function clickDetachLanguage(languageId) {
    const response = await detachLanguage(props.channel.id, languageId)
    await channelsStore.upsert(response)
}

async function clickDetachCurrency(currencyId) {
    const response = await detachCurrency(props.channel.id, currencyId)
    await channelsStore.upsert(response)
}

</script>

<template>
    <div class="localizationContainer section">
        <div class="localizationHeader">
            <h2 class="subheader">{{ t('Channel Localization Matrix') }}</h2>
            <div class="description">{{ t('Here you can configure which combinations of channels, currencies, and languages are allowed.') }}</div>
            <div class="footnote">{{ t('Please note that the default language and currency cannot be removed.') }}</div>
        </div>
        <div class="localizationTableWrapper">
            <table class="localizationTable">
                <tr class="localizationTableRow">
                    <td class="localizationTableCell"></td>
                    <td v-for="language in channel.languages" :key="language.id" class="localizationTableCell">
                        <div class="localizationTableHeader" @click="clickDetachLanguage(language.id)">
                            <span>{{ t('language.' + language.code) }}</span>
                            <IconTrash class="localizationDeleteIcon" v-if="language.id !== channel.default_language.id" size="16" stroke="2"/>
                        </div>
                    </td>
                </tr>
                <tr v-for="currency in channel.currencies" :key="currency.id" class="localizationTableRow">
                    <td class="localizationTableCell">
                        <div class="localizationTableHeader" @click="clickDetachCurrency(currency.id)">
                            <IconTrash class="localizationDeleteIcon" v-if="currency.id !== channel.default_currency.id" size="16" stroke="2"/>
                            <span>{{ t('currency.' + currency.code.toLowerCase()) }}</span>
                        </div>
                    </td>
                    <td v-for="language in channel.languages" :key="language.id" class="localizationTableCell">
                        H
                    </td>
                </tr>
            </table>
        </div>
        <div class="localizationTabContainer">
            <div class="localizationTabsContainer">
                <div class="localizationTab" @click="activeMatrixTab = 'languages'">{{ t('Languages') }}</div>
                <div class="localizationTab" @click="activeMatrixTab = 'currencies'">{{ t('Currencies') }}</div>
            </div>
            <SearchableSelect v-if="activeMatrixTab === 'languages'" :options="languages" @optionClicked="clickAttachLanguage"/>
            <SearchableSelect v-if="activeMatrixTab === 'currencies'" :options="currencies" @optionClicked="clickAttachCurrency"/>
        </div>
    </div>
</template>

<style scoped>
/*
 * Localization container occupies both columns of
 * the dashboard router view and implements its own
 * three-column grid.
 */
.localizationContainer {
    @apply grid-cols-3 items-stretch;
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
    @apply max-w-48 truncate h-16 p-0;
}

.localizationTableCell:first-child {
    @apply sticky left-0 bg-white border-r z-50;
}

.localizationTableHeader {
    @apply flex items-center p-2 gap-2 h-16 cursor-pointer;
    @apply hover:text-red-600;
}

.localizationDeleteIcon {
    @apply text-slate-400 bottom-2;
    right: calc(50% - 0.5em);
}

.localizationTableHeader:hover .localizationDeleteIcon {
    @apply text-red-600;
}

/*
 * Remaining 1/3 of the container goes to a tab
 * box that holds selects allowing for extension of
 * the localization matrix.
 */
.localizationTabsContainer {
    @apply grid grid-cols-2 border-l border-r border-t;
}

/*noinspection CssUnusedSymbol*/
.localizationTabContainer .selectOptionsContainer {
    @apply max-h-96;
}

.localizationTab {
    @apply p-4 text-center bg-white cursor-pointer;
    @apply hover:bg-slate-50;
}
</style>
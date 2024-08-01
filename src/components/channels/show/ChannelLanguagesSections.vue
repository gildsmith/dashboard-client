<!--suppress JSUnresolvedReference -->
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
const {attachLanguage, detachLanguage} = useChannelAttachments()
const channelsStore = useChannelsStore()
const datasetsStore = useDatasetsStore()
datasetsStore.fetchLanguages()

/**
 * Extracts the IDs of the languages currently selected
 * in the channel. This computed value is used primarily
 * to filter out already selected languages from the list
 * of available options.
 */
const currentLanguagesIds = computed(() =>
    props.channel.languages.map(language => language.id),
)

/**
 * Generates options for a dropdown component that lists
 * languages which have not yet been added to the channel.
 * This helps users add new languages from the available list.
 *
 * @see SearchableDropdown
 */
const remainingLanguagesDropdownOptions = computed(() => {
    return datasetsStore.languages
        .filter(language => !currentLanguagesIds.value.includes(language.id))
        .map(language => {
            const translatedName = t('language.' + language.code.toLowerCase())
            return {
                name: translatedName,
                value: language.id,
                tokens: [translatedName, language.code],
            }
        })
})

/*
 * Functions to manage language operations in the channel.
 * These functions wrap request-making functions and update
 * the channel store immediately after the response is received.
 */
async function attach(languageId) {
    const response = await attachLanguage(props.channel.id, languageId)
    await channelsStore.upsert(response.data)
}

async function detach(languageId) {
    const response = await detachLanguage(props.channel.id, languageId)
    await channelsStore.upsert(response.data)
}
</script>

<template>
    <div class="channel-languages section">
        <h1 class="header">{{ t('Languages') }}</h1>
        <span class="description">{{ t('This section allows you to manage the list of available languages for this channel.') }}</span>
        <div class="channels-languages-list list">
            <div v-for="language in channel.languages" :key="language.id" class="list-item">
                <span>{{ t('language.' + language.code) }}</span>
                <IconTrash v-if="language.id !== channel.default_language.id" size="16" stroke="2" @click="detach(language.id)"/>
            </div>
        </div>
        <SearchableDropdown :options="remainingLanguagesDropdownOptions" @optionClicked="attach"/>
    </div>
</template>

<style scoped>
.channel-languages {
    @apply grid items-start;
}
</style>
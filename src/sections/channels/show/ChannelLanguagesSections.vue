<!--suppress JSUnresolvedReference -->
<script setup>
import {IconTrash} from '@tabler/icons-vue'
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'

import SearchableDropdown from '../../../components/input/SearchableDropdown.vue'
import {useUpdateChannelRelations} from '../../../composables/channels/updateChannelRelations.js'
import {useChannelsStore} from '../../../stores/channels.js'
import {useDatasetsStore} from '../../../stores/datasets.js'

const {t} = useI18n()
const props = defineProps(['channel'])
const {attachLanguage, detachLanguage} = useUpdateChannelRelations()
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
        <h2 class="subheader">{{ t('Languages') }}</h2>
        <div class="list">
            <div v-for="language in channel.languages" :key="language.id" class="list-item">
                <span>{{ t('language.' + language.code) }}</span>
                <div v-if="language.id !== channel.default_language.id" class="delete-language button" @click="detach(language.id)">
                    <IconTrash size="16" stroke="1.75"/>
                </div>
            </div>
        </div>
        <SearchableDropdown :options="remainingLanguagesDropdownOptions" @optionClicked="attach"/>
    </div>
</template>

<style scoped>
.channel-languages {
    @apply grid items-start;
}

.delete-language {
    @apply p-2;
}
</style>
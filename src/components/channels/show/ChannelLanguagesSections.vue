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

const currentLanguages = computed(() => props.channel.languages.map(languages => languages.id))

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

async function attach(languageId) {
    const response = await attachLanguage(props.channel.id, languageId)
    await channelsStore.upsert(response)
}

async function detach(languageId) {
    const response = await detachLanguage(props.channel.id, languageId)
    await channelsStore.upsert(response)
}
</script>

<template>
    <div class="section">
        <div class="subheader">{{ t('Languages') }}</div>
        <div class="list">
            <div v-for="language in channel.languages" :key="language.id" class="listElement">
                <span>{{ t('language.' + language.code) }}</span>
                <IconTrash v-if="language.id !== channel.default_language.id" size="16" stroke="2" @click="detach(language.id)"/>
            </div>
        </div>
        <div>
            <div>Add new language</div>
            <SearchableDropdown :options="languages" class="channelLanguagesSearch" @optionClicked="attach"/>
        </div>
    </div>
</template>

<style scoped>
.listElement span {
    @apply flex-1;
}
</style>
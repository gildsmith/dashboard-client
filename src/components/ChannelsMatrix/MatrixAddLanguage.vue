<script setup>
import {IconSquarePlus, IconX} from '@tabler/icons-vue'
import SearchableDropdown from '../Inputs/SearchableDropdown.vue'
import {useLanguagesStore} from '../../stores/languages.js'
import {computed, ref} from 'vue'
import {useI18n} from 'vue-i18n'

const languagesStore = useLanguagesStore()
languagesStore.fetch()

const props = defineProps(['span', 'channel'])
const modalModel = ref(props.channel.languages.map(l => l.id))
const openModal = ref(false)
const {t} = useI18n()

const dropdownOptions = computed(() => languagesStore.languages.map(language => ({
    tokens: [t('language.' + language.code.toLowerCase()), language.code],
    name: t('language.' + language.code.toLowerCase()),
    value: language.id,
})))

function click(v, t) {
    t ? axios.post('/api/channels/channel/1/language/' + v)
        : axios.delete('/api/channels/channel/1/language/' + v)
}
</script>

<template>
    <td :rowspan="span" class="matrix">
        <div class="hitbox" @click="openModal = true">
            <div class="buttonWrapper">
                <IconSquarePlus size="16" stroke="2"/>
                <span>add new language</span>
            </div>
        </div>
        <Teleport to="body">
            <div v-if="openModal" class="modalContainer" @click="openModal = false">
                <div class="modalCard" @click.stop>
                    <div class="modalHeader">
                        <h2>{{ t('Add new language') }}</h2>
                        <div class="closeModal" @click="openModal = false">
                            <IconX size="24" stroke="2"/>
                        </div>
                    </div>
                    <SearchableDropdown v-model="modalModel" :options="dropdownOptions" @optionClicked="click"/>
                </div>
            </div>
        </Teleport>
    </td>
</template>

<style scoped>
.matrix {
    @apply text-center;
}

.hitbox {
    @apply inline-flex items-center justify-center p-4 cursor-pointer text-blue-700 text-sm font-medium;
}

.buttonWrapper {
    @apply flex items-center p-1 bg-blue-50 rounded gap-1;
}

.modalContainer {
    @apply absolute bg-black/50 inset-0 z-50 p-16;
}

.modalCard {
    @apply p-4 overflow-hidden bg-white max-w-xl m-auto h-full rounded-lg flex flex-col gap-4;
}

.modalHeader {
    @apply flex items-center justify-between w-full;
}

.closeModal {
    @apply p-1 cursor-pointer;
}
</style>
<script setup>
import {IconSquarePlus, IconX} from '@tabler/icons-vue'
import SearchableDropdown from '../Inputs/SearchableDropdown.vue'
import {useCurrenciesStore} from '../../stores/currencies.js'
import {computed, ref} from 'vue'
import {useI18n} from 'vue-i18n'

const currenciesStore = useCurrenciesStore()
currenciesStore.fetch()

const props = defineProps(['span', 'channel'])
const modalModel = ref(props.channel.currencies.map(c => c.id))
const openModal = ref(false)
const {t} = useI18n()

const dropdownOptions = computed(() => currenciesStore.currencies.map(currency => ({
    tokens: [t('currency.' + currency.code.toLowerCase()), currency.code],
    name: t('currency.' + currency.code.toLowerCase()),
    value: currency.id,
})))

function click(v, t) {
    let endpoint = '/api/channels/channel/' + props.channel.id + '/currency/' + v

    t ? axios.post(endpoint)
        : axios.delete(endpoint)
}
</script>

<template>
    <td :rowspan="span" class="matrix">
        <div class="hitbox" @click="openModal = true">
            <div class="buttonWrapper">
                <IconSquarePlus size="16" stroke="2"/>
                <span>add new currency</span>
            </div>
        </div>
        <Teleport to="body">
            <div v-if="openModal" class="modalContainer" @click="openModal = false">
                <div class="modalCard" @click.stop>
                    <div class="modalHeader">
                        <h2>{{ t('Add new currency') }}</h2>
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
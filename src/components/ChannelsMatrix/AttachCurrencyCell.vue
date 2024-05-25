<script setup>
import {useCurrenciesStore} from '../../stores/currencies.js'
import {computed, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import SearchableDropdown from '../Inputs/SearchableDropdown.vue'

const currenciesStore = useCurrenciesStore()
currenciesStore.fetch()

const props = defineProps(['span', 'channel'])
const modalModel = ref(props.channel.currencies.map(c => c.id))
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
    <td class="searchableCell" :rowspan="span">
        <div class="searchableCellWrapper">
            <div>Add new currency</div>
            <SearchableDropdown v-model="modalModel" :options="dropdownOptions" @optionClicked="click" :hideChecked="true"/>
        </div>
    </td>
</template>

<style scoped>
.searchableCell {
    @apply relative w-64 border;
}
.searchableCellWrapper {
    @apply absolute p-4 overflow-y-scroll bg-white top-0 left-0 max-h-full flex flex-col gap-4;
}
</style>
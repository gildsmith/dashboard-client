<script setup>
import {computed, ref} from 'vue'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const search = ref('')
const emits = defineEmits(['optionClicked'])
const model = defineModel()
const props = defineProps({
    placeholder: {
        type: String,
        required: false,
        default: 'Type to filter',
    },
    options: {
        type: Array,
        required: true,
        default: () => [],
    },
})

const filteredOptions = computed(() => {
    return search.value.length === 0
        ? props.options
        : props.options.filter(option => {
            return option.tokens.some(token => token.toLowerCase().includes(search.value.toLowerCase()))
        })
})

function submitOption() {
    if (filteredOptions.value.length > 0)
        clickOption(filteredOptions.value[0].value)

    search.value = ''
}

function clickOption(value) {
    emits('optionClicked', value, !isChecked(value))
}

function isChecked(value) {
    if (Number.isInteger(model.value)) {
        return model.value === value.value

    } else if (Array.isArray(model.value)) {
        return model.value.includes(value.value)
    }
    return false
}
</script>

<template>
    <div class="input-container">
        <div class="input-wrapper input">
            <input v-model="search" :placeholder="t(placeholder)" class="search-input" type="text" @keyup.enter="submitOption">
            <input v-model="model" type="hidden"/>
        </div>
        <div class="options-container">
            <div v-for="(o, k) in filteredOptions" :key="k" class="option" @click="clickOption(o.value)">
                <span>{{ o.name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.input-container {
    @apply relative;
}

.input-wrapper {
    @apply bg-white flex items-center justify-between relative;
}

.search-input {
    @apply flex-1 outline-none;
    @apply placeholder:text-inherit;
}

.options-container {
    @apply bg-white border-x border-b left-0 right-0 max-h-64 overflow-y-scroll z-10;
}

.option {
    @apply hover:bg-slate-100 p-2 flex items-center gap-2 cursor-pointer;
}
</style>
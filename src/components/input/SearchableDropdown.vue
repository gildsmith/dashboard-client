<script setup>
import {IconChevronDown, IconChevronUp} from '@tabler/icons-vue'
import {computed, onMounted, onUnmounted, ref} from 'vue'

const dropdownContainer = ref(null)
const active = ref(false)
const search = ref('')
const emits = defineEmits(['optionClicked'])
const model = defineModel()
const props = defineProps({
    options: {
        type: Array,
        required: true,
        default: () => [],
    },
})

const activeSelection = computed(() => {
    return props.options.find(option => option.value === model.value)?.name || 'Type to search'
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
    model.value = value
    active.value = false
}

function isChecked(value) {
    if (Number.isInteger(model.value)) {
        return model.value === value.value

    } else if (Array.isArray(model.value)) {
        return model.value.includes(value.value)
    }
    return false
}

function openDropdown() {
    active.value = true
}

function closeDropdown(event) {
    if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
        active.value = false
    }
}

onMounted(() => document.addEventListener('click', closeDropdown))
onUnmounted(() => document.removeEventListener('click', closeDropdown))
</script>

<template>
    <div ref="dropdownContainer" :class="{'dropdownContainer': true,'active': active}">
        <div class="input-wrapper input" @click="openDropdown">
            <input v-model="search" :placeholder="activeSelection" class="search-input" type="text" @keyup="openDropdown" @keyup.enter="submitOption">
            <input v-model="model" type="hidden"/>
            <div class="icon">
                <IconChevronDown v-if="!active" size="16" stroke="1.75"/>
                <IconChevronUp v-if="active" size="16" stroke="1.75"/>
            </div>
        </div>
        <div class="options-container">
            <div v-for="(o, k) in filteredOptions" :key="k" class="option" @click="clickOption(o.value)">
                <span>{{ o.name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dropdownContainer {
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
    @apply absolute invisible bg-white border-x border-b left-0 right-0 max-h-64 overflow-y-scroll z-10 shadow-flat;
}

.active .options-container {
    @apply visible;
}

.option {
    @apply hover:bg-flint-100 p-2 cursor-pointer;
}
</style>
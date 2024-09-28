<script setup>
import {IconChevronDown, IconChevronUp} from '@tabler/icons-vue'
import {computed, onMounted, onUnmounted, ref, watch} from 'vue'

/*
 * References to manage dropdown state,
 * highlighted option, and search input.
 */

/** @type {Ref<HTMLElement | null>} */
const dropdownContainer = ref(null)
const highlightedIndex = ref(0)
const active = ref(false)
const search = ref('')

/*
 * Handles external interactions: emits events
 * and defines model/props for the component.
 */
const emits = defineEmits(['optionClicked'])
const model = defineModel()
const props = defineProps({
    options: {
        type: Array,
        required: true,
        default: () => [],
    },
})

/*
 * Opens the dropdown by setting the active state.
 */
function openDropdown() {
    active.value = true
}

/*
 * Closes the dropdown when clicking outside
 * and resets the highlighted index.
 */
function closeDropdown(event) {
    if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
        active.value = false
        highlightedIndex.value = 0
    }
}

/*
 * Computes the placeholder text based on the
 * selected option or shows a search prompt.
 */
const placeholder = computed(() => {
    return props.options.find(option => option.value === model.value)?.name || 'Type to search'
})

/*
 * Filters options based on the search input,
 * or returns all options if search is empty.
 */
const filteredOptions = computed(() => {
    return search.value.length === 0
        ? props.options
        : props.options.filter(option => {
            return option.tokens.some(token => token.toLowerCase().includes(search.value.toLowerCase()))
        })
})

/*
 * Handles moving the highlight option.
 */
function highlightUp() {
    if (highlightedIndex.value > 0) {
        highlightedIndex.value--
    }
}

function highlightDown() {
    if (highlightedIndex.value < filteredOptions.value.length - 1) {
        highlightedIndex.value++
    }
}

function highlightSet(index) {
    highlightedIndex.value = index
}

/*
 * Selects the highlighted option when ENTER
 * is pressed and clears the search input.
 */
function enterInput() {
    if (filteredOptions.value[highlightedIndex.value])
        submitOption(filteredOptions.value[highlightedIndex.value].value)

    search.value = ''
}

/*
 * Submits the selected option, emits the event,
 * and resets dropdown state and highlight index.
 */
function submitOption(value) {
    emits('optionClicked', value, !isChecked(value))
    model.value = value
    active.value = false
    highlightedIndex.value = 0
}

/*
 * Checks if the given option is already selected
 * (supports both single and multi-selection).
 */
function isChecked(value) {
    if (Number.isInteger(model.value)) {
        return model.value === value.value

    } else if (Array.isArray(model.value)) {
        return model.value.includes(value.value)
    }
    return false
}

/*
 * Resets the highlighted option to the
 * first one when the search input changes.
 */
watch(search, () => highlightedIndex.value = 0)

/*
 * Registers events to close the dropdown
 * when clicking outside the component.
 */
onMounted(() => document.addEventListener('click', closeDropdown))
onUnmounted(() => document.removeEventListener('click', closeDropdown))
</script>

<template>
    <div ref="dropdownContainer" :class="{ 'active': active }" class="dropdownContainer">
        <div class="input-wrapper input" @click="openDropdown">
            <input v-model="search" :placeholder="placeholder" class="search-input" type="text"
                   @keyup="openDropdown" @keyup.enter="enterInput" @keyup.up="highlightUp" @keyup.down="highlightDown">

            <input v-model="model" type="hidden"/>
            <div class="icon">
                <IconChevronDown v-if="!active" size="16" stroke="1.75"/>
                <IconChevronUp v-if="active" size="16" stroke="1.75"/>
            </div>
        </div>
        <div class="options-container">
            <div v-for="(o, k) in filteredOptions" :key="k" :class="{ option: true, highlight: k === highlightedIndex}"
                 @click="submitOption(o.value)" @mouseenter="highlightSet(k)">

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
    @apply absolute invisible bg-white border-x border-b left-0 right-0 max-h-64 overflow-y-scroll z-10 shadow-xs;
}

.active .options-container {
    @apply visible;
}

.option {
    @apply p-2 cursor-pointer;
}

.option.highlight {
    @apply bg-flint-100;
}
</style>
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
    }
})

/*
 * Todo this displays selected value
 */
const activeSelection = computed(() => {
    return props.options.find(option => option.value === model.value)?.name || 'Type to search'
})

/*
 * This computed value enables filtering through different representations (tokens)
 * of values, allowing for case-insensitive matching on both code and full name.
 */
const filteredOptions = computed(() => {
    return search.value.length === 0
        ? props.options
        : props.options.filter(option => {
            return option.tokens.some(token => token.toLowerCase().includes(search.value.toLowerCase()))
        })
})

/*
 * Todo this allows submitting the input on hitting enter
 */
function submitOption() {
    if (filteredOptions.value.length > 0)
        clickOption(filteredOptions.value[0].value)

    search.value = ''

}

/*
 * todo This function is triggered when an option is clicked. It emits clicked value, as well as updates model if it's provided and correct.
 */
function clickOption(value) {
    emits('optionClicked', value, !isChecked(value))
    model.value = value
    active.value = false
}

/*
 * todo This method checks whether the model equals or contains (in case of arrays) the value.
 */
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
    <div ref="dropdownContainer" :class="{'dropdownContainer': true,'dropdownActive': active}">
        <div class="dropdownInputWrapper input" @click="openDropdown">
            <input type="text" :placeholder="activeSelection" class="dropdownInput" v-model="search" @keyup.enter="submitOption">
            <input v-model="model" type="hidden"/>
            <div class="dropdownIcon">
                <IconChevronDown size="16" stroke="2" v-if="!active"/>
                <IconChevronUp size="16" stroke="2" v-if="active"/>
            </div>
        </div>
        <div class="dropdownOptionsContainer">
            <div v-for="(o, k) in filteredOptions" :key="k" class="dropdownOption" @click="clickOption(o.value)">
                <span>{{ o.name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dropdownContainer {
    @apply relative bg-red-500;
}

.dropdownInputWrapper {
    @apply bg-white flex items-center justify-between relative;
}

.dropdownInput {
    @apply flex-1 outline-none;
    @apply placeholder:text-inherit;
}

.dropdownOptionsContainer {
    @apply absolute invisible bg-white border-x border-b left-0 right-0 max-h-64 overflow-y-scroll z-10;
}

.dropdownActive .dropdownOptionsContainer {
    @apply visible;
}

.dropdownOption {
    @apply hover:bg-slate-100 p-2 cursor-pointer;
}
</style>
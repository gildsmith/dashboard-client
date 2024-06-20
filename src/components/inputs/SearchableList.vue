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
</script>

<template>
    <div class="selectContainer">
        <div class="selectInputWrapper input">
            <input v-model="search" :placeholder="t(placeholder)" class="selectInput" type="text" @keyup.enter="submitOption">
            <input v-model="model" type="hidden"/>
        </div>
        <div class="selectOptionsContainer">
            <div v-for="(o, k) in filteredOptions" :key="k" class="selectOption" @click="clickOption(o.value)">
                <span>{{ o.name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.selectContainer {
    @apply relative;
}

.selectInputWrapper {
    @apply bg-white flex items-center justify-between relative;
}

.selectInput {
    @apply flex-1 outline-none;
    @apply placeholder:text-inherit;
}

.selectOptionsContainer {
    @apply bg-white border-x border-b left-0 right-0 max-h-64 overflow-y-scroll z-10;
}

.selectOption {
    @apply hover:bg-slate-100 p-2 flex items-center gap-2 cursor-pointer;
}
</style>
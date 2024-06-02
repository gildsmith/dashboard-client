<script setup>
import {computed, ref} from 'vue'
import {IconSquare, IconSquareCheck} from '@tabler/icons-vue'

const input = ref('')
const emits = defineEmits(['optionClicked'])
const model = defineModel()
const props = defineProps({
    options: {
        type: Array,
        required: true,
        default: () => [],
    },
    hideChecked: {
        type: Boolean,
        required: false,
        default: false,
    },
})

/*
 * This computed value enables filtering through different representations (tokens)
 * of values, allowing for case-insensitive matching on both code and full name.
 */
const computedOptions = computed(() => {
    let options = props.hideChecked
        ? props.options.filter(option => !isChecked(option))
        : props.options

    return input.value.length === 0
        ? options
        : options.filter(option => {
            return option.tokens.some(token => token.toLowerCase().includes(input.value.toLowerCase()))
        })
})

/*
 * todo This function is triggered when an option is clicked. It emits clicked value, as well as updates model if it's provided and correct.
 */
function clickOption(value) {
    emits('optionClicked', value, !isChecked(value))

    if (Number.isInteger(model.value)) {
        model.value = value

    } else if (Array.isArray(model.value)) {
        model.value.includes(value)
            ? model.value = model.value.filter(v => v !== value)
            : model.value.push(value)
    }
}

/**
 * Todo this allows submitting the input on hitting enter
 */
function submitOption() {
    if (computedOptions.value.length > 0)
        clickOption(computedOptions.value[0].value)
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
    <div class="dropdownContainer">
        <input v-model="input" class="input" type="text" @keyup.enter="submitOption"/>
        <input v-model="model" type="hidden"/>
        <div class="dropdownList">
            <div v-for="(o, k) in computedOptions" :key="k" class="dropdownItem" @click="clickOption(o.value)">
                <IconSquareCheck v-if="!hideChecked && isChecked(o.value)" size="16" stroke="2"/>
                <IconSquare v-if="!hideChecked && !isChecked(o.value)" size="16" stroke="2"/>
                <span>{{ o.name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dropdownContainer {
    @apply flex flex-col gap-4 max-h-full overflow-hidden;
}

.dropdownList {
    @apply overflow-y-scroll;
}

.dropdownItem {
    @apply flex gap-2 items-center p-2 rounded cursor-pointer;
}

.dropdownItem:hover {
    @apply bg-slate-100;
}
</style>
<script setup>
import {IconSquare, IconSquareCheck} from '@tabler/icons-vue'
import {computed} from 'vue'

const props = defineProps(['currency', 'language'])
const key = computed(() => {
    return props.language?.code + '-' + props.currency?.code
})
</script>

<template>
    <td class="matrixCell">
        <input :id="key" type="checkbox">
        <label :for="key">
            <IconSquare v-if="false" size="24" stroke="2"/>
            <IconSquareCheck size="24" stroke="2"/>
        </label>
    </td>
</template>

<style scoped>
.matrixCell {
    @apply w-16 h-16 border border-blue-100;
}

input[type=checkbox] {
    @apply hidden;
}

label {
    @apply flex h-full w-full cursor-pointer items-center justify-center text-slate-300;
}

input[type=checkbox]:checked + label {
    @apply text-slate-950;
}
</style>
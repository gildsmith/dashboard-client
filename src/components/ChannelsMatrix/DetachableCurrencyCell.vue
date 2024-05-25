<script setup>
import {IconTrash} from '@tabler/icons-vue'

defineProps(['currency'])
</script>

<template>
    <th class="currency">
        <div>{{ currency.code }}</div>
        <div class="detachContainer">
            <div class="detach">
                <IconTrash size="16" stroke="2"/>
            </div>
        </div>
    </th>
</template>

<style scoped>
.currency {
    position: relative;
}

.detachContainer {
    top: calc(50% - 16px);
    left: calc(50% - 16px);
    @apply absolute bg-red-100 text-red-500 p-2 rounded invisible cursor-pointer;
}

.currency:hover {
    @apply text-transparent;
}

.currency:hover .detachContainer {
    @apply visible;
}
</style>
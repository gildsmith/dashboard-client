<script setup>
import {IconArrowLeft, IconArrowRight} from '@tabler/icons-vue'

const props = defineProps({
    currentPage: {
        type: Number,
        required: true,
    },
    totalPages: {
        type: Number,
        required: true,
    },
})

const emits = defineEmits(['firstPage', 'previousPage', 'nextPage', 'lastPage'])
</script>

<template>
    <div class="pagination">
        <button :disabled="currentPage === 1" class="pagination-item" @click="emits('firstPage')">
            <IconArrowLeft size="16" stroke="2"/>
            <span>First</span>
        </button>
        <button :disabled="currentPage === 1" class="pagination-item" @click="emits('previousPage')">
            <span>Previous</span>
        </button>
        <span class="pagination-item">Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" class="pagination-item" @click="emits('nextPage')">
            <span>Next</span>
        </button>
        <button :disabled="currentPage === totalPages" class="pagination-item" @click="emits('lastPage')">
            <span>Last</span>
            <IconArrowRight size="16" stroke="2"/>
        </button>
    </div>
</template>

<style scoped>
.pagination {
    @apply inline-flex border rounded-lg bg-white shadow-skeumorphism mr-auto;
}

.pagination-item {
    @apply px-4 py-2 flex items-center gap-1;
}

.pagination-item:disabled,
.pagination-item:disabled .tabler-icon {
    @apply text-flint-300;
}

.pagination-item:not(:last-child) {
    @apply border-r;
}
</style>
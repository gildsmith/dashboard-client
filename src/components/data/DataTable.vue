<script setup>
import {toRef} from 'vue'

import {usePagination} from '../../composables/components/data/table/pagination'
import {useSortable} from '../../composables/components/data/table/sortable'
import DataTablePagination from './DataTablePagination.vue'
import DataTableSortIcon from './DataTableSortIcon.vue'

const props = defineProps({
    title: {type: String, default: ''},
    headers: {type: Array, required: true, default: () => []},
    data: {type: Array, required: true, default: () => []},
    sortable: {type: Object, default: () => ({})},
    pagination: {type: Number, default: 0},
    /* doneness point */
    selectable: {type: Boolean, default: false},
    actions: {type: Array, default: () => ({})},
    reorder: {type: Function},
})

const {changeSortState, sortIcon, sortedData} = useSortable(toRef(props, 'data'))
const { paginatedData, currentPage, totalPages, setPage, previousPage, nextPage, firstPage, lastPage } = usePagination(sortedData, toRef(props, 'pagination'))

</script>

<template>
    <div class="table-wrapper">
        <div v-if="title" class="table-title">
            <h2 class="subheader">{{ title }}</h2>
        </div>
        <table class="table">
            <tr class="table-header-row">
                <th v-for="header in headers" :key="header" class="table-header" @click="changeSortState(header)">
                    <div class="table-header-sorting-container">
                        <span>{{ header }}</span>
                        <DataTableSortIcon :type="sortIcon(header)"/>
                    </div>
                </th>
            </tr>
            <tr v-for="(row, index) in paginatedData" :key="index" class="table-row">
                <td v-for="header in headers" :key="header" class="table-cell">
                    <slot :name="header" :row="row">
                        {{ row[header] }}
                    </slot>
                </td>
            </tr>
        </table>
    </div>
    <DataTablePagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @firstPage="firstPage"
        @previousPage="previousPage"
        @nextPage="nextPage"
        @lastPage="lastPage"
    />
</template>

<style scoped>
.table-wrapper {
    @apply shadow-skeumorphism;
}

.table-title {
    @apply px-4 py-6 bg-white border-l border-r border-t rounded-t;
}

.table {
    @apply border-collapse text-left w-full bg-white table-fixed;
}

.table-header {
    @apply p-4 font-medium bg-flint-50 cursor-pointer;
}

.table-header-sorting-container {
    @apply flex gap-2 items-center;
}

.table-header-row {
    @apply border;
}

.table-row {
    @apply border;
}

.table-cell {
    @apply p-4;
}
</style>

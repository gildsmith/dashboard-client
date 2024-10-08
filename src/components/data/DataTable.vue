<script setup>
import {toRef} from 'vue'

import {usePagination} from '../../composables/components/data/table/pagination'
import {useSortable} from '../../composables/components/data/table/sortable'
import DataTablePagination from './DataTablePagination.vue'
import DataTableSortIcon from './DataTableSortIcon.vue'

/* ---------------------------------------------------------------------------
 * Data Table Component
 * ---------------------------------------------------------------------------
 * This component provides an accessible and feature-rich way to display data
 * in table format. It supports sorting, pagination, and other advanced table
 * actions, making it highly customizable and flexible for various use cases.
 *
 * The component is divided into smaller, encapsulated composables such as
 * 'useSortable' for sorting and 'usePagination' for pagination, ensuring
 * maintainability and scalability.
 *
 * Users can configure features like sorting, pagination, and more via props,
 * and choose which to enable or disable dynamically.
 */

const props = defineProps({
    title: {default: ''},
    headers: {required: true, default: () => []},
    data: {required: true, default: () => []},
    sortable: {default: () => ({})},
    pagination: {default: 0},
    /* doneness point */
    selectable: {default: false},
    actions: {default: () => ({})},
    massActions: {default: false},
    reorder: {type: Function},
})

const {changeSortState, sortIcon, sortedData} = useSortable(toRef(props, 'data'), toRef(props, 'sortable'))
const {paginatedData, currentPage, totalPages, previousPage, nextPage, firstPage, lastPage} = usePagination(sortedData, toRef(props, 'pagination'))
</script>

<template>
    <div class="table-wrapper">
        <div v-if="title" class="table-title">
            <h2 class="subheader">{{ title }}</h2>
        </div>
        <table class="table">
            <tr class="table-header-row">
                <th v-for="header in headers" :key="header" :class="{'table-header-clickable': sortIcon(header)}"
                    class="table-header" @click="changeSortState(header)">

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
    <DataTablePagination v-if="pagination > 0" :currentPage="currentPage" :totalPages="totalPages"
                         @firstPage="firstPage" @lastPage="lastPage" @nextPage="nextPage" @previousPage="previousPage"/>
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
    @apply p-4 font-medium bg-flint-50;
}

.table-header.table-header-clickable {
    @apply cursor-pointer;
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

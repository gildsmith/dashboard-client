// noinspection JSUnusedGlobalSymbols

import {computed, Ref, ref} from 'vue'

export function usePagination(data: Ref<[]>, pageSize: Ref<number>) {
    const currentPage = ref(1)

    const paginatedData = computed(() => {
        if (pageSize.value === 0) {
            return data.value
        }

        const start = (currentPage.value - 1) * pageSize.value
        const end = start + pageSize.value

        return data.value.slice(start, end)
    })

    const totalPages = computed(() => {
        return pageSize.value !== 0
            ? Math.ceil(data.value.length / pageSize.value)
            : 1
    })

    function setPage(page: number) {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page
        }
    }

    function previousPage() {
        if (currentPage.value > 1) {
            currentPage.value--
        }
    }

    function nextPage() {
        if (currentPage.value < totalPages.value) {
            currentPage.value++
        }
    }

    function firstPage() {
        currentPage.value = 1
    }

    function lastPage() {
        currentPage.value = totalPages.value
    }

    return {
        paginatedData, pageSize, currentPage, totalPages,
        setPage, previousPage, nextPage, firstPage, lastPage,
    }
}

// noinspection JSUnusedGlobalSymbols

import {computed, Ref, ref} from 'vue'

export function usePagination<T>(data: Ref<T[]>, pageSize: Ref<number>) {

    const currentPage = ref<number>(1)

    const paginatedData = computed(() => {
        if (pageSize.value === 0) {
            return data.value
        }

        const start = (currentPage.value - 1) * pageSize.value
        const end = start + pageSize.value

        return data.value.slice(start, end)
    })

    const totalPages = computed(() => pageSize.value !== 0
        ? Math.ceil(data.value.length / pageSize.value)
        : 1)

    function setPage(page: number): void {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page
        }
    }

    function previousPage(): void {
        if (currentPage.value > 1) {
            currentPage.value--
        }
    }

    function nextPage(): void {
        if (currentPage.value < totalPages.value) {
            currentPage.value++
        }
    }

    function firstPage(): void {
        currentPage.value = 1
    }

    function lastPage(): void {
        currentPage.value = totalPages.value
    }

    return {
        paginatedData, pageSize, currentPage, totalPages,
        setPage, previousPage, nextPage, firstPage, lastPage,
    }
}

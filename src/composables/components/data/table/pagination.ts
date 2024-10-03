import {computed, Ref, ref} from 'vue'

export function usePagination(data: Ref<[]>, itemsPerPage: Ref<number>) {
    const currentPage = ref(1)
    const pageSize = ref(itemsPerPage)

    const paginatedData = computed(() => {
        if (pageSize.value === 0) return data
        const start = (currentPage.value - 1) * pageSize.value
        const end = start + pageSize.value
        return data.value.slice(start, end)
    })

    const totalPages = computed(() => {
        return Math.ceil(data.value.length / pageSize.value)
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

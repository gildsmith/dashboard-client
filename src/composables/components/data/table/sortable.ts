import {computed, reactive, Ref} from 'vue'

export function useSortable(data: Ref<[]>) {

    const sortState = reactive({
        header: '',
        mode: 'ascending',
    })

    function changeSortState(header: string) {
        if (header !== sortState.header) {
            sortState.header = header
            sortState.mode = 'ascending'

        } else if (sortState.mode === 'ascending') {
            sortState.mode = 'descending'

        } else if (sortState.mode === 'descending') {
            sortState.header = ''
        }
    }

    function sortIcon(header: string) {
        return sortState.header === header
            ? sortState.mode
            : 'candidate'
    }

    function sortData(data: []) {
        if (sortState.header === '') {
            return data
        }

        const sortedData = [...data].sort()

        if (sortState.mode === 'descending') {
            return sortedData.reverse()
        }

        return sortedData
    }

    const sortedData = computed(() => sortData(data.value))

    return {changeSortState, sortIcon, sortedData}
}
import {computed, reactive, Ref} from 'vue'

import {SortableConfig, SortableEntry, SortableFunction, TableData} from '../../../../types/components/data/tableTypes'

type SortableState = {
    header: string,
    mode: string,
}

export function useSortable<T extends TableData>(data: Ref<T[]>, sortable: Ref<SortableConfig<T>>) {

    const sortState = reactive<SortableState>({
        header: '',
        mode: 'ascending',
    })

    function changeSortState(header: string): void {
        if (!Object.keys(sortable.value).includes(header))
            return

        if (header !== sortState.header) {
            sortState.header = header
            sortState.mode = 'ascending'

        } else if (sortState.mode === 'ascending') {
            sortState.mode = 'descending'

        } else if (sortState.mode === 'descending') {
            sortState.header = ''
        }
    }

    function sortIcon(header: string): string {
        if (sortable.value === true || sortable.value.hasOwnProperty(header)) {
            return sortState.header === header
                ? sortState.mode
                : 'candidate'
        }

        return ''
    }

    function sortData(data: T[]): T[] {
        if (sortState.header === '') {
            return data
        }

        const sortFunctionCandidate = (sortable.value as SortableEntry<T>)[sortState.header] as SortableFunction<T>

        const sortFunction = typeof sortFunctionCandidate === 'function'
            ? sortFunctionCandidate
            : undefined

        const sortedData = [...data].sort(sortFunction)

        return sortState.mode === 'descending'
            ? sortedData.reverse()
            : sortedData
    }

    const sortedData = computed(() => sortData(data.value))

    return {changeSortState, sortIcon, sortedData}
}
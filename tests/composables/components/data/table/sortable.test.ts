import { beforeEach,describe, expect, it } from 'vitest'
import { ref } from 'vue'
import {Ref} from 'vue'

import {useSortable} from '../../../../../src/composables/components/data/table/sortable'

// Mocks for TableData and SortableConfig
type MockTableData = { id: number, name: string }

describe('useSortable', () => {
    let data: Ref<MockTableData[]>
    let sortable: Ref<any>

    beforeEach(() => {
        // Reset the mock data and sortable config before each test
        data = ref([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' },
        ])

        sortable = ref({
            id: (a: MockTableData, b: MockTableData) => a.id - b.id,
            name: (a: MockTableData, b: MockTableData) => a.name.localeCompare(b.name),
        })
    })

    it('should initialize with default sort state', () => {
        const { sortedData } = useSortable(data, sortable)
        expect(sortedData.value).toEqual(data.value)
    })

    it('should change sort state correctly', () => {
        const { changeSortState, sortedData } = useSortable(data, sortable)

        changeSortState('name')
        expect(sortedData.value[0].name).toBe('Alice') // Check ascending order

        changeSortState('name')
        expect(sortedData.value[0].name).toBe('Charlie') // Check descending order

        changeSortState('name')
        expect(sortedData.value).toEqual(data.value) // Check reset sort state (no sorting)
    })

    it('should not change sort state for unsupported headers', () => {
        const { changeSortState, sortedData } = useSortable(data, sortable)

        changeSortState('unsupported')
        expect(sortedData.value).toEqual(data.value)
    })

    it('should return correct sort icon', () => {
        const { sortIcon, changeSortState } = useSortable(data, sortable)

        // Initially, no sorting
        expect(sortIcon('name')).toBe('candidate')

        changeSortState('name')
        expect(sortIcon('name')).toBe('ascending')

        changeSortState('name')
        expect(sortIcon('name')).toBe('descending')

        changeSortState('name')
        expect(sortIcon('name')).toBe('candidate') // After reset
    })

    it('should sort data correctly based on current sort state', () => {
        const { changeSortState, sortedData } = useSortable(data, sortable)

        changeSortState('id')
        expect(sortedData.value[0].id).toBe(1)

        changeSortState('id') // Descending
        expect(sortedData.value[0].id).toBe(3)

        changeSortState('id') // Reset sort
        expect(sortedData.value).toEqual(data.value)
    })
})

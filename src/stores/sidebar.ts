import {defineStore} from 'pinia'

import {SidebarItem} from '../types/sidebar/sidebarItem'

interface SidebarState {
    activeItem: SidebarItem | null
}

export const useSidebarStore = defineStore('sidebar', {
    state: (): SidebarState => ({
        activeItem: null,
    }),

    actions: {
        setActiveItem(item: SidebarItem | null): void {
            this.activeItem = item
        },
        closeSidebar(): void {
            this.activeItem = null
        },
    },

    getters: {
        isOpen: (state): boolean => state.activeItem !== null,
    },
})
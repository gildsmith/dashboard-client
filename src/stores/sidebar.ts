import {defineStore} from 'pinia'
import type {Component} from 'vue'

export interface SidebarItem {
    component: Component;
    title: string;
}

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
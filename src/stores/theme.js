import {defineStore} from 'pinia'

/*
 | ---------------------------------------------------------------------------
 | Theme Store
 | ---------------------------------------------------------------------------
 | Manages theme settings, storing all personalization in localStorage
 */

export const useThemeStore = defineStore('theme', {
    state: () => ({
        isNavigationFolded: localStorage.getItem('theme-left-panel-folded') === 'true',
    }),

    actions: {
        foldNavigation() {
            this.isNavigationFolded = !this.isNavigationFolded
            localStorage.setItem('theme-left-panel-folded', this.isNavigationFolded.toString())
        }
    }
})
import {defineStore} from 'pinia'

/*
 | ---------------------------------------------------------------------------
 | Theme Store
 | ---------------------------------------------------------------------------
 | Manages theme settings, storing all personalization in localStorage
 */

interface ThemeState {
    isNavigationFolded: boolean
}

export const useThemeStore = defineStore('theme', {
    state: (): ThemeState => ({
        isNavigationFolded: localStorage.getItem('theme-left-panel-folded') === 'true',
    }),

    actions: {
        foldNavigation() {
            this.isNavigationFolded = !this.isNavigationFolded
            localStorage.setItem('theme-left-panel-folded', this.isNavigationFolded.toString())
        },
    },
})
<!--suppress CssUnusedSymbol -->

<script setup>
import {computed} from 'vue'

import GildsmithLogomark from '../../components/brand/GildsmithLogomark.vue'
import {useSidebarStore} from '../../stores/sidebar.ts'
import {useThemeStore} from '../../stores/theme.ts'
import ActionsList from './dashboard/ActionsList.vue'
import NavigationHeader from './dashboard/NavigationHeader.vue'
import NavigationList from './dashboard/NavigationList.vue'
import PreviewBox from './dashboard/PreviewBox.vue'
import SidebarHeader from './dashboard/SidebarHeader.vue'

/*
 | ---------------------------------------------------------------------------
 | Default Dashboard Root
 | ---------------------------------------------------------------------------
 | This is the default component for the dashboard root. It loads
 | automatically unless a custom one exists at @/gildsmith/dashboard/App.vue.
 */

const themeStore = useThemeStore()
const sidebarStore = useSidebarStore()

const dashboardClasses = computed(() => ({
    'dashboard': true,
    'dashboard--navigation-folded': themeStore.isNavigationFolded,
    'dashboard--sidebar-active': sidebarStore.isOpen,
}))
</script>

<template>
    <div :class="dashboardClasses">
        <div class="dashboard-navigation">
            <NavigationHeader/>
            <GildsmithLogomark v-if="themeStore.isNavigationFolded" class="navigation-logomark"/>
            <NavigationList/>
            <PreviewBox/>
        </div>
        <div class="dashboard-router-view">
            <RouterView/>
        </div>
        <div class="dashboard-sidebar">
            <SidebarHeader/>
            <component :is="sidebarStore?.activeItem?.component"/>
        </div>
        <div class="dashboard-actions-list">
            <ActionsList/>
        </div>
    </div>
</template>

<style>
/*
 * Following styles describe the sizes of all grid columns,
 * as well as styles to some core elements present on side panels.
 */
:root {
    --navigation-width: 20em;
    --router-view-width: auto;
    --dynamic-view-width: 20em;
    --actions-list-width: 5em;
}

.dashboard {
    @apply grid mx-auto min-h-full text-flint-800 bg-flint-25 antialiased;
    grid-template-columns: var(--navigation-width) var(--router-view-width) var(--dynamic-view-width) var(--actions-list-width);
}

.dashboard.dashboard--navigation-folded {
    --navigation-width: 5em;
}

.dashboard-navigation {
    @apply overflow-y-auto overflow-x-hidden sticky border-r border-flint-200 h-full max-h-dvh bg-white top-0 flex flex-col;
}

.dashboard-router-view {
    @apply grid items-start self-start gap-16 p-16;
}

.dashboard-sidebar {
    @apply overflow-y-auto overflow-x-hidden sticky border-l border-flint-200 h-full max-h-dvh bg-white top-0;
}

.dashboard-actions-list {
    @apply overflow-y-auto overflow-x-hidden sticky border-l border-flint-200 h-full max-h-dvh bg-white top-0;
}

.dashboard:not(.dashboard--sidebar-active) .dashboard-router-view {
    @apply col-span-2;
}

.dashboard:not(.dashboard--sidebar-active) .dashboard-sidebar {
    @apply hidden;
}

.navigation-logomark {
    @apply mx-auto my-4;
}

.dashboard--right-panel-folded .action-center-title {
    @apply hidden;
}

/*
 * This section is responsible for styling scrollbars, globally.
 */
::-webkit-scrollbar {
    @apply h-4 w-2;
}

::-webkit-scrollbar:horizontal {
    @apply w-4 h-2;
}

::-webkit-scrollbar-track {
    @apply bg-transparent;
}

::-webkit-scrollbar-thumb {
    @apply bg-flint-200 border border-white;
}

::-webkit-scrollbar-thumb:hover {
    @apply bg-flint-300;
}

/*
 * These part of styles are considered global, meaning
 * you can safely use them within your own components
 * to keep the style of the dashboard uniform.
 */
.input {
    @apply border border-flint-300 py-1.5 px-3.5 rounded-md shadow-xs;
    @apply hover:border-flint-950;
}

.button {
    @apply flex items-center gap-2 bg-white py-1.5 px-3.5 border border-flint-300 cursor-pointer
    rounded-md text-sm shadow-skeumorphism shadow-sm font-semibold text-flint-700;
    @apply hover:border-flint-500 transition;
}

.header {
    @apply text-2xl font-semibold;
}

.subheader {
    @apply text-xl font-medium text-flint-800;
}

.description {
    @apply text-flint-500 block;
}

.footnote {
    @apply text-flint-500 text-sm;
}

.error {
    @apply font-medium text-red-500;
}

.section {
    @apply grid gap-4;
}

.list {
    @apply border bg-white;
}

.list-item {
    @apply p-4 flex-1 flex items-center justify-between gap-8;
}

.list-item:not(:last-of-type) {
    @apply border-b;
}

/*
 * This simple fix stops Tabler Icons
 * from being squashed by flex content.
 */
.tabler-icon {
    @apply shrink-0 text-flint-700;
}
</style>

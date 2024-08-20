<!--suppress CssUnusedSymbol -->

<script setup>
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-vue'
import {computed, ref} from 'vue'
import {useI18n} from 'vue-i18n'

import ActionCenter from '../../components/dashboard/ActionCenterPanel.vue'
import DashboardPersonalization from '../../components/dashboard/DashboardPersonalization.vue'
import NaviagationPanel from '../../components/dashboard/NaviagationPanel.vue'
import GildsmithLogo from '../../components/gildsmith/GildsmithLogo.vue'
import GildsmithLogomark from '../../components/gildsmith/GildsmithLogomark.vue'

/*
 | ---------------------------------------------------------------------------
 | Default Dashboard Root
 | ---------------------------------------------------------------------------
 | This is the default component for the dashboard root. It loads
 | automatically unless a custom one exists at @/gildsmith/dashboard/App.vue.
 */

const {t} = useI18n()

/*
 | ---------------------------------------------------------------------------
 | Foldable Panels
 | ---------------------------------------------------------------------------
 | These states and functions manage the folding (collapsing) of the left
 | and right panels. The state is persisted in localStorage to maintain
 | the user's preference.
 */

const isLeftPanelFolded = ref(localStorage.getItem('theme-left-panel-folded') === 'true')
const isRightPanelFolded = ref(localStorage.getItem('theme-right-panel-folded') === 'true')

function foldLeftPanel() {
    isLeftPanelFolded.value = !isLeftPanelFolded.value
    localStorage.setItem('theme-left-panel-folded', isLeftPanelFolded.value.toString())
}

function foldRightPanel() {
    isRightPanelFolded.value = !isRightPanelFolded.value
    localStorage.setItem('theme-right-panel-folded', isRightPanelFolded.value.toString())
}

const dashboardClasses = computed(() => ({
    'dashboard': true,
    'dashboard--left-panel-folded': isLeftPanelFolded.value,
    'dashboard--right-panel-folded': isRightPanelFolded.value,
}))
</script>

<template>
    <div :class="dashboardClasses">
        <div class="dashboard-panel dashboard-panel--left">
            <div class="dashboard-panel-header">
                <GildsmithLogo class="logo"/>
                <div class="fold-panel-button" @click="foldLeftPanel">
                    <IconChevronRight v-if="isLeftPanelFolded" size="24" stroke="2"/>
                    <IconChevronLeft v-else size="24" stroke="2"/>
                </div>
            </div>
            <GildsmithLogomark class="logomark"/>
            <NaviagationPanel/>
            <DashboardPersonalization/>
        </div>
        <div class="router-view">
            <RouterView/>
        </div>
        <div class="dashboard-panel dashboard-panel--right">
            <div class="dashboard-panel-header">
                <div class="fold-panel-button" @click="foldRightPanel">
                    <IconChevronLeft v-if="isRightPanelFolded" size="24" stroke="2"/>
                    <IconChevronRight v-else size="24" stroke="2"/>
                </div>
                <div class="action-center-title">{{ t('Action Center') }}</div>
            </div>
            <ActionCenter/>
        </div>
    </div>
</template>

<style>
body {
    @apply bg-slate-50 antialiased;
}

/*
 * Following styles describe the sizes of all
 * grid columns, as well as styles to some core
 * elements present on side panels.
 */
.dashboard {
    @apply grid mx-auto gap-16 min-h-full text-slate-800;
    grid-template-columns: 20em auto 20em;
}

.dashboard.dashboard--left-panel-folded {
    grid-template-columns: 5em auto 20em;
}

.dashboard.dashboard--right-panel-folded {
    grid-template-columns: 20em auto 5em;
}

.dashboard.dashboard--left-panel-folded.dashboard--right-panel-folded {
    grid-template-columns: 5em auto 5em;
}

.router-view {
    @apply grid items-start self-start gap-16 py-8;
}

.dashboard-panel {
    @apply overflow-y-auto overflow-x-hidden sticky border-x h-full max-h-dvh bg-white top-0;
}

.dashboard-panel-header {
    @apply flex items-center justify-between p-4 border-b border-slate-100 sticky top-0 bg-white;
}

.fold-panel-button {
    @apply p-2 border cursor-pointer rounded-full;
}

.dashboard--left-panel-folded .logo {
    @apply hidden;
}

.logomark {
    @apply mx-auto my-4 hidden;
}

.dashboard--left-panel-folded .logomark {
    @apply block;
}

.dashboard--right-panel-folded .action-center-title {
    @apply hidden;
}

/*
 * This section contains rules related to
 * scrollbar styling.
 */
::-webkit-scrollbar {
    height: 1rem;
    width: .5rem
}

::-webkit-scrollbar:horizontal {
    height: .5rem;
    width: 1rem
}

::-webkit-scrollbar-track {
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    @apply bg-slate-200;
    border-color: #ffffff;
    border-width: 1px
}

::-webkit-scrollbar-thumb:hover {
    @apply bg-slate-300;
}

/*
 * These part of styles are considered global, meaning
 * you can safely use them within your own components
 * to keep the style of the dashboard uniform.
 */
.input {
    @apply border border-slate-200 py-2 px-3 rounded-none;
}

.button {
    @apply flex items-center gap-2 bg-white py-2 px-4 border cursor-pointer rounded-full text-sm;
    @apply hover:border-slate-950 transition;
}

.header {
    @apply text-2xl font-semibold;
}

.subheader {
    @apply text-xl font-medium;
}

.description {
    @apply text-slate-500 block;
}

.footnote {
    @apply text-slate-500 text-sm;
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
 * from being squashed by flex content
 */
.tabler-icon {
    @apply shrink-0;
}
</style>

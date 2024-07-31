<!--suppress CssUnusedSymbol -->

<script setup>
import GildsmithLogo from '../../components/GildsmithLogo.vue'
import ActionCenter from '../../components/dashboard/ActionCenter.vue'
import NaviagationPanel from '../../components/dashboard/NaviagationPanel.vue'
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-vue'
import {computed, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import DashboardPersonalization from '../../components/dashboard/DashboardPersonalization.vue'
import GildsmithLogomark from '../../components/GildsmithLogomark.vue'

const {t} = useI18n()

/*
 | ---------------------------------------------------------------------------
 | Foldable Panels
 | ---------------------------------------------------------------------------
 | These states and functions manage the folding (collapsing) of the left
 | and right panels. The state is persisted in localStorage to maintain
 | the user's preference.
 */

const isLeftPanelFolded = ref(localStorage.getItem('theme-left-folded') === 'true')
const isRightPanelFolded = ref(localStorage.getItem('theme-right-folded') === 'true')

function toggleLeftPanel() {
    isLeftPanelFolded.value = !isLeftPanelFolded.value
    localStorage.setItem('theme-left-folded', isLeftPanelFolded.value.toString())
}

function toggleRightPanel() {
    isRightPanelFolded.value = !isRightPanelFolded.value
    localStorage.setItem('theme-right-folded', isRightPanelFolded.value.toString())
}

const dashboardClasses = computed(() => ({
    'dashboard': true,
    'dashboard--left-folded': isLeftPanelFolded.value,
    'dashboard--right-folded': isRightPanelFolded.value,
}))
</script>

<template>
    <div :class="dashboardClasses">
        <div class="dashboardPanel dashboardPanel--left">
            <div class="dashboardPanelHeader">
                <GildsmithLogo class="dashboardLogo"/>
                <div class="dashboardThemeButton" @click="toggleLeftPanel">
                    <IconChevronRight v-if="isLeftPanelFolded" size="24" stroke="2"/>
                    <IconChevronLeft v-else size="24" stroke="2"/>
                </div>
            </div>
            <GildsmithLogomark class="dashboardLogomark"/>
            <NaviagationPanel/>
            <DashboardPersonalization/>
        </div>
        <div class="dashboardRouterView">
            <RouterView/>
        </div>
        <div class="dashboardPanel dashboardPanel--right">
            <div class="dashboardPanelHeader">
                <div class="dashboardThemeButton" @click="toggleRightPanel">
                    <IconChevronLeft v-if="isRightPanelFolded" size="24" stroke="2"/>
                    <IconChevronRight v-else size="24" stroke="2"/>
                </div>
                <div class="dashboardActionCenterTitle">{{ t('Action Center') }}</div>
            </div>
            <ActionCenter/>
        </div>
    </div>
</template>

<style>
body {
    @apply bg-slate-50 antialiased;
}

/* Dashboard & Folding Adjustment */
.dashboard {
    @apply grid mx-auto gap-16 min-h-full;
    grid-template-columns: 20em auto 20em;
}

.dashboard.dashboard--left-folded {
    grid-template-columns: 5em auto 20em;
}

.dashboard.dashboard--right-folded {
    grid-template-columns: 20em auto 5em;
}

.dashboard.dashboard--left-folded.dashboard--right-folded {
    grid-template-columns: 5em auto 5em;
}

/* Side Foldanle Panels */
.dashboardPanel {
    @apply overflow-y-auto overflow-x-hidden sticky border-x h-full max-h-dvh bg-white top-0;
}

.dashboardPanelHeader {
    @apply flex items-center justify-center p-4 border-b border-slate-100 sticky top-0 bg-white;
}

.dashboardThemeButton {
    @apply p-2 border cursor-pointer;
}

/* Logo Box */
.dashboardLogo {
    @apply mr-auto;
}

.dashboard--left-folded .dashboardLogo {
    @apply hidden;
}

.dashboardLogomark {
    @apply mx-auto my-4 hidden;
}

.dashboard--left-folded .dashboardLogomark {
    @apply block;
}

/* Action Center Box */
.dashboardActionCenterTitle {
    @apply ml-auto;
}

.dashboard--right-folded .dashboardActionCenterTitle {
    @apply hidden;
}

/* Router View */
.dashboardRouterView {
    @apply grid items-start self-start gap-16 py-8;
}

/* Global Scrollbar Styles */
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

/* Common Global Styles */
.input {
    @apply border border-slate-200 py-2 px-3 rounded-none;
}

.button {
    @apply flex items-center gap-2 bg-white py-2 px-4 border cursor-pointer;
}

.header {
    @apply text-2xl font-medium;
}

.subheader {
    @apply text-xl font-medium;
}

.description {
    @apply text-slate-600 max-w-lg block;
}

.footnote {
    @apply text-slate-500 text-sm italic;
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

.listElement {
    @apply p-4 flex-1 flex items-center gap-8;
}

.listElement:not(:last-of-type) {
    @apply border-b;
}

/* This fixes Tabler icons being squashed by flex content */
.tabler-icon {
    @apply shrink-0;
}
</style>

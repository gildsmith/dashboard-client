<!--suppress CssUnusedSymbol -->

<script setup>
import ContextPanel from '../components/Dashboard/ContextPanel.vue'
import NaviagationPanel from '../components/Dashboard/NaviagationPanel.vue'
import AppLogo from '../components/Dashboard/AppLogo.vue'
import LanguageSelect from '../components/LanguageSelect.vue'
import {computed, onMounted, ref} from 'vue'
import {
    IconLayoutSidebarLeftCollapse,
    IconLayoutSidebarLeftExpand,
    IconLayoutSidebarRightCollapse,
    IconLayoutSidebarRightExpand,
    IconMoon,
    IconViewportNarrow,
    IconViewportWide,
} from '@tabler/icons-vue'


const isNarrow = ref(localStorage.getItem('theme-narrow') === 'true')
const isLeftPanelFolded = ref(localStorage.getItem('theme-left-folded') === 'true')
const isRightPanelFolded = ref(localStorage.getItem('theme-right-folded') === 'true')

function toggleNarrow() {
    isNarrow.value = !isNarrow.value
    localStorage.setItem('theme-narrow', isNarrow.value.toString())
}

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
    'dashboard--narrow': isNarrow.value,
    'dashboard--left-folded': isLeftPanelFolded.value,
    'dashboard--right-folded': isRightPanelFolded.value,
}))

function toggleTheme() {
    document.documentElement.classList.contains('dark')
        ? document.documentElement.classList.remove('dark')
        : document.documentElement.classList.add('dark')

    localStorage.setItem('theme-dark', document.documentElement.classList.contains('dark').toString())
}

onMounted(() => {
    if (localStorage.getItem('theme-dark') === 'true') {
        document.documentElement.classList.add('dark')
    }
})
</script>

<template>
    <div :class="dashboardClasses">
        <div class="dashboardPanel dashboardPanel--left">
            <div class="dashboardPanelHeader">
                <AppLogo class="dashboardPanelLogo"/>
                <div class="dashboardThemeButton" @click="toggleLeftPanel">
                    <IconLayoutSidebarLeftExpand v-if="isLeftPanelFolded" size="24" stroke="2"/>
                    <IconLayoutSidebarLeftCollapse v-else size="24" stroke="2"/>
                </div>
            </div>
            <NaviagationPanel/>
            <div class="dashboardCustomisation">
                <div class="dashboardThemeButton" @click="toggleNarrow">
                    <IconViewportWide v-if="isNarrow" size="24" stroke="2"/>
                    <IconViewportNarrow v-else size="24" stroke="2"/>
                </div>
                <div class="dashboardThemeButton" @click="toggleTheme">
                    <IconMoon size="24" stroke="2"/>
                </div>
                <LanguageSelect/>
            </div>
        </div>
        <div class="dashboardPage">
            <RouterView/>
        </div>
        <div class="dashboardPanel dashboardPanel--right">
            <div class="dashboardPanelHeader">
                <div class="dashboardThemeButton" @click="toggleRightPanel">
                    <IconLayoutSidebarRightExpand v-if="isRightPanelFolded" size="24" stroke="2"/>
                    <IconLayoutSidebarRightCollapse v-else size="24" stroke="2"/>
                </div>
                <div class="dashboardPanelTitle">Context Panel</div>
            </div>
            <ContextPanel/>
        </div>
    </div>
</template>

<style>
body {
    @apply bg-slate-50;
    @apply dark:bg-slate-800;
}

.dashboard {
    @apply grid mx-auto gap-20 min-h-full;
    @apply dark:text-white;
    grid-template-columns: 20em auto auto 20em;
}

.dashboard--narrow {
    @apply max-w-screen-2xl py-16;
}

.dashboard.dashboard--left-folded {
    grid-template-columns: 5em auto auto 20em;
}

.dashboard.dashboard--right-folded {
    grid-template-columns: 20em auto auto 5em;
}

.dashboard.dashboard--left-folded.dashboard--right-folded {
    grid-template-columns: 5em auto auto 5em;
}

.dashboardPanelLogo {
    @apply mr-auto;
}

.dashboard--left-folded .dashboardPanelLogo {
    @apply hidden;
}

.dashboardPanelTitle {
    @apply ml-auto;
}

.dashboard--right-folded .dashboardPanelTitle {
    @apply hidden;
}

.dashboardCustomisation {
    @apply p-4 flex border-t border-t-slate-100 items-center sticky bottom-0 bg-white gap-4;
    @apply dark:border-t-slate-700 dark:bg-slate-800;
}

.dashboard--left-folded .dashboardCustomisation {
    @apply hidden;
}

.dashboardCustomisation select {
    @apply flex-1;
}

.dashboardPage {
    @apply col-span-2 grid grid-cols-2 items-start self-start gap-20;
}

.dashboard:not(.dashboard--narrow) .dashboardPage {
    @apply py-16;
}

.dashboardPanel {
    @apply overflow-y-auto overflow-x-hidden sticky shadow-shallow border border-slate-100 h-full rounded max-h-dvh bg-white;
    @apply dark:border-slate-700 dark:bg-slate-800;
    max-height: 100vh;
}

.dashboard--narrow .dashboardPanel {
    max-height: calc(100vh - 8em);
}

.dashboardPanelHeader {
    @apply flex items-center justify-center p-4 border-b border-slate-100 sticky top-0 bg-white;
    @apply dark:border-slate-700 dark:bg-slate-800;
}

.dashboardThemeButton {
    @apply p-2 bg-slate-100 text-slate-800 cursor-pointer rounded;
    @apply dark:bg-slate-700 dark:text-slate-100;
}

/* Global scrollbar styles  */
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
    @apply dark:bg-slate-500;
    border-color: #ffffff;
    border-width: 1px
}

::-webkit-scrollbar-thumb:hover {
    @apply bg-slate-300;
    @apply dark:bg-slate-400;
}

/* Global input styles */
.input {
    @apply border border-slate-200 py-2 px-3;
    @apply dark:bg-slate-700 dark:border-slate-700;
}

</style>

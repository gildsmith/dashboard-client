<!--suppress CssUnusedSymbol -->

<script setup>
import AppLogo from '../components/AppLogo.vue'
import LanguageSelect from '../components/LanguageSelect.vue'
import ActionCenter from '../sections/ActionCenter.vue'
import NaviagationPanel from '../sections/NaviagationPanel.vue'
import {IconChevronLeft, IconChevronRight, IconMoon} from '@tabler/icons-vue'
import {computed, onMounted, ref} from 'vue'
import {useI18n} from 'vue-i18n'

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

/*
 | ---------------------------------------------------------------------------
 | Theme Toggling
 | ---------------------------------------------------------------------------
 | This function toggles the theme between light and dark. The current
 | theme is stored in localStorage to ensure the theme preference is
 | maintained across sessions.
 */

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
                <AppLogo class="dashboardLogo"/>
                <div class="dashboardThemeButton" @click="toggleLeftPanel">
                    <IconChevronRight v-if="isLeftPanelFolded" size="24" stroke="2"/>
                    <IconChevronLeft v-else size="24" stroke="2"/>
                </div>
            </div>
            <NaviagationPanel/>
            <div class="dashboardPersonalizationBox">
                <div class="dashboardThemeButton" @click="toggleTheme">
                    <IconMoon size="24" stroke="2"/>
                </div>
                <LanguageSelect/>
            </div>
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
    @apply bg-slate-50;
    @apply dark:bg-slate-800;
}

/* Dashboard & Folding Adjustment */
.dashboard {
    @apply grid mx-auto gap-16 min-h-full;
    @apply dark:text-white;
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
    @apply dark:border-slate-700 dark:bg-slate-800;
}

.dashboardPanelHeader {
    @apply flex items-center justify-center p-4 border-b border-slate-100 sticky top-0 bg-white;
    @apply dark:border-slate-700 dark:bg-slate-800;
}

.dashboardThemeButton {
    @apply p-2 border cursor-pointer;
    @apply dark:border-slate-700 dark:text-slate-100;
}

/* Logo Box */
.dashboardLogo {
    @apply mr-auto;
}

.dashboard--left-folded .dashboardLogo {
    @apply hidden;
}

/* Action Center Box */
.dashboardActionCenterTitle {
    @apply ml-auto;
}

.dashboard--right-folded .dashboardActionCenterTitle {
    @apply hidden;
}

/* Personalization Box */
.dashboardPersonalizationBox {
    @apply p-4 flex border-t border-t-slate-100 items-center sticky bottom-0 bg-white gap-4;
    @apply dark:border-t-slate-700 dark:bg-slate-800;
}

.dashboard--left-folded .dashboardPersonalizationBox {
    @apply hidden;
}

.dashboardPersonalizationBox select {
    @apply flex-1;
}

.dashboardRouterView {
    @apply grid grid-cols-2 items-start self-start gap-8 py-8;
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
    @apply dark:bg-slate-500;
    border-color: #ffffff;
    border-width: 1px
}

::-webkit-scrollbar-thumb:hover {
    @apply bg-slate-300;
    @apply dark:bg-slate-400;
}

/* Global Input Styles */
.input {
    @apply border border-slate-200 py-2 px-3 rounded-none;
    @apply dark:bg-slate-700 dark:border-slate-700 dark:hover:border-slate-600;
}

.button {
    @apply bg-slate-100 text-slate-950 border-slate-100 py-1 rounded-none cursor-pointer;
    @apply dark:bg-slate-600 dark:border-slate-600 dark:text-white;
}

/* Global Shared Styles */
.pageHeader {
    @apply flex flex-col gap-2;
}

.pageDescription {
    @apply text-slate-600 max-w-96;
}
</style>

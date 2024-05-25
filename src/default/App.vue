<!--suppress CssUnusedSymbol -->

<script setup>
import {IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand, IconLayoutSidebarRightCollapse, IconLayoutSidebarRightExpand} from '@tabler/icons-vue'
import ContextPanel from '../components/Dashboard/ContextPanel.vue'
import NaviagationPanel from '../components/Dashboard/NaviagationPanel.vue'
import AppLogotype from '../components/Dashboard/AppLogotype.vue'
import {computed, ref} from 'vue'

const isLeftPanelFolded = ref(false)
const isRightPanelFolded = ref(false)


function toggleLeftPanel() {
    isLeftPanelFolded.value = !isLeftPanelFolded.value
}

function toggleRightPanel() {
    isRightPanelFolded.value = !isRightPanelFolded.value
}

const dashboardClasses = computed(() => ({
    dashboard: true,
    'dashboard--left-folded': isLeftPanelFolded.value,
    'dashboard--right-folded': isRightPanelFolded.value,
}))
</script>

<template>
    <div :class="dashboardClasses">
        <div class="dashboardPanel dashboardPanel--left">
            <div class="dashboardPanelHeader">
                <AppLogotype class="dashboardPanelLogo"/>
                <div class="dashboardPanelFoldButton" @click="toggleLeftPanel">
                    <IconLayoutSidebarLeftExpand v-if="isLeftPanelFolded" size="24" stroke="2"/>
                    <IconLayoutSidebarLeftCollapse v-else size="24" stroke="2"/>
                </div>
            </div>
            <NaviagationPanel :folded="isLeftPanelFolded"/>
        </div>
        <div class="dashboardPage">
            <RouterView/>
        </div>
        <div class="dashboardPanel dashboardPanel--right">
            <div class="dashboardPanelHeader">
                <div class="dashboardPanelFoldButton" @click="toggleRightPanel">
                    <IconLayoutSidebarRightExpand v-if="isRightPanelFolded" size="24" stroke="2"/>
                    <IconLayoutSidebarRightCollapse v-else size="24" stroke="2"/>
                </div>
                <div class="dashboardPanelTitle">Context Panel</div>
            </div>
            <ContextPanel :folded="isRightPanelFolded"/>
        </div>
    </div>
</template>

<style>
.dashboard {
    @apply grid max-w-screen-2xl mx-auto py-16 gap-20 min-h-full;
    grid-template-columns: 360px auto auto 360px;
}

.dashboard.dashboard--left-folded {
    grid-template-columns: 80px auto auto 360px;
}

.dashboard.dashboard--right-folded {
    grid-template-columns: 360px auto auto 80px;
}

.dashboard.dashboard--left-folded.dashboard--right-folded {
    grid-template-columns: 80px auto auto 80px;
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

.dashboardPage {
    @apply col-span-2 grid grid-cols-2 items-start self-start gap-20;
}

.dashboardPanel {
    @apply overflow-y-auto overflow-x-hidden sticky shadow-deep border border-slate-100 h-full top-16 rounded;
    max-height: calc(100vh - 128px);
}

.dashboardPanelHeader {
    @apply flex items-center justify-center p-4 border-b border-slate-100 sticky top-0 bg-white;
}

.dashboardPanelFoldButton {
    @apply p-2 bg-slate-100 text-slate-800 cursor-pointer;
}

/* Global scrollbar CSS */
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
</style>

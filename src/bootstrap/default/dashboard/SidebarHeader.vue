<script setup>
import {IconX} from '@tabler/icons-vue'

import {useSidebarStore} from '../../../stores/sidebar.ts'

/* ---------------------------------------------------------------------------
 | Sidebar Header
 | ---------------------------------------------------------------------------
 | TODO!
 */

const sidebarStore = useSidebarStore()
</script>

<template>
    <div class="sidebar-header" v-if="sidebarStore.activeItem">
        <div>{{ sidebarStore.activeItem?.title ?? 'Sidebar' }}</div>
        <div class="close-sidebar" @click="sidebarStore.closeSidebar()">
            <IconX size="24" stroke="2"/>
        </div>
    </div>
</template>

<style scoped>


.sidebar-header {
    @apply flex items-center justify-between p-4 border-b border-flint-100 sticky top-0 bg-white;
}

.close-sidebar {
    @apply p-2 cursor-pointer rounded-md;
    @apply hover:bg-flint-50;
}
</style>
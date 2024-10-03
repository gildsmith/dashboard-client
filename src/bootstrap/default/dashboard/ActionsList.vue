<script setup>
import {IconInfoCircle} from '@tabler/icons-vue'

import PreviewSidebar from '../../../sidebars/PreviewSidebar.vue'
import {useSidebarStore} from '../../../stores/sidebar.ts'

/* ---------------------------------------------------------------------------
 | Actions List
 | ---------------------------------------------------------------------------
 | Displays a list of quick actions on the right side of the dashboard.
 |
 | These actions typically open dynamic views (non-intrusive cards on
 | the left) that show information but do not modify any data.
 |
 | TODO
 */

const sidebarStore = useSidebarStore()

const first = {
    title: 'Preview',
    component: PreviewSidebar,
}
</script>

<template>
    <div class="actions-list">
        <div class="action" @click="sidebarStore.setActiveItem(first)">
            <IconInfoCircle size="24" stroke="1.75"/>
        </div>
    </div>
</template>

<style scoped>
.actions-list {
    @apply flex flex-col gap-2 py-4 items-center;
}

.action {
    @apply p-2 cursor-pointer rounded-md;
    @apply hover:bg-flint-50;
}
</style>
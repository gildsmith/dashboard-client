<script setup>
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-vue'

import GildsmithLogo from '../../../components/brand/GildsmithLogo.vue'
import {useThemeStore} from '../../../stores/theme.ts'

/* ---------------------------------------------------------------------------
 | Navigation Header
 | ---------------------------------------------------------------------------
 | Displays the Gildsmith logo and provides a button to toggle the
 | navigation section between folded and unfolded states.
 */

const themeStore = useThemeStore()
</script>

<template>
    <div class="navigation-header">
        <GildsmithLogo class="logo" v-if="!themeStore.isNavigationFolded"/>
        <div class="fold-navigation" @click="themeStore.foldNavigation()">
            <IconChevronRight v-if="themeStore.isNavigationFolded" size="24" stroke="1.75"/>
            <IconChevronLeft v-else size="24" stroke="1.75"/>
        </div>
    </div>
</template>

<style scoped>


.navigation-header {
    @apply flex items-center justify-between p-4 border-b border-flint-100 sticky top-0 bg-white;
}

.fold-navigation {
    @apply p-2 cursor-pointer rounded-md;
    @apply hover:bg-flint-50;
}
</style>
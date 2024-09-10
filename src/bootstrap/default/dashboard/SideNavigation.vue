<script setup>
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router'

/* ---------------------------------------------------------------------------
 | Side Navigation
 | ---------------------------------------------------------------------------
 | The navigation links are dynamically generated from the router's
 | available routes. Only routes with a name and a length greater than 1
 | are displayed, and they are ordered based on their meta 'order' value.
 */

const {t} = useI18n()
const children = useRouter().getRoutes() || []
const navChildren = computed(() => children
    .filter(child => child.meta?.name?.length > 1)
    .sort((a, b) => (a.meta?.order || 0) - (b.meta?.order || 0)))
</script>

<template>
    <div class="nav-container">
        <RouterLink v-for="(navItem, key) in navChildren" :key="key" :to="{name: navItem.name}" class="nav-link">
            <component :is="navItem.meta.icon" v-if="navItem.meta.icon" size="24" stroke="1.75" class="nav-icon"/>
            <div class="nav-text">
                <span class="nav-name">{{ t(navItem.meta.name) }}</span>
                <span v-if="navItem.meta.description" class="nav-description">{{ t(navItem.meta.description) }}</span>
            </div>
        </RouterLink>
    </div>
</template>

<style scoped>
.nav-container {
    @apply flex-1;
}

.nav-link {
    @apply flex gap-4 p-4 items-center;
    @apply hover:bg-flint-50;
}

.nav-icon {
    @apply text-flint-500;
}

.nav-text {
    @apply flex flex-col;
}

.nav-name {
    @apply font-semibold text-flint-700;
}

.nav-description {
    @apply text-sm text-flint-500;
}

.dashboard--navigation-folded .nav-link {
    @apply flex-col;
}

.dashboard--navigation-folded .nav-text {
    @apply hidden;
}
</style>
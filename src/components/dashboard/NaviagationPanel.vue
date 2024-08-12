<script setup>
import {useRouter} from 'vue-router'
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const children = useRouter().getRoutes() || []
const navChildren = computed(() => children
    .filter(child => child.meta?.name?.length > 1)
    .sort((a, b) => (a.meta?.order || 0) - (b.meta?.order || 0)))
</script>

<template>
    <div class="nav-container">
        <RouterLink v-for="(navItem, key) in navChildren" :key="key" :to="{name: navItem.name}" class="nav-link">
            <component :is="navItem.meta.icon" v-if="navItem.meta.icon" size="24" stroke="2"/>
            <div class="nav-text">
                <span>{{ t(navItem.meta.name) }}</span>
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
    @apply hover:bg-slate-50;
}

.nav-text {
    @apply flex flex-col;
}

.nav-description {
    @apply text-sm text-slate-500;
}

.dashboard--left-panel-folded .nav-link {
    @apply flex-col;
}

.dashboard--left-panel-folded .nav-text {
    @apply hidden;
}
</style>
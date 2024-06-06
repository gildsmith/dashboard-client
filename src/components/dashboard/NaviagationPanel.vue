<script setup>
import {useRouter} from 'vue-router'
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const children = useRouter().getRoutes() || []
const navChildren = computed(() => {
    return children
        .filter(child => child.meta?.name?.length > 1)
        .sort((a, b) => (a.meta?.order || 0) - (b.meta?.order || 0))
})
</script>

<template>
    <div class="navContainer">
        <RouterLink v-for="(navItem, key) in navChildren" :key="key" :to="{name: navItem.name}" class="navLink">
            <div class="navIcon">
                <component :is="navItem.meta.icon" v-if="navItem.meta.icon" size="24" stroke="2"/>
            </div>
            <div class="navText">
                <span class="navName">{{ t(navItem.meta.name) }}</span>
                <span v-if="navItem.meta.description" class="navDescription">{{ t(navItem.meta.description) }}</span>
            </div>
        </RouterLink>
    </div>
</template>

<style scoped>
.navContainer {
    @apply flex-1;
}

.navLink {
    @apply flex gap-4 p-4 items-center;
    @apply hover:bg-slate-50;
    @apply hover:dark:bg-slate-700;
}

.navText {
    @apply flex flex-col;
}

.navName {
}

.navShortName {
    @apply text-xs uppercase font-medium;
}

.navDescription {
    @apply text-sm text-slate-500;
}

.dashboard--left-folded .navLink {
    @apply flex-col;
}

.dashboard--left-folded .navText {
    @apply hidden;
}
</style>
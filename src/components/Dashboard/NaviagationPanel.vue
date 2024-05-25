<script setup>
import {useRouter} from 'vue-router'
import {computed} from 'vue'

const children = useRouter().getRoutes() || []
const navChildren = computed(() => {
    return children.filter(child => {
        return child.meta?.name?.length > 1
    }).sort((a, b) => (a.meta?.order || 0) - (b.meta?.order || 0))
})
</script>

<template>
    <RouterLink v-for="(navItem, key) in navChildren" :key="key" :to="{name: navItem.name}" class="navLink">
        <div class="navIcon">
            <component :is="navItem.meta.icon" v-if="navItem.meta.icon" size="24" stroke="2"/>
        </div>
        <div class="navText">
            <span class="navName">{{ navItem.meta.name }}</span>
            <span class="navDescription" v-if="navItem.meta.description">{{ navItem.meta.description }}</span>
        </div>
    </RouterLink>
</template>

<style scoped>
.navLink {
    @apply flex gap-4 p-4 items-center;
    @apply hover:bg-slate-50;
}

.navText {
    @apply flex flex-col;
}

.navName {
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
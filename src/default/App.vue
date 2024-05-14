<script setup>
import {useRouter} from 'vue-router'
import {computed} from 'vue'

const children = useRouter().getRoutes() || []
const navChildren = computed(() => {
    return children.filter(child => {
        return child.meta?.name?.length > 1
    }).reverse()
})
</script>

<template>
    <div class="dashboardContainer">
        <div class="dashboardNavigation">
            <div class="navigationLogo">GILDSMITH</div>
            <RouterLink v-for="(child, key) in navChildren" :key="key" :to="{name: child.name}" class="dashboardNavigationUrl">
                <component :is="child.meta.icon" v-if="child.meta.icon" size="20" stroke="2.5"/>
                <span>{{ child.meta.name }}</span>
            </RouterLink>
        </div>
        <div class="dashboardView">
            <RouterView/>
        </div>
        <div class="dashboardNotifications">
            This section is going to have dynamic notifications and other fireworks 🎉
        </div>
    </div>
</template>

<style>
.dashboardContainer {
    @apply min-h-full grid grid-cols-6 bg-slate-50 overflow-x-hidden;
}

.dashboardNavigation {
    @apply flex flex-col justify-start p-4;
}

.dashboardNavigationUrl {
    @apply flex items-center gap-2 px-4 py-2 rounded text-slate-400;
}

/*noinspection CssUnusedSymbol*/
.dashboardNavigationUrl.router-link-active {
    @apply font-semibold bg-slate-100;
}

.dashboardNavigationUrl.router-link-active > span {
    @apply text-slate-950;
}

.navigationLogo {
    @apply font-semibold text-center p-4;
}

.dashboardView {
    @apply col-span-4 bg-white my-4 p-4 rounded-xl border shadow-shallow;
}

.dashboardNotifications {
    @apply p-4;
}

/*
 * Following items are reusable.
 */
.dashboardHeader {
    @apply max-w-2xl grid gap-4;
}

.dashboardHeader > span {
    @apply text-slate-700 font-medium;
}


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

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
                <component v-if="child.meta.icon" :is="child.meta.icon" size="20" stroke="2.5"/>
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

<style scoped>
.dashboardContainer {
    @apply min-h-full min-w-full flex bg-slate-50;
}

.dashboardNavigation {
    @apply min-h-full max-w-64 w-full flex flex-col justify-start p-4;
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
    @apply min-h-full flex-1 bg-white my-4 p-4 rounded-xl border shadow-shallow;
}

.dashboardNotifications {
    @apply min-h-full max-w-80 w-full p-4;
}
</style>

<script setup>
import LanguageSelect from './LanguageSelect.vue'

/*
 | ---------------------------------------------------------------------------
 | Theme Toggling
 | ---------------------------------------------------------------------------
 | This function toggles the theme between light and dark. The current
 | theme is stored in localStorage to ensure the theme preference is
 | maintained across sessions.
 |
 | todo This feature is scheduled to be implemented. One day.
 */

// function toggleTheme() {
//     document.documentElement.classList.contains('dark')
//         ? document.documentElement.classList.remove('dark')
//         : document.documentElement.classList.add('dark')
//
//     localStorage.setItem('theme-dark', document.documentElement.classList.contains('dark').toString())
// }
//
// onMounted(() => {
//     if (localStorage.getItem('theme-dark') === 'true') {
//         document.documentElement.classList.add('dark')
//     }
// })
</script>

<template>
    <div class="dashboardPersonalization">
<!--        <div class="dashboardThemeButton" @click="toggleTheme">-->
<!--            <IconMoon size="24" stroke="2"/>-->
<!--        </div>-->
        <LanguageSelect/>
    </div>
</template>

<style scoped>
.dashboardPersonalization {
    @apply p-4 flex border-t border-t-slate-100 items-stretch sticky bottom-0 bg-white gap-4;
}

.dashboard--left-folded .dashboardPersonalization {
    @apply hidden;
}

.dashboardPersonalization select {
    @apply flex-1;
}
</style>
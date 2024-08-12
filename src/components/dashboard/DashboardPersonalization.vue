<script setup>
import LanguageSelect from './LanguageSelectDropdown.vue'
</script>

<template>
    <div class="personalization-container">
        <LanguageSelect/>
    </div>
</template>

<style scoped>
.personalization-container {
    @apply p-4 flex border-t border-t-slate-100 items-stretch sticky bottom-0 bg-white gap-4;
}

.dashboard--left-panel-folded .personalization-container {
    @apply hidden;
}

.personalization-container select {
    @apply flex-1;
}
</style>
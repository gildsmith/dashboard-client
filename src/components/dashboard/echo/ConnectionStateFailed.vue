<script setup>
import {IconMoodPuzzled} from '@tabler/icons-vue'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
    <div class="connectionState connectionState--failed">
        <div>
            <IconMoodPuzzled size="16" stroke="2"/>
        </div>
        <span class="connectionStateText">
            {{ t('Connection issue: Live Updates are currently unavailable.') }}
        </span>
    </div>
</template>

<style scoped>
.connectionState--failed {
    @apply bg-amber-200;
}
</style>
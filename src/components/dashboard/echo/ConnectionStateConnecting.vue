<script setup>
import {IconLoader} from '@tabler/icons-vue'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
</script>

<template>
    <div class="connectionState connectionState--connecting">
        <div class="animate-spin">
            <IconLoader size="16" stroke="2"/>
        </div>
        <span class="connectionStateText">
            {{ t('Connecting to Live Updates server...') }}
        </span>
    </div>
</template>

<style scoped>
.connectionState--connecting {
    @apply bg-emerald-200;
}
</style>
<script setup>
import {IconLoader, IconMoodPuzzled} from '@tabler/icons-vue'
import {useEchoConnectionState} from '../../composables/actioncenter/echoConnectionState.ts'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const {connectionState} = useEchoConnectionState()
</script>

<template>
    <div class="connectionState connectionState--connecting" v-if="['initialized', 'connecting'].includes(connectionState)">
        <div class="animate-spin">
            <IconLoader size="16" stroke="2"/>
        </div>
        <span class="connectionStateText">
            {{ t('Connecting to Live Updates server...') }}
        </span>
    </div>
    <div class="connectionState connectionState--failed" v-if="['unavailable', 'failed'].includes(connectionState)">
        <div>
            <IconMoodPuzzled size="16" stroke="2"/>
        </div>
        <span class="connectionStateText">
            {{ t('Connection issue: Live Updates are currently unavailable.') }}
        </span>
    </div>
</template>

<style scoped>
.connectionState {
    @apply flex items-center gap-2 px-4 py-2 text-slate-950;
}

.connectionState--connecting {
    @apply bg-emerald-200;
}

.connectionState--failed {
    @apply bg-amber-200;
}

.connectionStateText {
    @apply text-sm;
}
</style>
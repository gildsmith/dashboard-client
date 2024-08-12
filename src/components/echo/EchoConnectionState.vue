<script setup>
import {useEchoConnectionState} from '../../composables/echo/echoConnectionState.js'
import {IconLoader, IconMoodPuzzled} from '@tabler/icons-vue'
import {useI18n} from 'vue-i18n'

/*
 | ---------------------------------------------------------------------------
 | Connection State
 | ---------------------------------------------------------------------------
 | This simple component displays the state of the websocket connection. To
 | avoid clutter, it communicates only pending and failed attempts.
 */

const {t} = useI18n()
const {echoConnectionState} = useEchoConnectionState()
</script>

<template>
    <div v-if="['unavailable', 'failed'].includes(echoConnectionState)" class="state state--failed">
        <IconMoodPuzzled size="16" stroke="2"/>
        <span class="state-text">
            {{ t('Live Updates are currently unavailable.') }}
        </span>
    </div>
    <div v-if="['initialized', 'connecting'].includes(echoConnectionState)" class="state state--connecting">
        <IconLoader class="animate-spin" size="16" stroke="2"/>
        <span class="state-text">
            {{ t('Connecting to Live Updates server...') }}
        </span>
    </div>
</template>

<style scoped>
.state {
    @apply flex items-center gap-2 px-4 py-2 text-slate-950;
}

.state--connecting {
    @apply bg-emerald-200;
}

.state--failed {
    @apply bg-amber-200;
}

.dashboard--right-panel-folded .state {
    @apply py-4;
}

.state-text {
    @apply text-sm;
}

.dashboard--right-panel-folded .state {
    @apply justify-center;
}

.dashboard--right-panel-folded .state-text {
    @apply hidden;
}
</style>
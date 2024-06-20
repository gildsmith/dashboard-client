<!--suppress CssUnusedSymbol -->

<script setup>
import {useConnectionState} from '../../../composables/actioncenter/connectionState.ts'
import ConnectionStateConnecting from './ConnectionStateConnecting.vue'
import ConnectionStateFailed from './ConnectionStateFailed.vue'

/*
 | ---------------------------------------------------------------------------
 | Connection State
 | ---------------------------------------------------------------------------
 | This simple component displays the state of the websocket connection. To
 | avoid clutter, it communicates only pending and failed attempts.
 */

const {connectionState} = useConnectionState()
</script>

<template>
    <ConnectionStateConnecting v-if="['initialized', 'connecting'].includes(connectionState)"/>
    <ConnectionStateFailed v-if="['unavailable', 'failed'].includes(connectionState)"/>
</template>

<style>
/* Common styles for all states */
.connectionState {
    @apply flex items-center gap-2 px-4 py-2 text-slate-950;
}

.dashboard--right-folded .connectionState {
    @apply py-4;
}

.connectionStateText {
    @apply text-sm;
}

.dashboard--right-folded .connectionState {
    @apply justify-center;
}

.dashboard--right-folded .connectionStateText {
    @apply hidden;
}
</style>
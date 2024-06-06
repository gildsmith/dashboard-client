// noinspection JSUnresolvedReference
// TODO Inspection temporarily disabled. Likely needs better TypeScript configuration

import {onMounted, onUnmounted, ref} from 'vue'

/*
 | ---------------------------------------------------------------------------
 | Connection State Composable
 | ---------------------------------------------------------------------------
 | This composable binds onto Pusher connection state changes to track these
 | changes and update a reactive reference.
 */

export function useConnectionState() {
    const connectionState = ref('initialized')

    function stateChanged(state) {
        connectionState.value = state.current || 'unavailable'
    }

    onMounted(() => window.Echo.connector.pusher.connection.bind('state_change', stateChanged))

    onUnmounted(() => window.Echo.connector.pusher.connection.unbind('state_change', stateChanged))

    return {connectionState}
}
// noinspection JSUnresolvedReference
// TODO do better TS

import {onMounted, onUnmounted, ref} from 'vue'

export function useEchoConnectionState() {
    const connectionState = ref('initialized')

    function stateChanged(state) {
        connectionState.value = state.current || 'unavailable'
    }

    onMounted(() => window.Echo.connector.pusher.connection.bind('state_change', stateChanged))

    onUnmounted(() => window.Echo.connector.pusher.connection.unbind('state_change', stateChanged))

    return {connectionState}
}
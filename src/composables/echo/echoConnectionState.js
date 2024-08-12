import {onMounted, onUnmounted, ref} from 'vue'

/*
 | ---------------------------------------------------------------------------
 | Datasets Store
 | ---------------------------------------------------------------------------
 | This store is responsible for fetching basic datasets from Gildsmith API.
 */

export function useEchoConnectionState() {

    const echoConnectionState = ref('initialized')

    function stateChanged(state) {
        echoConnectionState.value = state.current || 'unavailable'
    }

    onMounted(() => window.Echo.connector.pusher.connection.bind('state_change', stateChanged))

    onUnmounted(() => window.Echo.connector.pusher.connection.unbind('state_change', stateChanged))

    return {echoConnectionState}
}
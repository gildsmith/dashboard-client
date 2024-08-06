import {onMounted, onUnmounted, ref} from 'vue'

/*
 | ---------------------------------------------------------------------------
 | Echo Connection State Composable
 | ---------------------------------------------------------------------------
 | This composable allows binding into Pusher connection callbacks and track
 | connection state reactively via echoConnectionState ref.
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
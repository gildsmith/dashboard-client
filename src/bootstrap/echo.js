// noinspection JSUnresolvedReference

import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

/*
 | ---------------------------------------------------------------------------
 | Default Echo Configuration
 | ---------------------------------------------------------------------------
 | This bootstrap file sets up Laravel Echo with default configurations
 | tailored for Laravel applications using the Reverb broadcaster. It
 | pre-configures settings that align with common Laravel real-time event
 | broadcasting requirements, ensuring seamless integration and optimized
 | performance for real-time events within the Laravel ecosystem.
 */

window.Pusher = Pusher

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
})

window.Echo.private('dashboard').listenToAll((event, data) => {
    console.log(event, data)
})

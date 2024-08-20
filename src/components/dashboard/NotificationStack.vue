<script setup>
import {useNotificationsStore} from '../../stores/notifications.js'

const ns = useNotificationsStore()
</script>

<template>
    <div class="notifications-stack">
        <div v-for="n in ns.notifications" :key="n.id" class="notification-wrapper" @click="ns.remove(n.id)">
            <div class="notification">
                {{ n.message }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.notifications-stack {
    @apply block;
}

.dashboard--right-panel-folded .notifications-stack {
    @apply hidden;
}

.notification {
    @apply border-b border-b-slate-100 p-4 cursor-pointer;
}

.notification-wrapper:hover .notification {
}
</style>
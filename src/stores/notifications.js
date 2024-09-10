import {defineStore} from 'pinia'

/*
 | ---------------------------------------------------------------------------
 | Notifications Store
 | ---------------------------------------------------------------------------
 | Manages notifications within the application, allowing messages to be
 | appended and removed. Each notification is assigned a unique ID using
 | the crypto API for easy tracking and deletion.
 */

export const useNotificationsStore = defineStore('notifications', {
    state: () => ({
        notifications: [],
    }),
    actions: {
        append(message) {
            this.notifications.push({
                id: self.crypto.randomUUID(),
                message: message,
            })
        },
        remove(id) {
            this.notifications = this.notifications.filter(n => n.id !== id)
        },
    },
})
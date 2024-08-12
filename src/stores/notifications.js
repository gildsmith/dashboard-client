import {defineStore} from 'pinia'

/*
 | ---------------------------------------------------------------------------
 | Notifications Store
 | ---------------------------------------------------------------------------
 | Manages the lifecycle of notifications within the application.
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
        }
    },
})
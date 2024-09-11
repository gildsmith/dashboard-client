import { defineStore } from 'pinia'

/*
 | ---------------------------------------------------------------------------
 | Notifications Store
 | ---------------------------------------------------------------------------
 | Manages notifications within the application, allowing messages to be
 | appended and removed. Each notification is assigned a unique ID using
 | the crypto API for easy tracking and deletion.
 */

interface Notification {
    id: string
    message: string
}

interface NotificationsState {
    notifications: Notification[]
}

export const useNotificationsStore = defineStore('notifications', {
    state: (): NotificationsState => ({
        notifications: [],
    }),
    actions: {
        append(message: string) {
            this.notifications.push({
                id: self.crypto.randomUUID(),
                message: message,
            })
        },
        remove(id: string) {
            this.notifications = this.notifications.filter((n: Notification) => n.id !== id)
        },
    },
})
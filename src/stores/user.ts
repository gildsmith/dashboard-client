import axios from 'axios'
import {defineStore} from 'pinia'

/*
 | ---------------------------------------------------------------------------
 | User Store
 | ---------------------------------------------------------------------------
 | Fetches and manages the authenticated user's details. Once fetched,
 | the user data is stored and can be invalidated when necessary.
 */

interface User {
    id: number | null

    [key: string]: any
}

interface UserState {
    fetched: boolean
    user: User
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        fetched: false,
        user: {id: null},
    }),
    actions: {
        async fetch() {
            if (this.fetched) return

            try {
                const response = await axios.get<User>('/api/authentication/user')
                this.user = response.data
                this.fetched = true
            } catch (error) {
            }
        },
        invalidate() {
            this.fetched = false
            this.user = {id: null}
        },
    },
    getters: {
        authenticated(state: UserState): boolean {
            return !!state.user.id
        },
    },
})
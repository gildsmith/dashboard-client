import './bootstrap/axios.js'
import './bootstrap/echo.js'
import i18n from './bootstrap/i18n.js'
import router from './bootstrap/router.js'
import appComponent from './bootstrap/app.js'
import {createPinia} from 'pinia'
import {createApp} from 'vue'
import {useNotificationsStore} from './stores/notifications.js'

window.axios.interceptors.request.use(config => {
    const lang = i18n.global.locale.value
    config.params = config.params || {}
    config.params.lang = lang
    return config
})

window.axios.interceptors.response.use(r=>r, error => {
    useNotificationsStore().append(error.message)
})

// noinspection JSCheckFunctionSignatures
const app = createApp(appComponent)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.mount('#app')
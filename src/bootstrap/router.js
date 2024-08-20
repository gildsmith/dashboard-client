// noinspection JSFileReferences, JSUnresolvedReference, JSCheckFunctionSignatures

import {createRouter, createWebHistory} from 'vue-router'

import {useUserStore} from '../stores/user.js'
import defaultRouter from './default/router.js'

/*
 | ---------------------------------------------------------------------------
 | Base Path Meta Tag
 | ---------------------------------------------------------------------------
 | Retrieves the base path from a custom meta tag. This meta tag is set by
 | a Laravel Blade template and serves as a communication channel between
 | the backend and frontend Vue application.
 |
 | The retrieved base path is then used to configure the Vue Router's history
 | mode, ensuring proper routing behavior within the application.
 */

const basePath = document.querySelector('meta[name="base-path"]')?.getAttribute('content')

/*
 | ---------------------------------------------------------------------------
 | Custom Router
 | ---------------------------------------------------------------------------
 | This block attempts to dynamically imports custom router definitions from
 | the custom override file, or loads the default one.
 */

const discoverCustomRouter = import.meta.glob('@/gildsmith/profile/router.js', {
    import: 'default',
    eager: true,
})

const customRouter = Object.values(discoverCustomRouter)

const router = createRouter({
    history: createWebHistory(basePath),
    routes: customRouter.length === 1
        ? customRouter[0]
        : defaultRouter,
})

/*
 | ---------------------------------------------------------------------------
 | Navigation Guards
 | ---------------------------------------------------------------------------
 | This block implements a navigation guard specifically designed to handle
 | authentication-based routing restrictions.
 */

router.beforeEach(async () => {
    const userStore = useUserStore()
    await userStore.fetch()

    if (!userStore.authenticated || userStore.user.role.name !== 'admin') {
        window.location.href = '/'
    }
})

export default router
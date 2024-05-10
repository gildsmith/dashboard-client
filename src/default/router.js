/*
 | ---------------------------------------------------------------------------
 | Default Router
 | ---------------------------------------------------------------------------
 | This module searches for custom routers in npm and composer packages,
 | as well as the default routing of this package, and merges them. Vendor
 | routes take precedence over default routes, allowing overrides.
 */

const customRoutesFile = import.meta.glob('@/gildsmith/dashboard/routes.js', {
    import: 'default',
    eager: true,
})

/*
 * TODO WARNING: Multiple patterns don't work.
 *
 * According to the Vite documentation, you should be able to pass multiple
 * file patterns as an array in the first argument. However, when I try to
 * do so, the npm files are not being discovered.
 *
 * It doesn't seem to be a matter of passing an array, as passing either
 * pattern alone in an array works fine. My best guess right now is that
 * these patterns are too broad to crawl in one go, which might lead to
 * further problems as the project grows.
 *
 * This should be looked into. One day.
 */
const composerRoutesFiles = import.meta.glob('@composer/*/*/resources/gildsmith/dashboard/routes.{ts,js}', {
    import: 'default',
    eager: true,
})

const npmRoutesFiles = import.meta.glob('@npm/*/*/src/gildsmith/dashboard/routes.{ts,js}', {
    import: 'default',
    eager: true,
})

const defaultRoutesFile = import.meta.glob('./routes.js', {
    import: 'default',
    eager: true,
})

export default [
    ...Object.values(defaultRoutesFile).flat(),
    ...Object.values(composerRoutesFiles).flat(),
    ...Object.values(npmRoutesFiles).flat(),
    ...Object.values(customRoutesFile).flat(),
]
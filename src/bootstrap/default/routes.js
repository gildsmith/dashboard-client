import {IconDashboard, IconWorld} from '@tabler/icons-vue'

import ChannelsIndex from '../../pages/ChannelsIndex.vue'
import ChannelsShow from '../../pages/ChannelsShow.vue'
import DashboardIndex from '../../pages/DashboardIndex.vue'

/*
 | ---------------------------------------------------------------------------
 | Default Routes Configuration
 | ---------------------------------------------------------------------------
 | This file defines the default routes with associated Vue components and
 | metadata. Each route can include an icon from '@tabler/icons-vue' and an
 | 'order' value that determines its position in the navigation, where lower
 | numbers appear first.
 */

export default [
    {
        name: 'dashboard.index',
        component: DashboardIndex,
        path: '/',
        meta: {
            name: 'Dashboard',
            description: 'Quick view of key metrics and recent activities for your operations',
            icon: IconDashboard,
            order: -9999,
        },
    },
    {
        name: 'dashboard.channels.index',
        component: ChannelsIndex,
        path: '/channels',
        meta: {
            name: 'Channels Management',
            description: 'Manage sales channels, settings, and third-party integrations',
            icon: IconWorld,
            order: 9999,
        },
    },
    {
        name: 'dashboard.channels.show',
        component: ChannelsShow,
        path: '/channels/:id',
        props: true,
    },
]
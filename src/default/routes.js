import ChannelsIndex from '../pages/ChannelIndex.vue'
import DashboardIndex from '../pages/DashboardIndex.vue'
import {IconDashboard, IconWorld} from '@tabler/icons-vue'
import ChannelsShow from '../pages/ChannelShow.vue'

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
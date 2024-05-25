import ChannelsPage from '../pages/ChannelsPage.vue'
import IndexPage from '../pages/IndexPage.vue'
import NotificationsPage from '../pages/NotificationsPage.vue'
import {IconBell, IconChartArcs, IconDashboard, IconWorld} from '@tabler/icons-vue'
import StatisticsPage from '../pages/StatisticsPage.vue'

export default [
    {
        name: 'dashboard.index',
        component: IndexPage,
        path: '/',
        meta: {
            name: 'Dashboard',
            description: 'Quick view of key metrics and recent activities for your operations',
            icon: IconDashboard,
            order: -9999,
        },
    },
    {
        name: 'dashboard.notifications.index',
        component: NotificationsPage,
        path: '/notifications',
        meta: {
            name: 'Notifications',
            description: 'Stay updated with important alerts and announcements',
            icon: IconBell,
            order: -9998,
        },
    },
    {
        name: 'dashboard.statistics.index',
        component: StatisticsPage,
        path: '/statistics',
        meta: {
            name: 'Statistics & Monitoring',
            description: 'Analyse data, monitor trends, and create reports',
            icon: IconChartArcs,
            order: 9998,
        },
    },
    {
        name: 'dashboard.channels.index',
        component: ChannelsPage,
        path: '/channels',
        meta: {
            name: 'Channels Management',
            description: 'Manage sales channels, settings, and third-party integrations',
            icon: IconWorld,
            order: 9999,
        },
    },
]
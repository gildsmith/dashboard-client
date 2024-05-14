import ChannelsPage from '../pages/ChannelsPage.vue'
import {IconCoinEuro} from '@tabler/icons-vue'

export default [
    {
        name: 'dashboard.channels.index',
        component: ChannelsPage,
        path: '/channels',
        meta: {
            name: 'Channels',
            icon: IconCoinEuro,
        }
    }
]
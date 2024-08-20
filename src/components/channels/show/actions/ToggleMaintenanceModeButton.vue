<script setup>
import {IconFlag} from '@tabler/icons-vue'
import {useI18n} from 'vue-i18n'

import {useUpdateChannel} from '../../../../composables/channels/updateChannel.js'
import {useChannelsStore} from '../../../../stores/channels.js'

/*
 | ---------------------------------------------------------------------------
 | Toggle Maintenace Mode Button
 | ---------------------------------------------------------------------------
 | This component provides a quick way for users to toggle the maintenance
 | mode on or off for a channel. When maintenance mode is enabled, the channel
 | becomes temporarily unavailable to the public, restricting access to
 | authenticated admins only. However, essential requests, such as incoming
 | notifications from payment gateways, are still allowed to ensure proper
 | functionality and processing of critical transactions.
 */

defineProps(['channel'])
const {t} = useI18n()
const channelsStore = useChannelsStore()
const {enableMaintenance, disableMaintenance} = useUpdateChannel()

async function clickEnableMaintenance(channelId) {
    let channel = await enableMaintenance(channelId)
    await channelsStore.upsert(channel.data)
}

async function clickDisableMaintenance(channelId) {
    let channel = await disableMaintenance(channelId)
    await channelsStore.upsert(channel.data)
}
</script>

<template>
    <div v-if="channel.maintenance" class="button" @click="clickDisableMaintenance(channel.id)">
        <IconFlag size="16" stroke="2"/>
        <span>{{ t('Disable maintenance') }}</span>
    </div>
    <div v-else class="button" @click="clickEnableMaintenance(channel.id)">
        <IconFlag size="16" stroke="2"/>
        <span>{{ t('Enable maintenance') }}</span>
    </div>
</template>
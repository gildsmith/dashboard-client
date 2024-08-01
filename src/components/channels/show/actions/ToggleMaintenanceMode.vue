<script setup>
import {IconFlag} from '@tabler/icons-vue'
import {useChannelsStore} from '../../../../stores/channels.js'
import {useUpdateChannel} from '../../../../composables/channels/updateChannel.ts'
import {useI18n} from 'vue-i18n'

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
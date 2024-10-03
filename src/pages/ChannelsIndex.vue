<script setup>
import {onMounted, onUnmounted} from 'vue'
import {useI18n} from 'vue-i18n'

import DataTable from '../components/data/DataTable.vue'
import Badge from '../components/ui/Badge.vue'
import CreateChannelForm from '../sections/channels/index/CreateChannelForm.vue'
import {useChannelsStore} from '../stores/channels.ts'

const {t} = useI18n()
const echoChannel = window.Echo.private('gildsmith.dashboard.channels')
const channelsStore = useChannelsStore()
channelsStore.fetch()

onMounted(() => {
    echoChannel.listen('.ChannelCreated', channel => {
        channelsStore.upsert(channel)
    })

    echoChannel.listen('.ChannelUpdated', channel => {
        channelsStore.upsert(channel)
    })

    echoChannel.listen('.ChannelDeleted', channel => {
        channelsStore.delete(channel.id)
    })
})

onUnmounted(() => {
    echoChannel
        .stopListening('.ChannelCreated')
        .stopListening('.ChannelUpdated')
        .stopListening('.ChannelDeleted')
})
</script>

<template>
    <div class="channels-index">
        <div class="pageHeader">
            <h1 class="pageTitle header">{{ t('Channels Management') }}</h1>
            <button>Add channel</button>
        </div>
        <div class="channels-grid">
            <CreateChannelForm/>
            <DataTable :data="channelsStore.channels"
                       :headers="['name', 'maintenance']"
                       :selectable="true" :sortable="true" :pagination="5"
                       title="Channels List">

                <template #name="{ row }">
                    <div class="channel-identity">
                        <div class="channel-name">{{ row.name }}</div>
                        <div class="channel-id">Channel ID: {{ row.id }}</div>
                    </div>
                </template>

                <template #maintenance="{ row }">
                    <Badge :text="!row.maintenance ? 'enabled' : 'disabled'"/>
                </template>

            </DataTable>
        </div>
    </div>
</template>

<style scoped>
.channels-index {
    @apply grid gap-8;
}

.channels-grid {
    @apply grid gap-8;
}


.channel-name {
    @apply font-semibold text-lg;
}

.channel-id {
    @apply text-xs text-flint-600;
}
</style>
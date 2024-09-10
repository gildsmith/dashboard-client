<script setup>
import {onMounted, onUnmounted} from 'vue'
import {useI18n} from 'vue-i18n'

import ChannelCard from '../sections/channels/index/ChannelCard.vue'
import CreateChannelForm from '../sections/channels/index/CreateChannelForm.vue'
import {useChannelsStore} from '../stores/channels.js'

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
        </div>
        <div class="channels-grid">
            <CreateChannelForm/>
            <ChannelCard v-for="channel in channelsStore.channels" :key="channel.id" :channel="channel"/>
        </div>
    </div>
</template>

<style scoped>
.channels-index {
    @apply grid gap-8;
}

.channels-grid {
    @apply grid gap-8 grid-cols-3;
}
</style>
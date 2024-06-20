<script setup>
import ChannelCard from '../components/channels/index/ChannelCard.vue'
import CreateChannelForm from '../components/channels/index/CreateChannelForm.vue'
import {useI18n} from 'vue-i18n'
import {onMounted, onUnmounted} from 'vue'
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
    <div class="pageHeader">
        <h1 class="pageTitle header">{{ t('Channels Management') }}</h1>
        <span class="description">
            {{ t('Here, you can add, modify, and manage the various sales channels through which your products are sold.') }}
        </span>
    </div>
    <div class="createChannelContainer">
        <CreateChannelForm/>
    </div>
    <ChannelCard v-for="channel in channelsStore.channels" :key="channel.id" :channel="channel"/>
</template>

<style scoped>
.createChannelContainer {
    @apply col-span-2 grid grid-cols-2 gap-8;
}
</style>
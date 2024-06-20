<script setup>
import {useChannelsStore} from '../stores/channels.js'
import {computed, onMounted, onUnmounted} from 'vue'
import ChannelEssentialsSection from '../components/channels/show/ChannelEssentialsSection.vue'
import ChannelDefaultsSection from '../components/channels/show/ChannelDefaultsSection.vue'
import ChannelLocalizationSection from '../components/channels/show/ChannelLocalizationSection.vue'
import StatusHandler from '../components/dashboard/status/StatusHandler.vue'

// TODO create an event listener on when the channel is updated or deleted.

const props = defineProps(['id'])
const echoChannel = window.Echo.private('gildsmith.dashboard.channels')
const channelsStore = useChannelsStore()
channelsStore.fetch()

const channel = computed(() => {
    return channelsStore.find(props.id)
})

function refresh() {
    channelsStore.fetch()
}

onMounted(() => {
    echoChannel.listen('.ChannelUpdated', (broadcastedChannel) => {
        channelsStore.upsert(broadcastedChannel)
    })

    echoChannel.listen('.ChannelDeleted', (broadcastedChannel) => {
        channelsStore.delete(broadcastedChannel.id)
    })

    echoChannel.listen('.ChannelLanguageCreated', broadcastedLanguage => {
        channelsStore.upsertRelation(props.id, 'languages', broadcastedLanguage)
    })

    echoChannel.listen('.ChannelLanguageDeleted', broadcastedLanguage => {
        channelsStore.deleteRelation(props.id, 'languages', broadcastedLanguage)
    })

    echoChannel.listen('.ChannelCurrencyCreated', broadcastedCurrency => {
        channelsStore.upsertRelation(props.id, 'currencies', broadcastedCurrency)
    })

    echoChannel.listen('.ChannelCurrencyDeleted', broadcastedCurrency => {
        channelsStore.deleteRelation(props.id, 'currencies', broadcastedCurrency)
    })
})

onUnmounted(() => {
    echoChannel
        .stopListening('.ChannelUpdated')
        .stopListening('.ChannelDeleted')
        .stopListening('.ChannelLanguageCreated')
        .stopListening('.ChannelLanguageDeleted')
        .stopListening('.ChannelCurrencyCreated')
        .stopListening('.ChannelCurrencyDeleted')
})
</script>

<template>
    <template v-if="channel">
        <ChannelEssentialsSection :channel="channel"/>
        <ChannelDefaultsSection :channel="channel"/>
        <ChannelLocalizationSection :channel="channel"/>
    </template>
    <StatusHandler v-else :error="channelsStore.error" :status="channelsStore.status" @refresh="refresh"/>
</template>

<style scoped>
</style>
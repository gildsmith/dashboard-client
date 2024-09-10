<script setup>
import {computed, onMounted, onUnmounted} from 'vue'

import StatusHandler from '../components/.abandoned/LoadingStatus.vue'
import ChannelActionsSection from '../sections/channels/show/ChannelActionsSection.vue'
import ChannelCurrenciesSection from '../sections/channels/show/ChannelCurrenciesSection.vue'
import ChannelDefaultsSection from '../sections/channels/show/ChannelDefaultsSection.vue'
import ChannelEssentialsSection from '../sections/channels/show/ChannelEssentialsSection.vue'
import ChannelLanguagesSections from '../sections/channels/show/ChannelLanguagesSections.vue'
import {useChannelsStore} from '../stores/channels.js'

const props = defineProps(['id'])
const echoChannel = window.Echo.private('gildsmith.dashboard.channels')
const channelsStore = useChannelsStore()
channelsStore.fetch()

const channel = computed(() => channelsStore.find(props.id))

function refresh() {
    channelsStore.fetch()
}

onMounted(() => {
    echoChannel.listen('.ChannelUpdated', broadcastedChannel => {
        channelsStore.upsert(broadcastedChannel)
    })

    echoChannel.listen('.ChannelDeleted', broadcastedChannel => {
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
            <div class="channel-wrapper">
                <ChannelEssentialsSection :channel="channel"/>
                <ChannelLanguagesSections :channel="channel"/>
                <ChannelCurrenciesSection :channel="channel"/>
                <ChannelDefaultsSection :channel="channel"/>
                <ChannelActionsSection :channel="channel"/>
            </div>
    </template>
    <template v-else>
        <!-- TODO -->
        There's nothing in here.
        If this screen just appearead out of the blue, chances are that the channel was removed.
    </template>
    <StatusHandler v-if="channelsStore.error" :error="channelsStore.error" :status="channelsStore.status" @refresh="refresh"/>
</template>

<style scoped>
.channel-wrapper {
    @apply grid gap-12 p-4;
}
</style>
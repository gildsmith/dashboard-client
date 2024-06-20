<script setup>
import {IconFlag} from '@tabler/icons-vue'
import DeleteChannelButton from './DeleteChannelButton.vue'
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router'
import {useUpdateChannel} from '../../../composables/channels/updateChannel.ts'
import {useChannelsStore} from '../../../stores/channels.js'

defineProps(['channel'])

const {t} = useI18n()
const router = useRouter()
const channelsStore = useChannelsStore()
const {enableMaintenance, disableMaintenance} = useUpdateChannel()

function redirectOnDelete() {
    router.push({name: 'dashboard.channels.index'})
}

async function clickEnableMaintenance(channelId) {
    let channel = await enableMaintenance(channelId)
    await channelsStore.upsert(channel)
}

async function clickDisableMaintenance(channelId) {
    let channel = await disableMaintenance(channelId)
    await channelsStore.upsert(channel)
}
</script>

<template>
    <div class="channelEssentials">
        <div class="channelNameContainer">
            <div class="channelId">#{{ channel.id }}</div>
            <h1 class="header">{{ t(channel.name) }}</h1>
        </div>
        <!-- todo programme contenteditable description and name -->
        <div class="description">{{ t(channel.description || 'Click to add description...') }}</div>
        <div class="channelActions">
            <div v-if="channel.maintenance" class="button" @click="clickDisableMaintenance(channel.id)">
                <IconFlag size="16" stroke="2"/>
                <span>Disable Maintenace</span>
            </div>
            <div v-else class="button" @click="clickEnableMaintenance(channel.id)">
                <IconFlag size="16" stroke="2"/>
                <span>Enable Maintenace</span>
            </div>
            <DeleteChannelButton :channel="channel" @deleted="redirectOnDelete"/>
        </div>
    </div>
</template>

<style scoped>
.channelNameContainer {
    @apply flex items-center gap-2;
}

.channelId {
    @apply text-xs font-semibold text-slate-500;
}

.channelEssentials {
    @apply grid gap-4;
}

.channelActions {
    @apply flex gap-4 flex-wrap;
}
</style>
<script setup>
import ChannelCard from '../components/channels/ChannelCard.vue'
import CreateChannelForm from '../components/channels/CreateChannelForm.vue'
import {useIndexChannels} from '../composables/channels/indexChannels.ts'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const {channels} = useIndexChannels()
</script>

<template>
    <div class="pageHeader">
        <h1 class="pageTitle">{{ t('Channels Management') }}</h1>
        <span class="pageDescription">
            {{ t('Here, you can add, modify, and manage the various sales channels through which your products are sold.') }}
        </span>
    </div>
    <div class="channelsList">
        <ChannelCard v-for="channel in channels" :key="channel.id" :channel="channel"/>
    </div>
    <CreateChannelForm/>
</template>

<style scoped>
.channelsList {
    @apply col-span-2 grid gap-8;
}
</style>
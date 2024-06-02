<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import ChannelCard from '../components/Channels/ChannelCard.vue'
import {useI18n} from 'vue-i18n'
import CreateChannelForm from '../components/Channels/CreateChannelForm.vue'

const {t} = useI18n()
const channels = ref([])

onMounted(() => {
    axios.get('/api/channels').then(response => {
        channels.value = response.data
    })

    function updateChannel(e) {
        channels.value = channels.value.map(channel =>
            channel.id === e.channel.id ? e.channel : channel,
        )
    }

    window.Echo.private('dashboard')
        .listen('.Gildsmith\\HubApi\\Events\\CurrencyAttached', updateChannel)
        .listen('.Gildsmith\\HubApi\\Events\\CurrencyDetached', updateChannel)
        .listen('.Gildsmith\\HubApi\\Events\\LanguageAttached', updateChannel)
        .listen('.Gildsmith\\HubApi\\Events\\LanguageDetached', updateChannel)
})

onUnmounted(() => {
    window.Echo.private('dashboard')
        .stopListening('.Gildsmith\\HubApi\\Events\\CurrencyAttached')
        .stopListening('.Gildsmith\\HubApi\\Events\\CurrencyDetached')
        .stopListening('.Gildsmith\\HubApi\\Events\\LanguageAttached')
        .stopListening('.Gildsmith\\HubApi\\Events\\LanguageDetached')
})
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
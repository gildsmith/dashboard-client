<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import ChannelsTable from '../components/ChannelsTable.vue'

const channels = ref([])

onMounted(() => {
    axios.get('/api/channels').then(response => {
        channels.value = response.data
    })

    let updateChannel = e => {
        channels.value = channels.value.map(channel =>
            channel.id === e.channel.id ? e.channel : channel,
        )
    }
    window.Echo.private('dashboard').listen('.Gildsmith\\HubApi\\Events\\CurrencyAttached', updateChannel)
    window.Echo.private('dashboard').listen('.Gildsmith\\HubApi\\Events\\CurrencyDetached', updateChannel)
    window.Echo.private('dashboard').listen('.Gildsmith\\HubApi\\Events\\LanguageAttached', updateChannel)
    window.Echo.private('dashboard').listen('.Gildsmith\\HubApi\\Events\\LanguageDetached', updateChannel)
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
    <div class="channelsContainer">
        <div class="header">
            <h1>Channels Management</h1>
            <span>
                Here, you can add, modify, and manage the various sales
                channels through which your products are sold.
            </span>
        </div>
        <ChannelsTable :channels="channels"/>
    </div>
</template>

<style scoped>
.header {
    @apply col-span-2;
}
</style>
<script setup>
import {onMounted, ref} from 'vue'
import ChannelsMatrix from '../components/ChannelsMatrix.vue'

const channels = ref({})

onMounted(() => {
    axios.get('/api/channels').then(response => {
        channels.value = response.data
    })
})
</script>

<template>
    <div class="channelsContainer">
        <div class="dashboardHeader">
            <h1>Channels Management</h1>
            <span>
                Here, you can add, modify, and manage the various sales channels through which your
                products are sold. Each channel represents a unique market or platform, such as your
                direct web store, third-party marketplaces like Amazon, or regional retail outlets.
            </span>
        </div>
        <div class="channel" v-for="channel in channels" :key="channel.id">
            <h2 class="channelName">{{ channel.name }}</h2>
            <ChannelsMatrix :channel="channel"/>
        </div>
    </div>
</template>

<style scoped>
.channelsContainer {
    @apply max-w-full overflow-hidden flex flex-col gap-8;
}

.channel {
    @apply flex flex-col gap-4;
}
</style>
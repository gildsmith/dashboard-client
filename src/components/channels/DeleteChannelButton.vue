<script setup>
import {IconTrash} from '@tabler/icons-vue'
import {useDeleteChannel} from '../../composables/channels/deleteChannel.ts'
import {ref} from 'vue'

/*
 | ---------------------------------------------------------------------------
 | Delete Channel Button
 | ---------------------------------------------------------------------------
 | This component handles the deletion process for a channel. Initially, it
 | shows a prompt to delete the channel. Upon clicking, a countdown starts.
 | If the button is clicked again within the countdown, only then the request
 | is made and the channel is deleted.
 */

defineProps(['channel'])

const timeout = ref(0)
const {submit} = useDeleteChannel()
let intervalId = null

function startCounting() {
    timeout.value = 10
    intervalId = setInterval(() => {
        timeout.value -= 1
        if (timeout.value <= 0) {
            clearInterval(intervalId)
            intervalId = 0
        }
    }, 1000)
}
</script>

<template>
    <div v-if="!timeout" class="button deleteChannelPrompt" @click="startCounting">
        <div>
            <IconTrash size="16" stroke="1.5"/>
        </div>
        <span v-if="channel.id === 1">Prune channel</span>
        <span v-else>Delete channel and all related data</span>
    </div>
    <div v-if="timeout" class="button deleteChannel" @click="submit(channel.id)">
        <div>
            <IconTrash size="16" stroke="1.5"/>
        </div>
        <span>Click again to confirm deletion ({{ timeout }})</span>
    </div>
</template>

<style scoped>
.deleteChannelPrompt {
    @apply bg-slate-50 text-red-600;
}

.deleteChannel {
    @apply bg-red-600 text-white;
}
</style>
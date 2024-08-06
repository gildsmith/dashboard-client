<script setup>
import {IconTrash} from '@tabler/icons-vue'
import {useDeleteChannel} from '../../../../composables/channels/deleteChannel.js'
import {useI18n} from 'vue-i18n'
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

const {t} = useI18n()
const {submit} = useDeleteChannel()
const props = defineProps(['channel'])
const emits = defineEmits(['channelDeleted'])
const timeout = ref(0)
let timeoutInterval = null

function startCounting() {
    timeout.value = 10
    timeoutInterval = setInterval(() => {
        timeout.value -= 1
        if (timeout.value <= 0) {
            clearInterval(timeoutInterval)
            timeoutInterval = 0
        }
    }, 1000)
}

async function deleteChannel() {
    // todo seems like emit is not fired?
    await submit(props.channel.id)
    emits('channelDeleted')
}
</script>

<template>
    <div v-if="!timeout" class="button delete-prompt" @click="startCounting">
        <IconTrash size="16" stroke="1.5"/>
        <span>{{ t('Delete channel and all its data') }}</span>
    </div>
    <div v-if="timeout" class="button delete-button" @click="deleteChannel">
        <IconTrash size="16" stroke="1.5"/>
        <span>{{ t('Click again to confirm deletion') }} ({{ timeout }})</span>
    </div>
</template>

<style scoped>
.delete-prompt {
    @apply border-red-600 text-red-600;
}

.delete-button {
    @apply bg-red-600 text-white;
}
</style>
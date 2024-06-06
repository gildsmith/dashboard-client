<script setup>
import {useI18n} from 'vue-i18n'
import {useCreateChannel} from '../../composables/channels/createChannel.ts'
import {useChannelsStore} from '../../stores/channels.js'

/*
 | ---------------------------------------------------------------------------
 | Create Channel Form Component
 | ---------------------------------------------------------------------------
 | This component provides a form for creating a new channel. Upon form
 | submission, it creates a new channel and updates the store.
 */

const {t} = useI18n()
const {channelName, submitForm} = useCreateChannel()
const channelsStore = useChannelsStore()

async function submit() {
    const channel = await submitForm()
    await channelsStore.upsert(channel)
}
</script>

<template>
    <div class="createChannelFormContainer">
        <h2 class="createChannelName">{{ t('Create a new channel') }}</h2>
        <div class="createChannelDescription">
            {{ t('Channel names do not have to be unique, but it is strongly recommended to help keep things organised.') }}
        </div>
        <form class="createChannelForm" @submit.prevent="submit">
            <input v-model="channelName" :placeholder="t('Channel name')" class="input" type="text">
            <button class="button">{{ t('Create channel') }}</button>
        </form>
    </div>
</template>

<style scoped>
.createChannelFormContainer {
    @apply border p-4 bg-white grid gap-2;
    @apply dark:border-slate-700 dark:bg-slate-700;
}

.createChannelForm {
    @apply flex gap-4;
}

.createChannelDescription {
    @apply max-w-96 text-sm;
}

.createChannelForm .input {
    @apply flex-1;
}
</style>
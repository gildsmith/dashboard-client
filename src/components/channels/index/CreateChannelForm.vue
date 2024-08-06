<script setup>
import {useI18n} from 'vue-i18n'
import {useCreateChannel} from '../../../composables/channels/createChannel.js'
import {useChannelsStore} from '../../../stores/channels.js'
import {ref} from 'vue'

/*
 | ---------------------------------------------------------------------------
 | Create Channel Form Component
 | ---------------------------------------------------------------------------
 | This component provides a form for creating a new channel. Upon form
 | submission, it creates a new channel and updates the store.
 */

const {t} = useI18n()
const input = ref('')
const {submit} = useCreateChannel()
const channelsStore = useChannelsStore()

async function submitForm() {
    const channel = await submit(input.value)
    await channelsStore.upsert(channel.data)
}
</script>

<template>
    <div class="form-container">
        <h2 class="subheader">{{ t('Create a new channel') }}</h2>
        <div class="footnote">
            {{ t('Channel names do not have to be unique, but it is strongly recommended to help keep things organised.') }}
        </div>
        <form class="form-wrapper" @submit.prevent="submitForm">
            <input v-model="input" :placeholder="t('Channel name')" class="input" type="text" required>
            <button class="button">{{ t('Create channel') }}</button>
        </form>
    </div>
</template>

<style scoped>
.form-container {
    @apply border p-4 bg-white grid gap-2;
}

.form-wrapper {
    @apply flex gap-4;
}

.form-wrapper .input {
    @apply flex-1;
}
</style>
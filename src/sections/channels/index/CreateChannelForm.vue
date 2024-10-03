<script setup>
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'

import {useCreateChannel} from '../../../composables/channels/createChannel.js'
import {useChannelsStore} from '../../../stores/channels.ts'

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
        <h2 class="subheader">{{ t('Create new channel') }}</h2>
        <div class="form-description footnote">
            {{ t('Channel names don\'t have to be unique, but it helps keep things organised.') }}
        </div>
        <form class="form-wrapper" @submit.prevent="submitForm">
            <input v-model="input" :placeholder="t('Channel name')" class="input" required type="text">
            <button class="button">{{ t('Create channel') }}</button>
        </form>
    </div>
</template>

<style scoped>
.form-container {
    @apply p-4 bg-white flex flex-col gap-2 border rounded;
}

.form-description {
    @apply max-w-96;
}

.form-wrapper {
    @apply flex gap-4 mt-auto;
}

.form-wrapper .input {
    @apply flex-1;
}
</style>
<script setup>
import DeleteChannelButton from './actions/DeleteChannelButton.vue'
import ToggleMaintenanceMode from './actions/ToggleMaintenanceModeButton.vue'
import {useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'

defineProps(['channel'])

const router = useRouter()
const {t} = useI18n()

function redirectOnDelete() {
    router.push({name: 'dashboard.channels.index'})
}
</script>

<template>
    <div class="section">
        <h2 class="subheader">{{ t('Actions') }}</h2>
        <div class="list">
            <div class="list-item">
                <div class="action-text-wrapper">
                    <div class="action-name">{{ t('Maintenance Mode') }}</div>
                    <div class="action-description footnote">
                        {{ t('When enabled, this mode blocks all requests except crucial ones, such as payment notifications from payment gateways.') }}
                    </div>
                </div>
                <ToggleMaintenanceMode :channel="channel"/>
            </div>
            <div class="list-item">
                <div class="action-text-wrapper">
                    <div class="action-name">{{ t('Delete Channel') }}</div>
                    <div class="action-description footnote" v-if="channel.id === 1">
                        {{ t('This channel is default and cannot be deleted. If attempted, it will be immediately recreated with ID 1.') }}
                    </div>
                    <div class="action-description footnote" v-else>
                        {{ t('Deleting this channel is a permanent action that will remove all associated data forever! And that\'s a very long time.') }}
                    </div>
                </div>
                <DeleteChannelButton :channel="channel" @channelDeleted="redirectOnDelete"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.action-text-wrapper {
    @apply flex-1 grid gap-1;
}

.action-name {
    @apply font-medium;
}

.action-description {
    @apply max-w-lg;
}
</style>
<script setup>
import DeleteChannelButton from './actions/DeleteChannelButton.vue'
import ToggleMaintenanceMode from './actions/ToggleMaintenanceMode.vue'
import {useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'

defineProps(['channel'])

const router = useRouter()
const {t} = useI18n()

function redirectOnDelete() {
    // todo isn't triggered all of a sudden.
    router.push({name: 'dashboard.channels.index'})
}
</script>

<template>
    <div class="section">
        <h2 class="subheader">{{ t('Actions') }}</h2>
        <div class="list">
            <div class="listElement">
                <div class="actionInfo">
                    <div class="actionName">{{ t('Maintenance Mode') }}</div>
                    <div class="actionDescription description">Ten kanał jest domyślny i nie może zostać usunięty. W przypadku próby usunięcia, zostanie
                        natychmiastowo utworzony ponownie z ID 1.
                    </div>
                </div>
                <ToggleMaintenanceMode :channel="channel"/>
            </div>
            <div class="listElement">
                <div class="actionInfo">
                    <div class="actionName">{{ t('Delete Channel') }}</div>
                    <div class="actionDescription description">Ten kanał jest domyślny i nie może zostać usunięty. W przypadku próby usunięcia, zostanie
                        natychmiastowo utworzony ponownie z ID 1.
                    </div>
                </div>
                <DeleteChannelButton :channel="channel" @channelDeleted="redirectOnDelete()"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.actionInfo {
    @apply flex-1 grid gap-1;
}

.actionName {
    @apply font-medium;
}

.actionDescription {
    @apply max-w-lg;
}
</style>
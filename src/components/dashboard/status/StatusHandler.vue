<script setup>

import StatusHandlerPulse from './StatusHandlerPulse.vue'
import StatusHandleFailure from './StatusHandleFailure.vue'

defineProps(['status', 'error'])
const emits = defineEmits(['refresh'])
</script>

<template>
    <StatusHandlerPulse v-if="['idle', 'submitting'].includes(status)"/>
    <StatusHandleFailure v-if="['error'].includes(status)" :error="error" @refresh="emits('refresh')"/>
</template>
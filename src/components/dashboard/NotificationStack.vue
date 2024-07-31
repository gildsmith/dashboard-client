<script setup>
import {useNotificationsStore} from '../../stores/notifications.js'

const ns = useNotificationsStore()
</script>

<template>
    <div v-for="n in ns.notifications" :key="n.id" @click="ns.remove(n.id)">
        {{ n.message }}
    </div>
</template>

<style scoped>

</style>
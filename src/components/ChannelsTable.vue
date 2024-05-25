<script setup>
import {IconLock} from '@tabler/icons-vue'

defineProps(['channels'])
</script>

<template>
    <table class="channelsTable">
        <tr class="tableHeader">
            <th>Channel name</th>
            <th>Default Currency</th>
            <th>Default Language</th>
            <th>Actions</th>
        </tr>
        <tr v-for="channel in channels" :key="channel.id">
            <td>
                <div class="channelName">
                    <IconLock size="16" stroke="2"/>
                    <span>{{ channel.name }}</span>
                </div>
            </td>
            <td>USD</td>
            <td>English</td>
            <td>Todo</td>
        </tr>
        <tr>
            <td colspan="4">
                <input type="text" class="input" placeholder="Create new channel">
            </td>
        </tr>
    </table>
</template>

<style scoped>
.channelsTable {
    @apply text-left;
}

.tableHeader:not(:last-of-type) {
    @apply border-b;
}

th, td {
    @apply p-2;
}

.channelName {
    @apply flex items-center gap-1;
}
</style>
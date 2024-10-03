<script setup>
import {IconArrowDown, IconArrowsSort, IconArrowUp} from '@tabler/icons-vue'

const props = defineProps({
    type: {type: String, default: ''},
})
</script>

<template>
    <IconArrowUp v-if="type === 'ascending'" size="16" stroke="2"/>
    <IconArrowDown v-if="type === 'descending'" size="16" stroke="2"/>
    <IconArrowsSort v-if="type === 'candidate'" size="16" stroke="2"/>
</template>

<style scoped>

</style>
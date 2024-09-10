<script setup>
import {computed} from 'vue'

const props = defineProps(['id', 'name'])

const colors = [
    '#f8dcdc', '#f3e3cb', '#dceaf3', '#d9f3de', '#f3d9f4',
    '#ebf3d9', '#d9f3eb', '#d9e8f3', '#f8d9e5', '#f4f0d9',
    '#d9f3f0', '#f3d9e8', '#f0f3d9', '#d9dbf3', '#d9f3db',
    '#f8d9f3', '#f3f3d9', '#d9f3ec', '#d9f3f5', '#eed9f3',
]

const emojis = [
    '😊', '🍕', '🌵', '🚗', '🎈',
    '😎', '🍉', '🌻', '🚀', '🎮',
    '🤩', '🍩', '🌱', '🛴', '🎧',
    '😁', '🍓', '🌸', '🚤', '🎸',
]

const channelColor = computed(() => {
    return colors[props.id % colors.length]
})

const nameExcerpt = computed(() => {
    return emojis[props.id % emojis.length]
    // return Array.from(props.name)[0].toUpperCase()
})
</script>

<template>
    <div :style="{ backgroundColor: channelColor }" class="channel-avatar">
        <span class="channel-name-excerpt">{{ nameExcerpt }}</span>
    </div>
</template>

<style scoped>
.channel-avatar {
    @apply bg-flint-950 h-9 w-9 rounded-full flex items-center justify-center;
}

.channel-name-excerpt {
    @apply text-white font-black select-none;
}
</style>
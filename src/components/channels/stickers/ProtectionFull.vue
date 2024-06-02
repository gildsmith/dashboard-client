<script setup>
import {IconLockX} from '@tabler/icons-vue'
</script>

<template>
    <div class="channelSticker">
        <IconLockX size="20" stroke="2"/>
        <div class="channelStickerHeader">
            <h2 class="channelStickerName">Delete Protected</h2>
            <span class="channelStickerDescription">
                This channel cannot be deleted, as it is required for your store to work.
            </span>
        </div>
    </div>
</template>
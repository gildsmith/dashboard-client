<script setup>
import {useNotificationsStore} from '../../stores/notifications.js'
import {IconBell} from '@tabler/icons-vue'

const ns = useNotificationsStore()
const getRandomNotification = () => [
    'The quick brown fox jumps over the lazy dog.',
    'In the end, we only regret the chances we didn\'t take.',
    'All that glitters is not gold, often have you heard that told.',
    'A journey of a thousand miles begins with a single step.',
    'The best way to predict the future is to invent it. Let\'s begin.',
    'To be, or not to be, that is the question. Whether \'tis nobler in the mind to suffer the slings and arrows.',
    'Life is what happens when you\'re busy making other plans. Let\'s make the most of it.',
    'Panna cotta is made with cream, milk, sugar, and gelatin, then molded. Deliciously simple.',
    'Hope is the thing with feathers that perches in the soul and sings the tune without the words.',
    'The greatest glory in living lies not in never falling, but in rising every time we fall. Keep trying and learning.',
    'You miss 100% of the shots you don\'t take, so keep aiming and keep shooting, whether it\'s on the court or in life.'
][Math.floor(Math.random() * 11)]

</script>

<template>
    <div @click="ns.append(getRandomNotification())">+ debug</div>
    <div class="notifications-stack">
        <div v-for="n in ns.notifications" :key="n.id" class="notification-wrapper" @click="ns.remove(n.id)">
            <div class="notification">
                {{ n.message }}
            </div>
        </div>
    </div>
    <div class="notifications-bell">
        <IconBell size="24" stroke="2"/>
    </div>
</template>

<style scoped>
.notifications-stack {
    @apply block;
}
.dashboard--right-folded .notifications-stack {
    @apply hidden;
}

.notifications-bell {
    @apply hidden;
}

.notification-wrapper {
}

.notification {
    @apply border-b border-b-slate-100 p-4;
}

.notification-wrapper:hover .notification {
}
</style>
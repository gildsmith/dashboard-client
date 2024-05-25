<script setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
defineProps(['language'])
</script>

<template>
    <td class="language">
        {{ t('language.' + language.code.toLowerCase()) }}
    </td>
</template>

<style scoped>

</style>
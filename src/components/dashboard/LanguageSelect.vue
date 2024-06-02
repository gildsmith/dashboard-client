<script setup>
import {onMounted, ref, watch} from 'vue'
import {useI18n} from 'vue-i18n'

const {locale, messages, t} = useI18n()
const lang = ref(locale.value)

function supportedLocales() {
    return Object.keys(messages.getter())
}

function browserLocale() {
    const browserLanguage = navigator.language.split('-')[0]
    return supportedLocales().includes(browserLanguage) ? browserLanguage : 'en'
}

watch(lang, (value) => {
    locale.value = value
    localStorage.setItem('preferred-language', value)
})

onMounted(() => {
    const storedLocale = localStorage.getItem('preferred-language')
    lang.value = storedLocale || browserLocale()
})
</script>

<template>
    <select id="language" v-model="lang" class="input" name="language">
        <option v-for="lang in supportedLocales()" :key="lang" :value="lang">{{ t('language.' + lang) }}</option>
    </select>
</template>
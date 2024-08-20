<script setup>
import {onMounted, ref, watch} from 'vue'
import {useRoute} from 'vue-router'

const props = defineProps({
    tags: {
        type: String,
        default: 'h1,h2',
    },
})

const headers = ref([])
const route = useRoute()

const generateOutline = () => {
    const headerElements = document.querySelectorAll(props.tags)
    headers.value = Array.from(headerElements).map((header) => {
        const id = header.id || header.textContent.trim().toLowerCase().replace(/\s+/g, '-')
        header.id = id // Ensure the header has an id
        return {id, text: header.textContent}
    })
}

onMounted(() => {
    generateOutline()
})

watch(route, () => {
    generateOutline()
})
</script>

<template>
    <div class="page-outline">
        <div class="subheader">Quick Outline</div>
        <a v-for="header in headers" :key="header.id" :href="`#${header.id}`" class="page-outline-clickable-link">
            {{ header.text }}
        </a>
    </div>
</template>

<style scoped>
.page-outline {
    @apply sticky top-8 grid gap-2;
}

.page-outline-clickable-link {
    @apply px-4 py-2 rounded relative;
    @apply hover:bg-slate-100;
}

.page-outline-clickable-link:before {
    content: '•';
    @apply absolute left-0;
}
</style>
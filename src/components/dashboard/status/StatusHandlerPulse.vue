<script setup>

</script>

<template>
    <div class="statusHandlerPulseContainer">
        <div class="statusHandlerLine"></div>
        <div class="statusHandlerLine"></div>
        <div class="statusHandlerLine"></div>
        <div class="statusHandlerLine"></div>
    </div>
</template>

<style scoped>
.statusHandlerPulseContainer {
    @apply animate-pulse grid gap-4 grid-cols-3;
}

.statusHandlerLine {
    @apply h-2 bg-slate-300 rounded-full col-span-3;
}

.statusHandlerLine:first-of-type {
    @apply col-span-1 mb-4;
}

.statusHandlerLine:last-of-type {
    @apply col-span-2;
}
</style>
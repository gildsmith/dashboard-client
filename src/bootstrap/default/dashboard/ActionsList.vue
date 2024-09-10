<script setup>
import {IconBell, IconInfoCircle, IconMail, IconNews} from '@tabler/icons-vue'

/* ---------------------------------------------------------------------------
 | Actions List
 | ---------------------------------------------------------------------------
 | Displays a list of quick actions on the right side of the dashboard.
 |
 | These actions typically open dynamic views (non-intrusive cards on
 | the left) that show information but do not modify any data.
 |
 | TODO
 */
</script>

<template>
    <div class="actions-list">
        <div class="action">
            <IconInfoCircle size="24" stroke="1.75"/>
        </div>
        <div class="action">
            <IconNews size="24" stroke="1.75"/>
        </div>
        <div class="action">
            <IconBell size="24" stroke="1.75"/>
        </div>
        <div class="action">
            <IconMail size="24" stroke="1.75"/>
        </div>
    </div>
</template>

<style scoped>
.actions-list {
    @apply flex flex-col gap-2 py-4 items-center;
}

.action {
    @apply p-2 cursor-pointer rounded-md;
    @apply hover:bg-flint-50;
}
</style>
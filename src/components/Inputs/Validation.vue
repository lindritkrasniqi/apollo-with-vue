<template>
    <div v-if="error" class="invalid-feedback fw-bolder">{{ error.toString() }}</div>
</template>

<script setup>
defineProps(['error'])
</script>
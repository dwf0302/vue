<template>
    <button :disabled="false" @:click="onSubmit">Button</button>
    <div v-bind="objectOfAttrs"></div>
</template>
<script>

import axios from 'axios'
axios.defaults.baseURL = "api"

export default {
    data() {
        return {
            objectOfAttrs: {
                id: 'container',
                class: 'wrapper'
            }
        }
    },
    methods: {
        onSubmit() {
            console.log(this.objectOfAttrs)
        }
    },
}
</script>
<style></style>
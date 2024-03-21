<template>
  <dev>
    <input type="checkbox" id="todo-item" :checked="isDone" />
    <label for="id"> {{ label }} </label>
  </dev>
</template>

<script>

export default {
  props: {
    label: { required: true, type: String },
    done: { default: false, type: Boolean },
    id: { required: true, type: String },
  },
  data() {
    return {
      isDone: this.done,
    };
  },

}
</script>
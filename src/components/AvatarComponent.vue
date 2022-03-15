<template>
  <div class="avatar">
    <img :src="`${text}`">
  </div>
</template>

<script>
export default {
  props: {
    text: {
      required: true
    }
  }
}
</script>

<style scoped>

</style>
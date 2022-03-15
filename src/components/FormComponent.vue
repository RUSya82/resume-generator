<template>
  <form class="card resume-form" @submit.prevent="submitForm">
    <div class="form-control">
      <label for="type">Тип блока</label>
      <select id="type" v-model="formData.type">
        <option value="title">Заголовок</option>
        <option value="subtitle">Подзаголовок</option>
        <option value="avatar">Аватар</option>
        <option value="text">Текст</option>
      </select>
    </div>

    <div class="form-control">
      <label for="value">Значение</label>
      <textarea id="value" rows="3" v-model="formData.text"></textarea>
    </div>

    <button class="btn primary" :disabled="!isTextValid">Добавить</button>
  </form>
</template>
<script>
export default {
  data(){
    return {
      formData: {
        type: "title",
        text: ''
      }
    }
  },
  methods: {
    submitForm(){
      this.$emit('onFormSubmit', this.formData);
      this.formData.text = '';
      this.formData.type = "title";
    }
  },
  computed: {
    isTextValid(){
      return this.formData.text.length > 3;
    }
  }
}
</script>
<style scoped lang="scss">
.resume-form{
  display: flex;
  flex-direction: column;
  flex: 1 0 30%;
  min-width: 250px;
}
</style>
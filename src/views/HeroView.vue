<template>
  <div class="container column resume-container">
    <form-component
        @onFormSubmit="getFormData"
    />

    <result-componemt
        :resume="resume"
        @onDeleteResume="deleteResume"
    />
  </div>
  <div class="container">
    <div class="button-container">
      <div class="button-item">
        <button class="btn primary" @click="loadResume">Выгрузить все резюме</button>
      </div>
      <div class="button-item">
        <button @click="uploadResume" class="btn primary" :disabled="isValidResume">Загрузить на сервер</button>
      </div>
      <div class="button-item">
        <button class="btn primary" @click="cleanResume">Очистить бланк</button>
      </div>
    </div>
    <loader-component v-if="isLoading"/>

    <all-resume-component v-else
                          :all-resume="allResume"
                          v-if="allResume.length > 0"
                          @onCLickResume="onCLickResume"
                          @onDeleteResume="deleteResume"
    />
  </div>
</template>

<script>
import FormComponent from "@/components/FormComponent";
import ResultComponemt from "@/components/ResultComponemt";
import LoaderComponent from "@/components/LoaderComponent";
import CommentsComponent from "@/components/CommentsComponent";
import AllResumeComponent from "@/components/AllResumeComponent";
import {resumeInstance} from "@/services/resumeService";

export default {
  components: {AllResumeComponent, CommentsComponent, LoaderComponent, ResultComponemt, FormComponent},
  methods: {
    getFormData(data) {
      this.resume.push({
        type: data.type,
        text: data.text
      })
    },
    onCLickResume(id) {
      this.resume = this.allResume.find(item => item.id === id).person;
    },
    async uploadResume() {
      this.isLoading = true;
      const id = await this.resumeService.insert(this.resume);
      this.allResume = await this.resumeService.getAll();
      this.cleanResume();
      this.isLoading = false;
    },
    async deleteResume(id) {
      this.isLoading = true;
      await this.resumeService.delete(id)
      this.allResume = await this.resumeService.getAll();
      this.isLoading = false;
    },
    cleanResume() {
      this.resume = [];
    },
    async loadResume() {
      this.isLoading = true;
      this.allResume = await this.resumeService.getAll();
      this.allResume = this.allResume || [];
      this.isLoading = false;
    }
  },
  data() {
    return {
      isLoading: false,
      resume: [],
      allResume: [],
      ifDeleteLoading: false,
      resumeService: null
    }
  },
  mounted() {
    this.resumeService = resumeInstance();  //экземпляр resumeService
  },
  computed: {
    isValidResume() {
      let title = this.resume.find(item => item.type === 'title');
      let subtitle = this.resume.find(item => item.type === 'subtitle');
      return !(title && subtitle);
    }
  }
}
</script>
<style lang="scss">
.avatar {
  display: flex;
  justify-content: center;
}

.avatar img {
  width: 250px;
  height: auto;
  border-radius: 50%;
}
.resume-container{
  flex-wrap: wrap;
  column-gap: 12px;
  row-gap: 12px;
  justify-content: space-between;
}
.button-container{
  display: flex;
  flex-wrap: wrap;
  row-gap: 12px;
  .button-item{
    flex: 1 1 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;

  }

}

</style>
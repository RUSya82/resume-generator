<template>
  <div class="card">
    <h2>Резюме</h2>
    <ul class="list">
      <li
          class="list-item resume-once"
          v-for="item in allResume"
          :key="item.id"
          @click="$emit('onCLickResume', item.id)">
        <div class="resume-buttons">
            <title-component :text="getResumeTitle(item).title"/>
            <subtitle-component :text="getResumeTitle(item).subtitle"/>
            <button class="btn danger" @click.stop="$emit('onDeleteResume', item.id)">Удалить</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import LoaderComponent from "@/components/LoaderComponent";
import TitleComponent from "@/components/TitleComponent";
import SubtitleComponent from "@/components/SubtitleComponent";
export default {
  components: {SubtitleComponent, TitleComponent, LoaderComponent},
  props:{
    allResume:{
      type: Array
    },
    ifDeleteLoading: {
      type: Boolean
    }
  },
  methods:{
    getResumeTitle(item){
      let title = item.person.find(item => item.type === 'title').text;
      let subtitle = item.person.find(item => item.type === 'subtitle').text;
      return {
        title,
        subtitle
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.resume-once{
  cursor: pointer;
  border-radius: 15px;
}
.resume-once:hover{
  -webkit-box-shadow: 3px 13px 8px 7px rgba(34, 60, 80, 0.12);
  -moz-box-shadow: 3px 13px 8px 7px rgba(34, 60, 80, 0.12);
  box-shadow: 3px 13px 8px 7px rgba(34, 60, 80, 0.12);
}
.resume-buttons{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: 24px;
  align-items: center;
  width: 100%;
}
</style>
<template>
  <div class="card card-w70">
    <div v-if="resume.length > 0">
      <component :is="getComponentName(item.type)" v-for="item in resume" :text="item.text"/>
    </div>

    <no-data-component v-else/>
  </div>
</template>
<script>
import TitleComponent from "@/components/TitleComponent";
import AvatarComponent from "@/components/AvatarComponent";
import SubtitleComponent from "@/components/SubtitleComponent";
import TextComponent from "@/components/TextComponent";
import NoDataComponent from "@/components/NoDataComponent";
export default {
  components: {NoDataComponent, TextComponent, SubtitleComponent, AvatarComponent, TitleComponent},
  data(){
    return {
      componentsVariants: ['title', 'subtitle', 'avatar', 'text'],
    }
  },
  props:{
    resume: {
      type: Array,
      required: true
    }
  },
  computed: {

  },
  methods:{
    getComponentName(name){
      return `${name}-component`;
    }
  }

}
</script>
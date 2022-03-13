import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Catalog",

  props: {
    depth: {
      type: Number,
      default: 1,
    },
  },

  setup() {
    const route = useRoute();
  },
});

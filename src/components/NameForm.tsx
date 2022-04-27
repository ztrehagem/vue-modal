import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(name: string) => void>,
      required: true,
    },
  },

  setup(props) {
    const name = ref("");

    const submitHandler = (e: Event) => {
      e.preventDefault();
      props.onSubmit(name.value);
    };

    return () => (
      <form onSubmit={submitHandler}>
        <input v-model={name.value} type="text" placeholder="your name" />

        <button type="submit">showModal</button>
      </form>
    );
  },
});

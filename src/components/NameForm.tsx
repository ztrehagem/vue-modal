import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },

  emits: {
    updateName: (name: string) => true,
    submit: () => true,
  },

  setup(props, { emit }) {
    const model = computed({
      get: () => props.name,
      set: (value: string) => emit("updateName", value),
    });

    const submitHandler = (e: Event) => {
      e.preventDefault();
      emit("submit");
    };

    return () => (
      <form onSubmit={submitHandler}>
        <input v-model={model.value} type="text" placeholder="your name" />

        <button type="submit">showModal</button>
      </form>
    );
  },
});

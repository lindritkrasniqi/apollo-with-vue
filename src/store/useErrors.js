import { defineStore } from "pinia";

export const useErrorsStore = defineStore("errors", {
  state: () => ({
    message: null,
    category: null,
    fields: { input: {} },
  }),
});

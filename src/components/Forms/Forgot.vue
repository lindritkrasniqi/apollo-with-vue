<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3 row">
      <label for="email" class="col-sm-4 col-form-label text-sm-end">Email:</label>
      <div class="col-sm-8">
        <input
          type="text"
          class="form-control"
          v-model="credentials.email"
          id="email"
          :class="errors.fields.input.email ? 'is-invalid' : ''"
          :disabled="loading"
        />
        <inputs-validation :error="errors.fields.input.password" />
      </div>
    </div>

    <div class="mb-3 row">
      <label class="col-sm-4"></label>
      <div class="col-sm-8">
        <button type="submit" class="btn btn-outline-primary">
          <div v-if="loading" class="spinner-border mx-3 spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <span v-else>Send</span>
        </button>
      </div>
    </div>

    <router-link
      :to="{ name: 'accounts-login' }"
      class="text-decoration-none float-end"
    >I think, I remember my password!</router-link>
  </form>
</template>

<script setup>
import InputsValidation from "~/components/Inputs/Validation"
import { ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useErrorsStore } from "../../store/useErrors";
import gql from "graphql-tag"
import { useMutation } from "@vue/apollo-composable"

const credentials = ref({});
const router = useRouter();
const errors = useErrorsStore();

const { mutate, loading, onDone } = useMutation(gql`mutation ($input: ForgotPasswordInput!) { forgotPassword(input: $input) { message } }`);

onDone(({ data }) => {
  if (data) {
    router.push({ name: "index" });
  }
})

function onSubmit() {
  mutate({ input: credentials.value });
};

onBeforeUnmount(() => errors.$reset());
</script>
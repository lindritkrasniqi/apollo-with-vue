<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3 row">
      <label for="password" class="col-sm-4 col-form-label text-sm-end">Password:</label>
      <div class="col-sm-8">
        <input
          type="password"
          class="form-control"
          v-model="credentials.password"
          id="password"
          :class="errors.fields.input.password ? 'is-invalid' : ''"
          autocomplete="false"
          :disabled="loading"
        />
        <inputs-validation :error="errors.fields.input.password" />
      </div>
    </div>

    <div class="mb-3 row">
      <label for="inputPassword" class="col-sm-4 col-form-label text-sm-end">Confirm password:</label>
      <div class="col-sm-8">
        <input
          type="password"
          class="form-control"
          v-model="credentials.password_confirmation"
          id="inputPassword"
          autocomplete="false"
          :disabled="loading"
        />
      </div>
    </div>

    <div class="mb-3 row">
      <label class="col-sm-4"></label>
      <div class="col-sm-8">
        <button type="submit" class="btn btn-outline-primary">
          <div v-if="loading" class="spinner-border mx-3 spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <span v-else>Save</span>
        </button>
      </div>
    </div>

    <router-link :to="{ name: 'index' }" class="text-decoration-none float-end">Back to home?</router-link>
  </form>
</template>

<script setup>
import InputsValidation from "~/components/Inputs/Validation"
import { ref, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useErrorsStore } from "store/useErrors";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";

const credentials = ref({});
const router = useRouter();
const route = useRoute();
const errors = useErrorsStore();

const { mutate, loading, onDone } = useMutation(gql`mutation($input: ResetPasswordInput!) { resetPassword(input: $input) {  message } }`);

onDone(({ data }) => {
  if (data) router.push({ name: "index" });
});

const onSubmit = () => {
  errors.$reset();

  credentials.value = { ...credentials.value, ...route.query };

  mutate({ input: credentials.value });
};

onBeforeUnmount(() => errors.$reset());
</script>
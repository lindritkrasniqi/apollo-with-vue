<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3 row">
      <label for="name" class="col-sm-4 col-form-label text-sm-end">Name:</label>
      <div class="col-sm-8">
        <input
          type="text"
          class="form-control"
          v-model="credentials.name"
          id="name"
          :class="errors.fields.input.name ? 'is-invalid' : ''"
          :disabled="loading"
        />

        <inputs-validation :error="errors.fields.input.password" />
      </div>
    </div>

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

        <inputs-validation :error="errors.fields.input.email" />
      </div>
    </div>

    <div class="mb-3 row">
      <label for="inputPassword" class="col-sm-4 col-form-label text-sm-end">Password:</label>
      <div class="col-sm-8">
        <input
          type="password"
          class="form-control"
          v-model="credentials.password"
          id="inputPassword"
          :disabled="loading"
          autocomplete="false"
          :class="errors.fields.input.password ? 'is-invalid' : ''"
        />

        <inputs-validation :error="errors.fields.input.password" />
      </div>
    </div>

    <div class="mb-3 row">
      <label
        for="inputPassword_confirm"
        class="col-sm-4 col-form-label text-sm-end"
      >Confirm password:</label>
      <div class="col-sm-8">
        <input
          type="password"
          class="form-control"
          v-model="credentials.password_confirmation"
          :disabled="loading"
          id="inputPassword_confirm"
          autocomplete="false"
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
          <span v-else>Sign up</span>
        </button>
      </div>
    </div>

    <router-link
      :to="{ name: 'index' }"
      class="text-decoration-none float-end"
    >Already, have an account?</router-link>
  </form>
</template>

<script setup>
import InputsValidation from "~/components/Inputs/Validation"
import { ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "store/useAuth";
import { useErrorsStore } from "store/useErrors";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";

const credentials = ref({});
const router = useRouter();
const auth = useAuthStore();
const errors = useErrorsStore();

const { mutate, loading, onDone } = useMutation(gql`mutation($input: RegisterInput!){ register(input: $input) { name } }`);

onDone(async ({ data }) => {
  if (data) {
    loading.value = true;
    let { email, password } = credentials.value;

    auth.login({ email, password })
      .then(() => router.push({ name: "index" }));
  }
})

function onSubmit() {
  errors.$reset();

  mutate({ input: credentials.value });
};

onBeforeUnmount(() => errors.$reset());
</script>
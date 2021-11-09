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

        <inputs-validation :error="errors.fields.input.email" />
      </div>
    </div>

    <div class="mb-3 row">
      <label for="current-password" class="col-sm-4 col-form-label text-sm-end">Password:</label>
      <div class="col-sm-8">
        <input
          type="password"
          class="form-control"
          v-model="credentials.password"
          id="current-password"
          :class="errors.fields.input.password ? 'is-invalid' : ''"
          :disabled="loading"
          autocomplete="false"
        />
        <inputs-validation :error="errors.fields.input.password" />
      </div>
    </div>

    <div class="mb-3 row">
      <label class="col-sm-4"></label>
      <div class="col-sm-8">
        <router-link :to="{ name: 'accounts-register' }" class="btn btn-primary me-3">Sign up</router-link>

        <button type="submit" :disabled="loading" class="btn btn-outline-primary">
          <div v-if="loading" class="spinner-border mx-3 spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <span v-else>Login</span>
        </button>
      </div>
    </div>

    <router-link
      :to="{ name: 'accounts-forgot' }"
      class="text-decoration-none float-end"
    >Forgot your password?</router-link>
  </form>
</template>

<script setup>
import InputsValidation from "~/components/Inputs/Validation"
import { ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "store/useAuth";
import { useErrorsStore } from "store/useErrors";

const credentials = ref({});
const loading = ref(false);
const router = useRouter();
const errors = useErrorsStore();
const auth = useAuthStore();

function onSubmit() {
  loading.value = true;

  errors.$reset();

  auth.login(credentials.value)
    .then(() => router.push({ name: 'index' }))
    .catch(() => loading.value = false);
};

onBeforeUnmount(() => errors.$reset());
</script>
<template>
  <div class="col text-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div class="lead">Please wait...</div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { useAuthStore } from "store/useAuth";
import gql from "graphql-tag"
import { useMutation } from "@vue/apollo-composable"

const auth = useAuthStore();
const router = useRouter();

document.title = `Please wait...`;

// const { mutate, onDone } = useMutation(gql`mutation { logout }`);

// onDone(({ data }) => {
//   if (data.logout) {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('loggedIn');

//     auth.$reset();
//     router.push({ name: "index" });
//   }
// })

onMounted(() => auth.logout().then(() => router.push({ name: "index" })));

</script>
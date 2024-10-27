<script setup lang="ts">
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue";
import logo from "@images/logo.jpeg";
import authV1BottomShape from "@images/svg/auth-v1-bottom-shape.svg?url";
import authV1TopShape from "@images/svg/auth-v1-top-shape.svg?url";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const form = ref({
  email: "",
  password: "",
  remember: false,
});

const submitted = ref(false);

const isPasswordVisible = ref(false);

const submit = async () => {
  submitted.value = true;

  if (!form.value.email || !form.value.password) {
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}login`,
      form.value,
      {
        headers: {
          school_id: import.meta.env.VITE_SCHOOL_ID,
        },
      }
    );

    if (!response.data?.token) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Email or password is incorrect",
        life: 3000,
      });
      return;
    }
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    toast.add({
      severity: "info",
      summary: "Login Successful",
      detail: "Redirecting...",
      life: 3000,
    });
    await router.push({ path: "/" });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Email or password is incorrect",
      life: 3000,
    });
  }
};
</script>

<template>
  <Toast />
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VImg
        :src="authV1TopShape"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />

      <!-- 👉 Bottom shape -->
      <VImg
        :src="authV1BottomShape"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />

      <!-- 👉 Auth Card -->
      <VCard
        class="auth-card"
        max-width="460"
        :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'"
      >
        <VCardItem class="justify-center">
          <RouterLink to="/" class="app-logo">
            <!-- eslint-disable vue/no-v-html -->
            <div class="d-flex"> 
              <img :src="logo" alt="logo" width="42">
            </div>
            <h1 class="app-logo-title">Information System</h1>
          </RouterLink>
        </VCardItem>

        <VCardText>
          <h4 class="text-h4 mb-1">Welcome to Information System! 👋🏻</h4>
          <p class="mb-0">Please sign in to your account</p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="$router.push('/')">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  autofocus
                  label="Email"
                  type="email"
                  placeholder="johndoe@email.com"
                />
                <span v-if="!form.email && submitted" style="color: red"
                  >Please enter your email</span
                >
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <span v-if="!form.password && submitted" style="color: red"
                  >Please enter your password</span
                >

                <!-- remember me checkbox -->
                <div
                  class="d-flex align-center justify-space-between flex-wrap my-6"
                >
                  <VCheckbox v-model="form.remember" label="Remember me" />

                  <a class="text-primary" href="javascript:void(0)">
                    Forgot Password?
                  </a>
                </div>

                <!-- login button -->
                <VBtn block @click="submit"> Login </VBtn>
              </VCol>

              <!-- create account -->
              <!-- <VCol
                cols="12"
                class="text-body-1 text-center"
              >
                <span class="d-inline-block">
                  New on our platform?
                </span>
                <RouterLink
                  class="text-primary ms-1 d-inline-block text-body-1"
                  to="/register"
                >
                  Create an account
                </RouterLink>
              </VCol> -->

              <!-- <VCol
                cols="12"
                class="d-flex align-center"
              >
                <VDivider />
                <span class="mx-4 text-high-emphasis">or</span>
                <VDivider />
              </VCol> -->

              <!-- auth providers -->
              <!-- <VCol
                cols="12"
                class="text-center"
              >
                <AuthProvider />
              </VCol> -->
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

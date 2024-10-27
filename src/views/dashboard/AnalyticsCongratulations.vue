<script setup lang="ts">
// import { computed, ref, onMounted } from 'vue'
import { useTheme } from "vuetify";
import illustrationJohnDark from "@images/cards/illustration-john-dark.png";
import illustrationJohnLight from "@images/cards/illustration-john-light.png";

const { global } = useTheme();
const illustrationJohn = computed(() =>
  global.name.value === "dark" ? illustrationJohnDark : illustrationJohnLight
);
const user = JSON.parse(localStorage.getItem("user") || "{}");
const currentTime = ref("");
const updateTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  currentTime.value = `${hours}:${minutes}`;
};

const downloadFile = () => {
  const link = document.createElement('a');
  link.href = '/DAFTAR HADIR BIMBINGAN.pdf';
  link.target = '_blank';
  link.click();
}
onMounted(() => {
  updateTime(); 
  const interval = setInterval(updateTime, 1000); 

  onUnmounted(() => {
    clearInterval(interval); 
  });
});
</script>

<template>
  <VCard class="text-center text-sm-start">
    <VRow no-gutters>
      <VCol cols="12" sm="10" order="2" order-sm="1">
        <VCardItem class="pb-3">
          <VCardTitle class="text-primary">
            Selamat Datang {{ user.name }}
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <h4>Tata Cara Bimbingan</h4>
          <br />
          <p class="mb-0">
            Silahkan klik tombol dibawah ini untuk melihat daftar bimbingan
            online.
          </p>
          <br />
          <VBtn variant="tonal" class="mt-6" size="small" @click="downloadFile"> <i class="pi pi-download"></i> Unduh </VBtn>
        </VCardText>
        <VCardText>
        <img
          :src="illustrationJohn"
          :height="$vuetify.display.xs ? '150' : '182'"
          :class="$vuetify.display.xs ? 'mt-6 mb-n2' : 'position-absolute'"
          class="john-illustration flip-in-rtl"
        />
      </VCardText>
      </VCol>

      <VCol cols="12" sm="2" order="1" order-sm="2" class="text-center">
        <p class="text-h4 font-weight-semibold">Jam: {{ currentTime }}</p>
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.john-illustration {
  inset-block-end: -0.125rem;
  inset-inline-end: 3.5rem;
}
</style>

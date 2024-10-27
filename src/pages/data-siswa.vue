<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import axios from "axios";

const toast = useToast();
const dataUser = ref([]);

const getData = async () => {
  const response = await axios.get(
    import.meta.env.VITE_API_URL + "student/list",
    {
      headers: {
        school_id: import.meta.env.VITE_SCHOOL_ID,
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  if (response.status === 200) {
    dataUser.value = response.data;
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to fetch data",
      life: 3000,
    });
  }
};

const filters = ref({
  global: { value: '' }
})

onMounted(() => {
  getData();
});
</script>
<template>
  <DataTable
    ref="dt"
    v-model:filters="filters"
    :value="dataUser"
    paginator
    stripedRows
    responsiveLayout="scroll"
    :rows="5"
    :rowsPerPageOptions="[5, 10, 20, 50]"
  >
    <template #empty> <p class="text-center">Tidak ada data</p> </template>
    <template #header>
      <IconField>
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText
          v-model="filters['global'].value"
          placeholder="Cari..."
          @input="onSearch"
        />
      </IconField>
    </template>
    <Column
      field="student_id"
      header="Nomor Induk"
      sortable
      style="width: 25%"
    ></Column>
    <Column
      field="major_code"
      header="Jurusan"
      sortable
      style="width: 25%"
    ></Column>
    <Column
      field="class_code"
      header="Kelas"
      sortable
      style="width: 25%"
    ></Column>
    <Column
      field="student_name"
      header="Nama"
      sortable
      style="width: 25%"
    ></Column>
    <Column
      field="student_gender"
      header="Jenis Kelamin"
      style="width: 25%"
      sortable
    >
      <template #body="slotProps">
        {{
          slotProps.data.student_gender === "Male" ? "Laki-laki" : "Perempuan"
        }}
      </template>
    </Column>
    <Column field="Aksi" header="Aksi" style="width: 25%">
      <template #body="slotProps">
        <Button
          label="Detail"
          icon="pi pi-search"
          class="p-button-success mr-2"
          @click="$router.push('/data-siswa/' + slotProps.data.student_id)"
        />
      </template>
    </Column>
  </DataTable>
  <!-- </div> -->
</template>

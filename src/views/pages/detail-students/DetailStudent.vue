<script lang="ts" setup>
import avatar1 from "@images/avatars/avatar-1.png";
import axios from "axios";
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import Tag from "primevue/tag";
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const route = useRoute();
const toast = useToast();
const id = useRoute().params.id;
const StudentData = ref(null);
const StudentDataLocal = ref({
  major: {
    major_name: "",
  },
  class: {
    class_name: "",
  },
});

const getData = async (id: string) => {
  const response = await axios.get(
    import.meta.env.VITE_API_URL + "student/detail/" + id,
    {
      headers: {
        school_id: import.meta.env.VITE_SCHOOL_ID,
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  if (response.status === 200) {
    StudentData.value = response.data;
    console.log("StudentData:", StudentData.value);
  } else {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to fetch data",
      life: 3000,
    });
  }
};

const refInputEl = ref<HTMLElement>();

const isStudentDeactivated = ref(false);

const resetForm = () => {
  StudentDataLocal.value = JSON.parse(JSON.stringify(StudentData.value));
};

watch(StudentData, (newVal) => {
  if (newVal) {
    StudentDataLocal.value = JSON.parse(JSON.stringify(newVal));
    console.log("Updated StudentDataLocal:", StudentDataLocal.value);
  }
});

// changeAvatar function
const changeAvatar = (file: Event) => {
  const fileReader = new FileReader();
  const { files } = file.target as HTMLInputElement;

  if (files && files.length) {
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      if (typeof fileReader.result === "string")
        StudentDataLocal.value.student_photo = fileReader.result;
    };
  }
};

// reset avatar image
const resetAvatar = () => {
  StudentDataLocal.value.student_photo = StudentData.student_photo;
};

const getImage = (image: string) => {
  const url = image
    ? import.meta.env.VITE_BASE_URL + "storage/" + image
    : avatar1;
  return url;
};

const Gender = (gender: string) => {
  if (gender == "Male") {
    return "Laki-laki";
  } else {
    return "Perempuan";
  }
};

const statusValue = (status: string) => {
  if (status == "1") {
    return "Aktif";
  } else {
    return "Tidak Aktif";
  }
};

const statusSeverity = (status: string) => {
  if (status == "1") {
    return "success";
  } else {
    return "danger";
  }
};

onMounted(() => {
  const studentId = route.params.id;
  getData(studentId);
});
</script>

<template>
<Toast />
  <VRow>
    <VCol cols="12">
      <VCard title="Detail Pelajar">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="getImage(StudentDataLocal.student_photo)"
          />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <!-- <VBtn color="primary" @click="refInputEl?.click()">
                <VIcon icon="bx-cloud-upload" class="d-sm-none" />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              />

              <VBtn
                type="reset"
                color="error"
                variant="tonal"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Reset</span>
                <VIcon icon="bx-refresh" class="d-sm-none" />
              </VBtn> -->

              <Tag :value="statusValue(StudentDataLocal.student_status)" :severity="statusSeverity(StudentDataLocal.student_status)" class="me-2" />
            </div>

            <!-- <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p> -->
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 Nomor Induk -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="StudentDataLocal.student_id"
                  placeholder="John"
                  label="Nomor Induk"
                  readonly
                />
              </VCol>

              <!-- 👉 Name -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="StudentDataLocal.student_name"
                  placeholder="John"
                  label="Nama"
                  readonly
                />
              </VCol>

              <!-- 👉 Major -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="StudentDataLocal.major.major_name"
                  placeholder="John"
                  label="Jurusan"
                  readonly
                />
              </VCol>

              <!-- 👉 Class -->
              <VCol md="6" cols="12">
                <VTextField
                  v-model="StudentDataLocal.class.class_name"
                  placeholder="John"
                  label="Kelas"
                  readonly
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_email"
                  label="E-mail"
                  placeholder="johndoe@gmail.com"
                  type="student_email"
                  readonly
                />
              </VCol>

              <!-- 👉 Gender -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_gender"
                  :value="Gender(StudentDataLocal.student_gender)"
                  label="Jenis Kelamin"
                  placeholder="ThemeSelection"
                  readonly
                />
              </VCol>

              <!-- 👉 Phone -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_phone_number"
                  label="Phone Number"
                  placeholder="+1 (917) 543-9876"
                  readonly
                />
              </VCol>

              <!-- 👉 Place Of Birth -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_place_of_birth"
                  label="Tempat Lahir"
                  placeholder="New York, NY"
                  readonly
                />
              </VCol>

              <!-- 👉 Date Of Birth -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_date_of_birth"
                  label="Tanggal Lahir"
                  placeholder="New York, NY"
                  readonly
                />
              </VCol>

              <!-- 👉 Child To -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_child_to"
                  label="Anak ke"
                  placeholder="1"
                  readonly
                />
              </VCol>

              <!-- 👉 Address -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_address"
                  label="Alamat"
                  placeholder="123 Main St, New York, NY 10001"
                  readonly
                />
              </VCol>

              <!-- 👉 Religion -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_religion"
                  label="Agama"
                  placeholder="New York"
                  readonly
                />
              </VCol>

              <!-- 👉 Nasinality -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_nationality"
                  label="Negara"
                  placeholder="New York"
                  readonly
                />
              </VCol>

              <!-- 👉 Father Name -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_father_name"
                  :value="
                    StudentDataLocal.student_father_name ?? 'Data belum di isi'
                  "
                  label="Nama Ayah"
                  placeholder="New York"
                  readonly
                />
              </VCol>

              <!-- 👉 Father Occupation -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_father_occupation"
                  :value="
                    StudentDataLocal.student_father_occupation ??
                    'Data belum di isi'
                  "
                  label="Pekerjaan Ayah"
                  placeholder="New York"
                  readonly
                />
              </VCol>

              <!-- 👉 Father Phone Number -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_father_phone_number"
                  :value="
                    StudentDataLocal.student_father_phone_number ??
                    'Data belum di isi'
                  "
                  label="Nomor Telepon Ayah"
                  placeholder="New York"
                  readonly
                />
              </VCol>

              <!-- 👉 Mother Name -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_mother_name"
                  :value="
                    StudentDataLocal.student_mother_name ?? 'Data belum di isi'
                  "
                  label="Nama Ibu"
                  placeholder="New York"
                  readonly
                />
              </VCol>

              <!-- 👉 Mother Occupation -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_mother_occupation"
                  :value="
                    StudentDataLocal.student_mother_occupation ??
                    'Data belum di isi'
                  "
                  label="Pekerjaan Ibu"
                  placeholder="New York"
                  readonly
                />
              </VCol>

              <!-- 👉 Mother Phone Number -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_parent_phone_number"
                  :value="
                    StudentDataLocal.student_parent_phone_number ??
                    'Data belum di isi'
                  "
                  label="Nomor Telepon Ibu"
                  placeholder="New York"
                  readonly
                />
              </VCol>

              <!-- 👉 Guardian Name -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_guardian_name"
                  :value="
                    StudentDataLocal.student_guardian_name ??
                    'Data belum di isi'
                  "
                  label="Nama Wali"
                  placeholder="New York"
                  readonly
                />
              </VCol>

              <!-- 👉 Guardian Occupation -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_guardian_occupation"
                  :value="
                    StudentDataLocal.student_guardian_occupation ??
                    'Data belum di isi'
                  "
                  label="Pekerjaan Wali"
                  placeholder="New York"
                  readonly
                />
              </VCol>

              <!-- 👉 Guardian Phone Number -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_guardian_phone_number"
                  :value="
                    StudentDataLocal.student_guardian_phone_number ??
                    'Data belum di isi'
                  "
                  label="Nomor Telepon Wali"
                  placeholder="New York"
                  readonly
                />
              </VCol>

              <!-- 👉 Country -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="StudentDataLocal.student_nationality"
                  :value="
                    StudentDataLocal.student_nationality ??
                    'Data belum di isi'
                  "
                  label="Negara"
                  placeholder="New York"
                  readonly
                />
              </VCol>

              <!-- 👉 Country -->
              <!-- <VCol cols="12" md="6">
                <VSelect
                  v-model="StudentDataLocal.student_nationality"
                  label="Country"
                  :items="['USA', 'Canada', 'UK', 'India', 'Australia']"
                  placeholder="Select Country"
                />
              </VCol> -->

              <!-- 👉 Form Actions -->
              <!-- <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn>Save changes</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  Reset
                </VBtn>
              </VCol> -->
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Deactivate Student -->
      <!-- <VCard title="Deactivate Student">
        <VCardText>
          <div>
            <VCheckbox
              v-model="isStudentDeactivated"
              label="I confirm my Student deactivation"
            />
          </div>

          <VBtn :disabled="!isStudentDeactivated" color="error" class="mt-3">
            Deactivate Student
          </VBtn>
        </VCardText>
      </VCard> -->
    </VCol>
  </VRow>
</template>

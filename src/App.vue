<template>
  <div class="container mt-5">
    <h1>Vue JS 3 Form Helper Plugin</h1>
    <p>
      This is a simple Vue 3 form helper plugin that provides form validation, form submission, and form reset functionality.
    </p>
    <form @submit.prevent="submitForm" style="width: 400px;" class="d-flex flex-column gap-3" v-if="true">
      <div class="d-flex justify-content-between">
        <label for="name" class="w-50">Name:</label>
        <input v-model="form.data.name" type="text" id="name" class="form-control" />
      </div>
      <span v-if="form.errors.name">{{ form.errors.name }}</span>
      <div class="d-flex justify-content-between">
        <label for="image" class="w-50">Image:</label>
        <input @change="form.data.image = $event.target.files[0]" type="file" id="image" class="form-control" />
      </div>
      <span v-if="form.errors.image">{{ form.errors.image }}</span>
      <div class="d-flex justify-content-between">
        <label for="email" class="w-50">Email:</label>
        <input v-model="form.data.email" type="email" id="email" class="form-control" />
      </div>
      <span v-if="form.errors.email">{{ form.errors.email }}</span>
      <div class="d-flex justify-content-between">
        <label for="age" class="w-50">Age:</label>
        <input v-model="form.data.age" type="number" id="age" class="form-control" />
      </div>
      <span v-if="form.errors.age">{{ form.errors.age }}</span>
      <div class="d-flex justify-content-between">
        <label for="deleted_at" class="w-50">Deleted At:</label>
        <input v-model="form.data.deleted_at" type="date" id="deleted_at" class="form-control" />
      </div>
      <span v-if="form.errors.deleted_at">{{ form.errors.deleted_at }}</span>
      <div class="d-flex justify-content-between">
        <label for="is_active" class="w-50">Is Active:</label>
        <input v-model="form.data.is_active" type="checkbox" id="is_active" class="" />
      </div>
      <span v-if="form.errors.is_active">{{ form.errors.is_active }}</span>
      <div v-if="form.is_dirty" class="alert alert-primary alert-xs">
        The form has unsaved changes
      </div>
      <div class="d-flex gap-1">
        <button type="submit" :disabled="form.processing === true">Submit</button>
        <button type="button" @click="resetForm" :disabled="form.processing === true">Reset</button>
      </div>
    </form>
  </div>
</template>


<script setup>
import {computed, defineComponent, inject, onMounted} from 'vue';
import { useForm } from "./plugins/Vue3FormHelper.ts";

const form = useForm(
    {
      name: 'Andreas Pabst',
      email: 'email@example.com',
      age: 32,
      is_active: true,
      deleted_at: null,
      image: null,
    }
);

async function submitForm() {
  try {
    await form.submit('POST', '/submit-form', {
      forceFormData: form.data.image !== null,
    });
    alert('Form submitted successfully');
  } catch (error) {
    console.error(error);
  }
}

function resetForm() {
  console.log(form);
  form.reset();
}

onMounted(() => {
  console.log("Content of form: ",form);
  console.log("Content of form data: ",form.data);
  console.log("Content of form data name: ",form.data.name);
});
</script>
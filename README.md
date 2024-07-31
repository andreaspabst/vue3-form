# vue3-form-helper
Deal with forms in Vue 3 by using this Form Helper Plugin, detecting dirty state, validation, error handling and more.

[![Vue JS Seminar](https://www.vuejs-seminar.de/img/VuejsSeminar/logo_color.png "Vue JS Seminar")](https://www.vuejs-seminar.de/)

## Why is there a package?

If you are running an SPA (Single Page Application), you deal with forms differently than in a traditional server-side rendered application. 
You don't send the form data to the server and get a new page as a response. Instead, you send the form data to the server and get a JSON response.
This package helps you to deal with forms in Vue 3 by providing a Form Helper Plugin, detecting dirty state, validation, error handling and more.

## Installation

Run npm or yarn installation of the vue3-head package:

### yarn
```bash
$ yarn add vue3-form-helper
```

### npm
```bash
$ npm install vue3-form-helper
```

### Set Up your Vue Application

Add the plugin to your Vue 3 application in the main.js or app.js file.
You don't need to pass an axios instance, but if you want to use the axios instance, you can pass it as an argument.

The plugin itself runs without any further configuration, but nevertheless it makes things easier, especially when you want to 
define axios interceptors, error handling, and more.

#### Basic Setup

```js
// app.js or main.js

import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

import { createFormPlugin } from 'vue3-form-helper';
const formPlugin = createFormPlugin(); // optional passing your axios instance
app.use(formPlugin);

app.mount('#app');
```

#### Setting up with global axios instance

```js
// app.js or main.js

import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

// you can implement any kind of axios instance here 
import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'https://fakeapi.andreaspabst.com', // Replace with your API base URL
});

import { createFormPlugin } from 'vue3-form-helper';
const formPlugin = createFormPlugin(axiosInstance);
app.use(formPlugin);

app.mount('#app');
```

## Usage

### Basic Usage

The most simple way of using the form helper is to import the `useForm` function and pass an object with the initial form values.

```vue
<script setup>
import { useForm } from "vue3-form-helper";

const form = useForm({
    name: 'Andreas Pabst',
    email: 'email@example.com',
    age: 32,
    is_active: true,
    deleted_at: null,
});

async function submitForm() {
    try {
        await form.submit('POST', '/submit-form');
        alert('Form submitted successfully');
    } catch (error) {
        console.error(error);
    }
}
```

You then may use the form object in your template to bind the form values to the input fields.
Please be aware that the form object is reactive and you can use the form object to bind the form values to the input fields.
Therefor simply use the `v-model` directive and bind it on `form.data.<field>`. Of course you could implement
multiple forms in your application and use the form object multiple times, e.g. `yourForm.data.<field>` or `anotherForm.data.<field>`.
Don't forget to init each form with the `const yourForm = useForm(...)` function.

```vue
<template>
    <form @submit.prevent="submitForm">
        <input v-model="form.data.name" type="text" name="name" />
        <input @change="form.data.image = $event.target.files[0]" type="file" name="file" />
        <button type="submit">Submit</button>
        <button type="reset" @click.prevent="form.reset()">Reset</button>
    </form>
</template>
```

### Uploading Images and Files

To upload images and files, you need to use the `type="file"` input field and bind the change event to the form data.
As soon as you send the form data to the server, you need to force the form data to be sent as FormData.

`forceFormData: true` is the option you need to set to `true` if you want to upload files.

If you don't force the form data to be sent as FormData, the form data will be sent as JSON data. 
JSON data is the default behavior and within JSON it's not possible to send files, because
the whole data will by stringified during the JSON.stringify process.
If you want to send the form data as FormData, you need to set the `forceFormData` option to `true`.

```js
const form = useForm({
    name: 'Andreas Pabst',
    image: null,
});

async function submitForm() {
    try {
        await form.submit('POST', '/submit-form', {
            forceFormData: form.data.image !== null, // forceFormData needs to be true if you want to upload files
        });
        alert('Form submitted successfully');
    } catch (error) {
        console.error(error);
    }
}
```

### Error Bag Usage

```vue
<div class="d-flex justify-content-between">
    <label for="name" class="w-50">Name:</label>
    <input v-model="form.data.name" type="text" id="name" class="form-control" />
</div>
<span v-if="form.errors.name">{{ form.errors.name }}</span>
  ```

The error bag is a reactive object and you can use it to display error messages in your template.
Typically its filled by the server response, but you can also add errors manually.

### Validation

The form helper provides a simple validation mechanism. You can define validation rules for each field in the form object.
The validation rules are defined as a string and can be one of the following:

```js
const form = useForm({
    name: '',
    email: '',
    age: null,
}, {
    name: 'string',
    email: 'string',
    age: 'number',
});
```

## License

[MIT](https://opensource.org/licenses/MIT)

## Resources

- [📺 IT Pabst YouTube](https://www.youtube.com/channel/UC2qIzllaHNtseSXwj18r-7w)
- [Vue JS Seminars and Coaching](https://www.vuejs-seminar.de/)
- [Vue JS 3 JSON LD Plugin](https://www.vuejs-seminar.de/packages/vue3-json-ld)
- [Vue JS 3 Head Plugin](https://www.vuejs-seminar.de/packages/vue3-head)
- [Vue JS 3 Form Helper Plugin](https://www.vuejs-seminar.de/packages/vue3-form-helper)
- [Laravel Seminars and Coaching](https://www.laravel-seminar.de/)
- [Andreas Pabst](https://www.andreaspabst.com)

## Software Tips

- [Funnerix Funnel Builder](https://www.funnerix.com/)
- [Linkrex Bio Page](https://www.linkrex.eu/)
- [apprex Online Course Platform](https://www.apprex.de/)
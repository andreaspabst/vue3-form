// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import { createFormPlugin } from './plugins/Vue3FormHelper.ts'

const axiosInstance = axios.create({
    baseURL: 'https://fakeapi.andreaspabst.com', // Replace with your API base URL
});

const formPlugin = createFormPlugin(axiosInstance);

const app = createApp(App);

app.use(formPlugin);

app.mount('#app');

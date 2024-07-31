import { useForm } from './plugins/Vue3FormHelper';
export function createFormPlugin() {
    return {
        install: (app) => {
            // Provide useForm function to all components
            app.provide('useForm', useForm);
        }
    };
}

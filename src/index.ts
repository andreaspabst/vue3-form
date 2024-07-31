// Import necessary modules from vue
import type { App } from 'vue';
import { useForm } from './plugins/Vue3FormHelper';

/**
 * Interface for Vue3FormHelper
 * @interface Vue3FormHelper
 */
interface Vue3FormHelper {
    // Method to install the plugin
    install: (app: App) => void;
}

export function createFormPlugin() {
    return {
        install: (app: App) => {
            // Provide useForm function to all components
            app.provide('useForm', useForm);
        }
    }
}
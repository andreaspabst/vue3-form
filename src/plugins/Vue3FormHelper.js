import { computed, reactive, ref, toRef, toRefs, watch, watchEffect } from 'vue';
import axios from 'axios';
// Shared axios instance and fetch instance for the plugin to use
let sharedAxiosInstance = null;
let sharedFetchInstance = null;
/**
 * useForm function to create a form object with initial data, validation schema and axios or fetch instance
 * @param initialData
 * @param validationSchema
 * @param axiosInstance
 * @param fetchInstance
 */
export function useForm(initialData, validationSchema = {}, axiosInstance, fetchInstance) {
    const initialDataCopy = JSON.parse(JSON.stringify(initialData));
    const is_dirty = ref(false);
    /**
     * Create a reactive form object with initial data, errors and processing state
     */
    const form = reactive({
        initialData: { ...initialData },
        data: { ...initialData },
        errors: {},
        processing: false,
    });
    /**
     * Set errors in the form object with key-value pairs
     * @param errors
     */
    function setErrors(errors) {
        form.errors = errors;
    }
    /**
     * Clear errors in the form object by setting errors to an empty object
     */
    function clearErrors() {
        form.errors = {};
    }
    /**
     * Start processing state in the form object
     */
    function startProcessing() {
        form.processing = true;
    }
    /**
     * Stop processing state in the form object
     */
    function stopProcessing() {
        form.processing = false;
    }
    /**
     * Validate the form object based on the validation schema
     */
    function validate() {
        const errors = {};
        for (const key in validationSchema) {
            const value = form[key];
            const type = validationSchema[key];
            if (type === 'string' && typeof value !== 'string') {
                errors[key] = `${key} must be a string`;
            }
            else if (type === 'number' && typeof value !== 'number') {
                errors[key] = `${key} must be a number`;
            }
            else if (type === 'boolean' && typeof value !== 'boolean') {
                errors[key] = `${key} must be a boolean`;
            }
            else if (type === 'array' && !Array.isArray(value)) {
                errors[key] = `${key} must be an array`;
            }
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    /**
     * Submit the form object with a method, url and options
     * @param method
     * @param url
     * @param options
     */
    async function submit(method, url, options = {}) {
        if (!validate()) {
            throw new Error('Validation failed');
        }
        startProcessing();
        clearErrors();
        let axiosOrFetchInstance = axiosInstance || sharedAxiosInstance || axios.create();
        try {
            return await axiosOrFetchInstance({
                method,
                url,
                data: { ...form },
                ...options,
            });
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrors(error.response.data.errors || {});
                throw new Error(error.response.data.message || 'Form submission failed');
            }
            throw error;
        }
        finally {
            stopProcessing();
        }
    }
    /**
     * Check if the form object is dirty (changed from initial data)
     */
    function checkIfDirty() {
        const initialDataString = JSON.stringify(initialDataCopy);
        const currentDataString = JSON.stringify(form.data);
        is_dirty.value = initialDataString !== currentDataString;
    }
    /**
     * Watch the form data for changes and check if the form is dirty
     */
    watch(() => form.data, () => {
        checkIfDirty();
    }, { deep: true });
    /**
     * Reset the form object to initial data and clear errors
     */
    function reset() {
        Object.assign(form.data, initialDataCopy);
        is_dirty.value = false;
        clearErrors();
    }
    /**
     * Return the form object with additional methods
     */
    return reactive({
        ...form,
        submit,
        is_dirty,
        clearErrors,
        validate,
        reset,
    });
}
/**
 * Create a Vue 3 plugin for the form helper. Also accepts axios and fetch instances as parameters to set shared instances
 * @param axiosInstance
 * @param fetchInstance
 */
export function createFormPlugin(axiosInstance, fetchInstance) {
    sharedAxiosInstance = axiosInstance || null;
    sharedFetchInstance = fetchInstance || null;
    return {
        install(app) {
            // This is mainly used in Vue 3 Options API
            app.config.globalProperties.$useForm = useForm;
            // This is used in Vue 3 Composition API (inject)
            app.provide('$useForm', useForm);
        },
    };
}

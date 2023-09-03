<template>
    <q-form @submit="() => {
        $emit('submit', form, resetForm);
    }">
        <q-input 
            v-model="form.name" 
            class="q-mx-md q-my-md" 
            label="Name" 
            dense
            outlined
            hide-bottom-space
            :rules="[(val) => required(val, 'Name')]"
        />
        <q-input 
            v-model="form.description" 
            class=" q-mx-md q-my-sm" 
            type="textarea" 
            label="Description" 
            dense
            outlined
            style="max-height: 15rem;"
            :input-style="{ resize: 'none', height: '75px' }"
        />
        <div class="row justify-end q-mx-md q-my-md">
            <Button 
                id="submit-btn" 
                color="primary" 
                class="q-mr-sm" 
                flat 
                :label="submitButtonLabel" 
                type="submit"
                :loading="taskFormIsLoading"
            ></Button>
            <Button 
                v-if="!taskFormIsLoading" 
                id="submit-btn"
                color="primary" 
                flat 
                label="Cancel" 
                @click="() => {
                    $emit('cancel', resetForm);
                }"
            ></Button>
        </div>
    </q-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TaskStore from '../store/TaskStore';
import Button from '../../../common/component/button/Button.vue';
import { TaskFormDTO } from '../types/dtos/TaskFormDTO';
import { resetForm } from '../../../common/util/ResetForm';

interface IProps {
    taskForm?: TaskFormDTO;
    submitButtonLabel: string
}

const props = defineProps<IProps>();

defineEmits(['cancel', 'submit'])
const form = ref(props.taskForm ? props.taskForm : {
    name: '',
    description: ''
})
const submitButtonLabel = ref(props.submitButtonLabel);
const taskStore = TaskStore();
const taskFormIsLoading = computed(() => taskStore.getLoading());

const required = (val: string, field: 'Name' | 'Description') => (val && val.length > 0) || `${field} must be filled in.`
</script>

<style scoped>

</style>
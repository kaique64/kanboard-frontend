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
        <div class="row justify-end q-mx-md q-my-md">
            <Button 
                id="submit-btn" 
                color="primary" 
                class="q-mr-sm" 
                flat 
                :label="submitButtonLabel" 
                type="submit"
                :loading="boardFormIsLoading"
            ></Button>
            <Button 
                v-if="!boardFormIsLoading" 
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
import BoardStore from '../store/BoardStore';
import Button from '../../../common/component/button/Button.vue';
import { BoardFormDTO } from '../types/dtos/BoardFormDTO';
import { resetForm } from '../../../common/util/ResetForm';

interface IProps {
    boardForm?: BoardFormDTO;
    submitButtonLabel: string
}

const props = defineProps<IProps>();

defineEmits(['cancel', 'submit'])
const form = ref(props.boardForm ? props.boardForm : {
    name: '',
})
const submitButtonLabel = ref(props.submitButtonLabel);
const boardStore = BoardStore();
const boardFormIsLoading = computed(() => boardStore.getLoading());

const required = (val: string, field: 'Name' | 'Description') => (val && val.length > 0) || `${field} must be filled in.`
</script>
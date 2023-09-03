<template>
    <q-card 
        class="q-ma-md q-pa-md" 
        style="min-width: 23rem;"
    >
        <div class="row justify-between">
            <span class="text-bold text-h6">{{ name }}</span>
            <div>
                <Button 
                    id="action-button" 
                    flat 
                    color="blue" 
                    icon="mdi-plus" 
                    @click="$emit('add')"
                >
                    <template #default>
                        <q-tooltip>Add task</q-tooltip>
                    </template>
                </Button>
            </div>
        </div>
        <slot name="content"></slot>
    </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '../../../common/component/button/Button.vue';

interface IProps {
    name: string;
}

defineEmits(['add'])
const props = defineProps<IProps>();
const name = ref(props.name);
</script>

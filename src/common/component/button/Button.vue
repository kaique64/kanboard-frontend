<template>
    <q-btn 
        :id="props.id"
        :icon="props.icon"
        :label="props.label"
        :size="props.size"
        :loading="props.loading"
        :ripple="false"
    >
        <slot name="default"></slot>
        <slot name="loading"></slot>
    </q-btn>
</template>

<script setup lang="ts">
type TTypeButton = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface IProps {
    id: string;
    label?: string;
    icon?:string;
    loading?: boolean;
    type?: string;
    size?: TTypeButton;
}

const props = defineProps<IProps>();
</script>
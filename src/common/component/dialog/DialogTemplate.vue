<template>
    <q-layout view="lHh Lpr lFf" container :style="style" style="border-radius: 10px;">
        <q-header v-if="title" style="border-bottom: 1px solid #007ac09a;">
            <q-toolbar class="bg-white" style="color: #007bc0">
                <q-toolbar-title class="ellipsis margin-12-12">{{ title }}</q-toolbar-title>
                <slot name="toolbarActions"></slot>
                <Button
                    v-if="closeBtn"
                    id="btn-close-dialog"
                    v-close-popup
                    style="width: 36px; height: 10px;"
                    flat
                    size="sm"
                    color="blue"
                    icon="mdi-close"
                    @click="props.clickClose"
                />
            </q-toolbar>
        </q-header>

        <q-page-container class="bg-white" style="border-radius: 10px;">
            <q-page class="row">
                <div class="col-12">
                    <slot name="content"></slot>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Button from '../button/Button.vue';

interface IProps {
    title?: string;
    height?: string;
    width?: string;
    closeBtn?: boolean;
    clickClose?: (e: any) => void;
}

const props = defineProps<IProps>();
const title = ref(props.title);
const closeBtn = ref(props.closeBtn);

const style = computed(() => {
    const heightString = props.height !== undefined ? 'height: ' + props.height + ';' : '';
    const widthString = props.width !== undefined ? 'width: ' + props.width + ';' : '';

    return heightString + widthString + 'max-width:100%;'
})
</script>

<style>
.ellipsis {
    text-overflow: ellipsis;
    white-space: inherit;
    overflow: hidden;
}

.q-dialog__backdrop {
    backdrop-filter: blur(1px);
}

#btn-close-dialog:hover {
    background-color: #d1e4ff;
}

.q-page {
    min-height: 100% !important;
}
</style>

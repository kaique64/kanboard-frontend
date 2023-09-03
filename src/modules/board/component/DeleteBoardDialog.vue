<template>
    <q-dialog v-model="props.modelValue" persistent>
        <DialogTemplate height="50vh" width="25vw" :title="title" close-btn :click-close="() => $emit('close')">
            <template #content>
                <div class="column q-px-md q-mt-md">
                    <span class="text-bold text-subtitle1">Are you will delete this board?</span>
                    <span class="text-body">If you delete this board you need board insert it again.</span>
                </div>
                <div class="row justify-end q-mx-md q-my-md">
                    <Button 
                        id="submit-btn" 
                        color="primary" 
                        class="q-mr-sm" 
                        flat 
                        label="Delete" 
                        type="submit"
                        :loading="boardIsLoading"
                        @click="handleDeleteBoard"
                    ></Button>
                    <Button 
                        v-if="!boardIsLoading" 
                        id="submit-btn"
                        color="primary" 
                        flat 
                        label="Cancel" 
                        @click="$emit('cancel')"
                    ></Button>
                </div>
            </template>
        </DialogTemplate>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DialogTemplate from '../../../common/component/dialog/DialogTemplate.vue'
import { BoardService } from '../../board/service/BoardService';
import { useQuasar } from 'quasar';
import Button from '../../../common/component/button/Button.vue';
import BoardStore from '../store/BoardStore';

interface IProps {
    modelValue: any;
    title: string;
    boardId: number;
}

const emit = defineEmits(['close', 'cancel'])
const props = defineProps<IProps>();
const title = ref(props.title);
const boardId = computed(() => props.boardId);
const boardStore = BoardStore();
const boardIsLoading = computed(() => boardStore.getLoading());
const $q = useQuasar();
const boardService = BoardService();

async function handleDeleteBoard() {
    await deleteBoard();
    emit('close');
}

async function deleteBoard() {
  const boardDeleted = await boardService.deleteBoard(boardId.value);

  if (boardDeleted) {
    $q.notify({
        message: 'Board deleted successfully!',
        type: 'positive',
        color: 'green-5',
        position: 'top-right'
    });
  }
}

</script>
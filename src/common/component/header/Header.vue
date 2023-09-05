<template>
    <q-header class="row items-center justify-between q-px-xl" style="height: 70px">
        <div>
            <img src="/logo.svg" height="35" />
        </div>
        <span>
            <q-icon name="mdi-bell" size="sm" class="q-mr-sm" style="cursor: pointer;">
                <template #default>
                    <q-menu anchor="bottom end" self="bottom left">
                        <q-list>
                            <q-item 
                            v-close-popup 
                            class="flex items-center justify-center"
                            >
                                Notifications
                            </q-item>
                        </q-list>
                    </q-menu>
                </template>
            </q-icon>
        </span>
    </q-header>
</template>

<script setup lang="ts">
</script>

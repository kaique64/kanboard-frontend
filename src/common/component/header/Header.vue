<template>
    <q-layout view="lHh lpr lFf" container style="height: 70px" class="shadow-2 fixed">
        <q-header class="row items-center justify-between q-px-xl" style="height: 70px">
            <div>
                <q-icon name="mdi-account-circle" size="md" class="q-mr-sm"></q-icon>
                Kaique Costa
            </div>
            <span>
                <q-icon name="mdi-bell" size="sm" class="q-mr-sm" style="cursor: pointer;">
                    <template #default>
                        <q-tooltip>Notification</q-tooltip>
                    </template>
                </q-icon>
            </span>
        </q-header>
    </q-layout>
</template>

<script setup lang="ts">
</script>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['updateFilter']);
const selectedFilter = ref('both');

watch(selectedFilter, (newValue) => {
    emit('updateFilter', newValue);
}


)

</script>

<template>
    <div class="flex flex-col bg-white rounded-2xl overflow-hidden w-full shadow-2xl">
        <div class="bg-mainPurple p-2">
            <h1 class="text-center font-bold text-white">Filter</h1>
        </div>

        <div class="relative flex flex-col rounded-xl bg-white shadow">
            <nav class="flex flex-col gap-1 p-4">
                <div role="button"
                    class="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
                    <label for="react-vertical" class="flex w-full cursor-pointer items-center px-3 py-2">
                        <div class="inline-flex items-center">
                            <label class="relative flex items-center cursor-pointer" for="react-vertical">
                                <input v-model="selectedFilter" name="framework" type="radio" value="both"
                                    class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                                    id="react-vertical" checked />
                                <span
                                    class="absolute bg-mainPurple w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                            </label>
                            <label class="ml-2 text-mainBlack cursor-pointer text-sm" for="react-vertical">
                                Both
                            </label>
                        </div>
                    </label>
                </div>
                <div role="button"
                    class="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
                    <label for="vue-vertical" class="flex w-full cursor-pointer items-center px-3 py-2">
                        <div class="inline-flex items-center">
                            <label class="relative flex items-center cursor-pointer" for="vue-vertical">
                                <input v-model="selectedFilter" name="framework" type="radio" value="priority"
                                    class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                                    id="vue-vertical" />
                                <span
                                    class="absolute bg-mainPurple w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                            </label>
                            <label class="ml-2 text-mainBlack cursor-pointer text-sm" for="vue-vertical">
                                Priority
                            </label>
                        </div>
                    </label>
                </div>
                <div role="button"
                    class="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
                    <label for="svelte-vertical" class="flex w-full cursor-pointer items-center px-3 py-2">
                        <div class="inline-flex items-center">
                            <label class="relative flex items-center cursor-pointer" for="svelte-vertical">
                                <input v-model="selectedFilter" name="framework" type="radio" value="no-priority"
                                    class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                                    id="svelte-vertical" />
                                <span
                                    class="absolute bg-mainPurple w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                            </label>
                            <label class="ml-2 text-mainBlack cursor-pointer text-sm" for="svelte-vertical">
                                No Priority
                            </label>
                        </div>
                    </label>
                </div>
            </nav>
        </div>
    </div>
</template>
<script setup>

import { reactive } from 'vue';

const emit = defineEmits(['updateAnnotation']);

const formData = reactive({
    title: '',
    annotation: '',
    priority: false
});

const createAnnotation = (event) => {
    event.preventDefault();
    
    const storedAnnotation = JSON.parse(localStorage.getItem('annotations')) || [];
    storedAnnotation.push({ ...formData});
    localStorage.setItem('annotations', JSON.stringify(storedAnnotation));

    formData.title = '';
    formData.annotation = '';

    emit('updateAnnotation');
}

</script>

<template>
    <div class="flex flex-col w-full shadow-lg bg-white rounded-2xl overflow-hidden">
        <div class="bg-mainPurple p-2">
            <h1 class="text-center font-bold text-white">New Annotation</h1>
        </div>
        <form class="mt-4 p-4" @submit="createAnnotation">
            <div class="space-y-2">
                <p class="font-bold">Tittle</p>
                <input required v-model="formData.title" class="w-full bg-gray-100 rounded-lg p-2 text-black outline-none focus:ring-2 focus: ring-mainPurple" type="text" name="" id="">
            </div>

            <div class="space-y-2 my-4 ">
                <p class="font-bold">Annotation</p>
                <textarea required v-model="formData.annotation" class="rounded-lg bg-gray-100 resize-none h-44 w-full p-2 outline-none focus:ring-2 focus: ring-mainPurple" name="" id=""></textarea>
            </div>

            <button type="submit" class="bg-mainPurple w-full p-2 rounded-xl text-white hover:bg-purple-700 outline-none focus:ring-2 focus: ring-black">Submit</button>

        </form>
    </div>
</template>
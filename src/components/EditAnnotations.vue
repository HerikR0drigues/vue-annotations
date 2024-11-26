<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { reactive, watch } from 'vue';

library.add(faCircleXmark)

const props = defineProps({
    annotationsToEdit: Object,
})

watch(
    () => props.annotationsToEdit,
    (newAnnotation) => {
        if (newAnnotation) {
            annotationEdited.title = newAnnotation.title || '';
            annotationEdited.annotation = newAnnotation.annotation || '';
            annotationEdited.priority = newAnnotation.priority || false;
        }
    }
)

const emit = defineEmits(['updateAnnotation', 'annotationEdited']);

const annotationEdited = reactive({
    title: '',
    annotation: '',
    priority: false
});


const editAnnotation = (event) => {
    event.preventDefault();

    const annotations = JSON.parse(localStorage.getItem('annotations')) || [];
    const index = annotations.findIndex(annotation => annotation.title === props.annotationsToEdit.title && annotation.annotation === props.annotationsToEdit.annotation);
    if (index !== -1) {
        annotations[index] = {
            ...annotations[index],
            title: annotationEdited.title,
            annotation: annotationEdited.annotation,
            priority: annotationEdited.priority,
        };
    }
    localStorage.setItem('annotations', JSON.stringify(annotations));
    emit('updateAnnotation');
    emit('annotationEdited');
}

const handleCancelEdit = () => {
    emit('annotationEdited');
}

</script>

<template>
    <div class="flex flex-col w-full shadow-lg bg-white rounded-2xl overflow-hidden">
        <div class="bg-mainPurple p-2">
            <h1 class="text-center font-bold text-white">Edit Annotation</h1>
        </div>

        <div v-if="!props.annotationsToEdit" class="flex flex-col mt-4 p-4 justify-center items-center min-h-[391px]">
            <div class="animate-spin font-extrabold rounded-full h-12 w-12 border-t-4 border-mainPurple"></div>
            <p class="text-sm mt-4">Waiting Annotation to edit...</p>
        </div>

        <form v-else class="relative mt-4 p-4" @submit="editAnnotation">

            <FontAwesomeIcon @click="handleCancelEdit" class="absolute right-4 top-0 text-red-800 hover:text-red-400 cursor-pointer" :icon="['fas', 'circle-xmark']"/>

            <div class="space-y-2">
                <p class="font-bold">Tittle</p>
                <input v-model="annotationEdited.title" required class="w-full bg-gray-100 rounded-lg p-2 text-black outline-none focus:ring-2 focus: ring-mainPurple" type="text" name="" id="">
            </div>

            <div class="space-y-2 my-4 ">
                <p class="font-bold">Annotation</p>
                <textarea v-model="annotationEdited.annotation" required class="rounded-lg bg-gray-100 resize-none h-44 w-full p-2 outline-none focus:ring-2 focus: ring-mainPurple" name="" id=""></textarea>
            </div>

            <button type="submit" class="bg-mainPurple w-full p-2 rounded-xl text-white hover:bg-purple-700 outline-none focus:ring-2 focus: ring-black">Submit</button>

        </form>
    </div>
</template>
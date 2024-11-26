<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faCircleExclamation, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted, ref, watch } from 'vue';

library.add(faTrash, faCircleExclamation, faPenToSquare)

const emit = defineEmits(['updateAnnotation', 'editAnnotation'])

const props = defineProps({
    annotations: Object,
    indexEditing: Object,
    selectedFilter: String
})


const annotationsFiltered = ref([]);

const handleFiltration = () => {

    if (props.selectedFilter === 'both') {
        annotationsFiltered.value = props.annotations
    } else if (props.selectedFilter === 'priority') {
        annotationsFiltered.value = props.annotations.filter((annotation) => annotation.priority);
    } else if (props.selectedFilter === 'no-priority') {
        annotationsFiltered.value = props.annotations.filter((annotation) => !annotation.priority)
    }
}

watch(
    [
        () => props.annotations,
        () => props.selectedFilter
    ],
    handleFiltration,
    { immediate:true }

)

const handleDelete = (index) => {
    props.annotations.splice(index, 1)
    localStorage.setItem('annotations', JSON.stringify(props.annotations));
    emit('updateAnnotation');
}

const handleChangePriority = (index) => {
    props.annotations[index].priority = !props.annotations[index].priority;
    localStorage.setItem('annotations', JSON.stringify(props.annotations));
    emit('updateAnnotation');
}

const handleEdit = (annotation, index) => {
    emit('editAnnotation', annotation, index);
}

</script>

<template>
    <div class=" bg-white rounded-2xl overflow-hidden w-full shadow-2xl">
        <div class="bg-mainPurple p-2">
            <h1 class="text-center font-bold text-white">All Annotations</h1>
        </div>

        <div class="mt-4 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[595px] overflow-y-scroll">
            <div v-for="(annotation, index) in annotationsFiltered"
                :class="[annotation.priority ? 'border-mainPurple' : 'border-mainBlack' , 'overflow-hidden relative bg-gray-100 flex flex-col items-center rounded-2xl border-2']">

                <!-- Layer Opaca quando estiver editando -->
                <div v-if="props.indexEditing.index === index" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-lg z-50">
                    <div class="animate-spin font-extrabold rounded-full h-6 w-6 border-t-4 border-mainPurple"></div>
                </div>

                <div :class="[annotation.priority ? 'bg-mainPurple' : 'bg-mainBlack', 'flex w-full  justify-end px-3 p-1.5 gap-3']">
                    <FontAwesomeIcon @click="handleChangePriority(index)" class="text-white text-xs hover:text-orange-500 cursor-pointer" :icon="['fas', 'circle-exclamation']"/>
                    <FontAwesomeIcon @click="handleEdit(annotation, index)" class="text-white text-xs hover:text-yellow-400 cursor-pointer" :icon="['fas', 'pen-to-square']"/>
                    <FontAwesomeIcon @click="handleDelete(index)" class="text-white text-xs hover:text-red-600 cursor-pointer" :icon="['fas', 'trash']"/>
                </div>
                <div class="flex flex-col w-full rounded-b-2xl">
                    <div class="flex p-2 justify-center w-full border-dashed border-b-2 border-gray-300">
                        <h1 class="font-bold text-center text-sm break-words w-full"> {{ annotation.title }}</h1>
                    </div>
                    <div class="flex justify-center min-h-20 w-full p-2 items-center">
                        <h2 class="text-center text-sm break-words w-full"> {{ annotation.annotation }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
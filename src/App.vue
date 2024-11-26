<script setup>
import HeaderMain from './components/HeaderMain.vue';
import FooterMain from './components/FooterMain.vue';
import CreateAnnotation from './components/CreateAnnotation.vue';
import EditAnnotations from './components/EditAnnotations.vue';
import Annotations from './components/Annotations.vue';
import Filter from './components/Filter.vue';
import { reactive, onMounted, ref } from 'vue';

const selectedFilter = ref('both');
const annotations = reactive([]);
const annotationsToEdit = ref(null);
const indexEditing = reactive({
    index: null,
})

const getAllAnnotations = () => {
  const storedAnnotations = JSON.parse(localStorage.getItem('annotations')) || [];
  annotations.splice(0, annotations.length, ...storedAnnotations);
}

const handleEdit = (annotation, index) => {
  indexEditing.index = index;
  annotationsToEdit.value = annotation;
}

const handleAnnotationEdited = () => {
  annotationsToEdit.value = null;
  indexEditing.index = null;
}

const handleFilter = (newValue) => {
  selectedFilter.value = newValue;
}

onMounted(() => getAllAnnotations());

</script>

<template>

  <div id="app" class="flex flex-col min-h-screen bg-mainBackground font-poppins">
    <HeaderMain />

    <main class="flex max-w-6xl mx-auto w-full flex-grow space-y-4 p-4">
      <div class="flex w-full md:space-x-4 space-y-4 md:space-y-0 flex-col md:flex-row">
        <div class="w-full md:w-1/4 space-y-4">
          <CreateAnnotation 
          @updateAnnotation="getAllAnnotations" 
          />
          <Filter
          @updateFilter="handleFilter"
          />
        </div>

        <div class=" w-full md:w-2/4 ">
          <Annotations 
          :annotations="annotations" 
          :indexEditing="indexEditing"
          :selectedFilter="selectedFilter"
          @updateAnnotation="getAllAnnotations"
          @editAnnotation="handleEdit"
          />
        </div>

        <div class="w-full md:w-1/4">
          <EditAnnotations 
          :annotationsToEdit="annotationsToEdit"
          @updateAnnotation="getAllAnnotations"
          @annotationEdited="handleAnnotationEdited"
          />
        </div>
      </div>
    </main>

    <FooterMain />

  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRepository } from '@/api/Repository'

const route = useRoute()
const id = ref()
const car = ref()

const fetchCar = async () => {
  try {
    const res = useRepository.index('cars/' + route.params.id )
    // showMap(res.data)
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
    return { success: false, error: 'Ошибка при получении данных' }
  }
}

onMounted(() => {
    console.log("router")
    console.log(route.params.id)
    car = fetchCar()
    console.log(car)
})


</script>

<template>

    <h2>{{ car }}</h2>

</template>
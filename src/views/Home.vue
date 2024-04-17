<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/Auth'
import { useRepository } from '@/api/Repository'

const store = useAuthStore()

const showMap = (data) => {
  ymaps.ready(() => {
    let myMap = new ymaps.Map('map', {
      center: [51.774390, 55.098524],
      zoom: 13
    });
    data.forEach(function(element) {
      myMap.geoObjects.add(new ymaps.Placemark([element.location.coordinates[0], element.location.coordinates[1]]));
    });
  });
}

const fetchCarsLocations = async () => {
  try {
    console.log('suka')
    const res = useRepository.index('cars?include[]=location')
    console.log(res.data)
    showMap(res.data)
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
    return { success: false, error: 'Ошибка при получении данных' }
  }
}

onMounted(() => {
  console.log(store.cars)
  console.log(localStorage)
  if (store.cars == []) {
    fetchCarsLocations()
    .then(response => {
      if (response.success) {
        const data = response.data
        console.log('data')
    console.log(data)

        showMap(data)
      } else {
        console.error('Произошла ошибка:', response.error);
      }
    })
    .catch(error => {
      console.error('Произошла ошибка при запросе:', error);
    });
  } else {
    console.log('cars')
    console.log(store.cars.data)
    showMap(store.cars.data)
  }
});


  
</script>
  
<template>
  // TODO: карты делать через iframe
  // постараться подключить через модули(библиотеки) отказаться от подключения по скрипту
  // сделать файлик .env, там писать переменные для подключения (яндекс апи ключ, адрес локал хоста)
  <div id="map" style="width: 600px; height: 400px; border: 3px, solid, red;"></div>
</template>

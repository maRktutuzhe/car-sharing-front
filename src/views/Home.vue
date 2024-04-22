<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/Auth'
import { useRepository } from '@/api/Repository'
import { YandexMap, YandexMapDefaultSchemeLayer, YandexMapDefaultFeaturesLayer, YandexMapMarker } from 'vue-yandex-maps';

const store = useAuthStore()
const markers = []

const handleClick = (event) => console.log(event);

const showMap = (data) => {
  data.forEach(function(element) {
    const coordinates = [
      element.location.coordinates[1],
      element.location.coordinates[0]
    ]
    markers.push(
      {
        coordinates: coordinates,
        onClick: handleClick,
      }
    )
  })
}

const fetchCarsLocations = async () => {
  try {
    const res = useRepository.index('cars?include[]=location')
    showMap(res.data)
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
    return { success: false, error: 'Ошибка при получении данных' }
  }
}

onMounted(() => {
  if (store.cars == []) {
    fetchCarsLocations()
    .then(response => {
      if (response.success) {
        const data = response.data
        showMap(data)
      } else {
        console.error('Произошла ошибка:', response.error);
      }
    })
    .catch(error => {
      console.error('Произошла ошибка при запросе:', error);
    });
  } else {
    showMap(store.cars.data)
  }
});


  
</script>
  
<template>
  <yandex-map
      :settings="{
        location: {
          center: [ 55.098524, 51.774390],
          zoom: 13
        },
      }"
      width="100%"
      height="500px"
  >
    <yandex-map-default-scheme-layer/>
    <yandex-map-default-features-layer/>
    <yandex-map-marker
      v-for="(marker, index) in markers"
      :key="index"
      :settings="marker"
    >
      <div class="marker"/>
    </yandex-map-marker>
  </yandex-map>
</template>

<style scoped>
  .marker {
    position: relative;
    width: 20px;
    height: 20px;
    background: #ff0000;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    text-align: center;
    color: #fff;
    font-weight: bold;
    line-height: 20px;
  }
</style>

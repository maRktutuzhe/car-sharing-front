<script setup>
import { onMounted, ref } from 'vue'
import { BaseRepository } from '@/api/BaseRepository';
import { YandexMap, YandexMapDefaultSchemeLayer, YandexMapDefaultFeaturesLayer, YandexMapMarker } from 'vue-yandex-maps';
import Balloon from '../components/Balloon.vue';

const markers = []
const openMarker = ref(null);

const closeModal = () => {
  openMarker.value = false;
}
const handleMarkerClick = (index) => {
  openMarker.value = index;
};

const showMap = (data) => {
  data.forEach(element => {
    const coordinates = [
      element.location.coordinates[1],
      element.location.coordinates[0]
    ]
    markers.push(
      {
        id: element.id,
        number: element.number,
        color: element.color,
        coordinates: coordinates,
        name: element.name,
        carmake_id: element.carmake_id
      }
    )
  })
  console.log(markers)
}

const fetchCarsLocations = async () => {
  try {
    const res = await new BaseRepository().index('cars?include[]=location')
    return { success: true, data: res.data.data };
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
    return { success: false, error: 'Ошибка при получении данных' }
  }
}

onMounted(async() => {
    const response = await fetchCarsLocations();
  if (response.success) {
    const data = response.data;
    showMap(data);
  } else {
    console.error('Произошла ошибка:', response.error);
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
      width="500px"
      height="500px"
  >
    <yandex-map-default-scheme-layer/>
    <yandex-map-default-features-layer/>
    <yandex-map-marker
      v-for="(marker, index) in markers"
      :key="index"
      :settings="{ coordinates: marker.coordinates, onClick: () => handleMarkerClick(index), zIndex: openMarker === index ? 1 : 0 }"
      >
      <div class="marker">
      <Balloon
        :visible="openMarker === index"
        v-if="openMarker === index"
        :data="marker"
        @closeModal="closeModal"
        />
    </div>
    </yandex-map-marker>

  </yandex-map>
</template>

<style scoped>
.marker-popup {
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  color: black;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}
.popup {
  position: absolute;
  top: calc(100% + 10px);
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  color: black;
}
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
  .yandex-container {
  height: 400px;
}

.yandex-balloon {
  height: 200px;
  width: 200px;
}
</style>

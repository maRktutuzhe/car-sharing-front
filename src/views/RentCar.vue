<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRepository } from '@/api/Repository'
import { YandexMap, YandexMapDefaultSchemeLayer, YandexMapDefaultFeaturesLayer, YandexMapMarker } from 'vue-yandex-maps';

const route = useRoute()
const car = ref({})
const markers = []

const fetchCar = async () => {
  try {
    const res = await useRepository.index('cars/' + route.params.id + '?include[]=location&include[]=rent')
    return { success: true, data: res.data.data };
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
    return { success: false, error: 'Ошибка при получении данных' }
  }
}

// onMounted(() => {
//   console.log("router")
//   console.log(route.params.id)
  
//   fetchCar()
//     .then(response => {
//       if (response.success) {
//         car.value = response.data
//         showMap(car)
//       } else {
//         console.error('Произошла ошибка:', response.error);
//       }
//     })
//     .catch(error => {
//       console.error('Произошла ошибка при запросе:', error);
//     });
//     console.log(car)
// })

const showMap = () => {
  const coordinates = [
    car.value.location.coordinates[1],
    car.value.location.coordinates[0]
  ]

  markers.push({
    id: car.value.id,
    number: car.value.number,
    color: car.value.color,
    coordinates: coordinates,
    name: car.value.name,
    carmake_id: car.value.carmake_id
  })
  console.log("marker")
  console.log(markers)
}
// не работает взятие в аренду
const start = async (rent) => {
  try {
    const res = await useRepository.post('rents', rent);
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Полная ошибка:', error);

    if (error.response) {
      console.error('Ответ сервера:', error.response);
      if (error.response.data && error.response.data.error) {
        console.error('Ошибка от сервера:', error.response.data.error);
        return { success: false, error: error.response.data.error };
      } else {
        console.error('Неизвестная ошибка сервера:', error.response.data);
        return { success: false, error: 'Неизвестная ошибка сервера' };
      }
    } else {
      console.error('Ошибка при получении данных:', error.message);
      return { success: false, error: 'Ошибка при получении данных' };
    }
  }
};


const startRent = async () => {
  const userResponse = await useRepository.post('auth/user')

  const rent = {
    user_id: userResponse.data.id,
    car_id: car.value.id,
    event: "start",
    petrol: car.value.rent.petrol,
    kilometer: car.value.rent.kilometer
  }
  const result = await start(rent);

  if (result.success) {
    if("error" in result.data) {
      alert(result.data.error)
    } else {
      alert("Удачной поездки!")

      console.log("Аренда началась!", result.data);
    }
  } else {
    console.error("Произошла ошибка:", result.error);
    alert(result.error);  // Вы можете показать сообщение об ошибке пользователю
  }
}

const endRent = async () => {
  const userResponse = await useRepository.post('auth/user')

  const rent = {
    user_id: userResponse.data.id,
    car_id: car.value.id,
    event: "end",
    petrol: car.value.rent.petrol,
    kilometer: car.value.rent.kilometer
  }
  const result = await start(rent);

  if (result.success) {
    if("error" in result.data) {
      alert(result.data.error)
    } else {
      alert("Поездка окончена!")
      console.log("Аренда окончена !", result.data);
    }
  } else {
    console.error("Произошла ошибка:", result.error);
    alert(result.error);  // Вы можете показать сообщение об ошибке пользователю
  }
}

//   try {
//     const res = await useRepository.post('rents/', rent)
//     return { success: true, data: res.data.data };
//   } catch (error) {
//     console.error('Ошибка при получении данных:', error)
//     return { success: false, error: 'Ошибка при получении данных' }
//   }
// }

onMounted(async() => {
  const response = await fetchCar();
  if (response.success) {
    car.value = response.data
    showMap();
  } else {
    console.error('Произошла ошибка:', response.error);
  }
});

</script>

<template>
  <div class="rent">

    <h3>{{ car.color }} {{ car.carmake_id }} {{ car.name }} номер "{{ car.number }}"</h3>
    <h4> Цена: {{ car.price/100 }} руб/мин</h4>
    <button class="btn secondary-bg " @click="startRent">Начать аренду</button>
    <button class="btn secondary-bg " @click="endRent">Закончить аренду</button>
    
  </div>
<div class="map">

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
      :settings="{ coordinates: marker.coordinates }"
      >
      <div class="marker">
    </div>
    </yandex-map-marker>

  </yandex-map>
</div>



</template>

<style scoped>

button {
  margin-top: 20px;
  display: flex;
  height: 40px;
  width: 200px
}
.rent{
  margin-right: 40px;
  margin-top: 50px;
  display: flex;
    flex-direction: column;
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
  height: 300px;
  width: 300px;
}
.map{
  margin-top: 100px;

}

</style>
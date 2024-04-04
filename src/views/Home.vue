<template>
 <div id="map" style="width: 600px; height: 400px; border: 3px, solid, red;"></div>
</template>
  
  <script>

export default {
  name: 'App',
  mounted() {
    // Создание карты
    ymaps.ready(() => {
      var myMap = new ymaps.Map('map', {
        center: [51.774390, 55.098524],
        zoom: 13
      });
      
      // Добавление маркера
      myMap.geoObjects.add(new ymaps.Placemark([55.751574, 37.573856]));
    });
  }
}

  </script>
  
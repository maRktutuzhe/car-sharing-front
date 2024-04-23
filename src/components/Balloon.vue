<script setup>
  defineProps({
    data: Object,
    visible: Boolean
  });
  const emit = defineEmits(['closeModal'])
  const closeModal = () => {
    emit('closeModal')
}
</script>
<template>
    <div class="marker-popup">
        <p>CarMake: {{ data.carmake_id }}</p>
        <p>Name: {{ data.name }}</p>
        <p>Color: {{ data.color }}</p>
        <p>Number: {{ data.number }}</p>
      <button >Арендовать</button>
      <button @click="closeModal" mode="primary">Закрыть</button>
    </div>
</template>

<style scoped>
  .marker-popup {
    height: 200px;
    width: 200px;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    color: black;
    cursor: pointer;
    font-size: 14px;
    white-space: nowrap;
  }
</style>
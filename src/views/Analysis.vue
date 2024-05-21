<script setup>
import { useRepository } from '@/api/Repository'
import { onMounted, ref } from 'vue';

const clusters = ref({})

const getClusterDescription = (index) => {
    const descriptions = [
        "Нормальные пользователи. В этот кластер попадают пользователи с умеренной активностью. Они совершают некоторое количество поездок, имеют разнообразный километраж, и их баланс находится в норме. У них минимальны аварии и штрафы.",
        "Пользователи с проблемами. В этот кластер включены пользователи, имеющие проблемы с использованием сервиса. Они могут часто попадать в аварии, получать штрафы и иметь негативный баланс. Возможно, они не соблюдают правила дорожного движения или испытывают трудности с оплатой.",
        "Активные пользователи. Этот кластер включает в себя пользователей, которые часто пользуются услугами, совершают много поездок и имеют высокий километраж. У них отсутствуют аварии, штрафы минимальны, а баланс на счете остается положительным.",
        "Пользователи под подозрением. Этот кластер включает в себя пользователей с высоким балансом, но низкой активностью. Они могут редко пользоваться услугами, но при этом иметь крупные штрафы.",
    ];
    return descriptions[index];
}

const getClusterActions = (index) => {
    const actions = [
        [
            "Предложение специальных акций для увеличения активности данной группы.",
            "Регулярные рассылки с информацией о новых акциях и услугах.",
            "Стимулирование повторных поездок с помощью персонализированных предложений."
        ],
        [
            "Проведение обучающих программ по безопасному вождению и правилам использования сервиса.",
            "Предложение скидок на услуги для повышения мотивации соблюдать правила и уменьшения аварийности.",
            "Организация службы поддержки для решения возникающих проблем и консультаций."
        ],
        [
            "Предложение бонусов и скидок для постоянных клиентов.",
            "Рекламные кампании, направленные на увеличение числа поездок.",
            "Поддержание качественного сервиса и удобства для данной аудитории."
        ],
        [
            "Разработка индивидуальных предложений и акций для стимулирования активности в данной группе.",
            "Рассылка персонализированных предложений с учетом предпочтений и потребностей пользователей.",
            "Создание программ лояльности для удержания данной аудитории и мотивации к активному использованию сервиса."
        ],
    ];
    return actions[index];
}

const fetchData = async () => {
    try {
        const res = await useRepository.index('cluster')
        // $clusters.value = res.data;
        return { success: true, data: res.data };
    } catch (error) {
        console.error('Ошибка при получении данных:', error)
        return { success: false, error: 'Ошибка при получении данных' }
    }
}

onMounted(async () => {
    const res = await (fetchData())
    clusters.value = res.data
    console.log(clusters.value)
    const points = clusters.value['data'];
        const balanceVsPenalties = points.map(point => ({ x: point[1], y: point[0] }));
    createChart(document.getElementById('chart1'), balanceVsPenalties, 'Зависимость баланса от штрафов', 'Штрафы', 'Баланс');
})

// Создание графика
const createChart = (context, data, label, xLabel, yLabel) => {
    return new Chart(context, {
        type: 'scatter',
        data: {
            datasets: [{
                label: label,
                data: data,
                backgroundColor: 'blue'
            }]
        },
        options: {
            title: {
                display: true,
                text: label
            },
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: xLabel
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: yLabel
                    }
                }]
            }
        }
    });
}

</script>

<template>
  <div>
  </div>
  <canvas id="chart1"></canvas>
    <div v-for="(cluster, index) in clusters['clusters']" :key="index" class="cluster">
      <h2>Кластер {{ index + 1 }}</h2>
      <p class="cluster-description">{{ getClusterDescription(index) }}</p>
      <div class="user-actions">
        <div class="user-list">
          <table>
            <thead>
              <tr>
                <th>Пользователь</th>
                <th>Баланс</th>
                <th>Количество поездок</th>
                <!-- <th>Аварии</th> -->
                <th>Штрафы</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in cluster" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.data[0] * 1000 }}</td>
                <td>{{ user.data[1] * 10 }}</td>
                <td>{{ user.data[2] * 1000 }}</td>
                <!-- <td>{{ user.data[3] }}</td> -->
              </tr>
            </tbody>
          </table>
        </div>
        <div class="actions">
          <h3>Рекомендуемые меры</h3>
          <ul>
            <li v-for="action in getClusterActions(index)" :key="action">{{ action }}</li>
          </ul>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<style scoped>
.cluster {
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 10px;
  background-color: #f9f9f9;
}

h2 {
  margin-bottom: 10px;
  color: var(--secondary-color);
}

p.cluster-description {
  margin-bottom: 20px;
  color: var(--secondary-color);
}

.user-actions {
  display: flex;
}

.user-list {
  width: 60%;
  margin-right: 20px;
}

.actions {
  width: 40%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #aaaaaa;
  padding: 8px;
  text-align: center;
}

th {
  background-color: var(--th-color);
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
  color: var(--secondary-color);

}
</style>

<template>
  <div style="background: #ececec; padding: 30px">
    <a-card
      v-for="(item, index) in dataFrist"
      :key="index"
      :title="$t('Report.titleTotal')"
      class="SizeCustom"
    >
      <div>
        <a-col :span="8">
          <h1>
            <a-icon type="check-circle" theme="twoTone" />
            {{ $t('Report.titleCheckIn') }}
            {{ item.checkin }}
          </h1>
        </a-col>
        <a-col :span="8">
          <h1>
            <a-icon type="close-circle" theme="twoTone" />
            {{ $t('Report.titleCheckOut') }}
            {{ item.checkout }}
          </h1>
        </a-col>
        <a-col :span="8">
          <h1>
            <a-icon type="clock-circle" theme="twoTone" />
            {{ $t('Report.titleCheckstayt') }}
            {{ item.checkin - item.checkout }}
          </h1>
        </a-col>
      </div>
    </a-card>

    <div
      v-for="(items, index) in dataSecond"
      :key="'index' + index"
      style="background: #ececec"
    >
      <div v-if="$t('Report.titleCard') === 'TH'">
        <a-card :title="items.kioskdisplay" class="SizeCustom">
          <h1>
            <a-col :span="8">
              <a-icon type="check-circle" theme="twoTone" />
              {{ $t('Report.titleCheckIn') }}
              {{ items.checkin }}</a-col
            >
          </h1>
          <h1>
            <a-col :span="8">
              <a-icon type="close-circle" theme="twoTone" />
              {{ $t('Report.titleCheckOut') }}
              {{ items.checkout }}</a-col
            >
          </h1>
          <h1>
            <a-col :span="8">
              <a-icon type="clock-circle" theme="twoTone" />
              {{ $t('Report.titleCheckstayt') }}
              {{ items.checkin - items.checkout }}</a-col
            >
          </h1>
        </a-card>
      </div>
      <div v-else>
        <a-card :title="items.kioskdisplayen" class="SizeCustom">
          <h1>
            <a-col :span="8">
              <a-icon type="check-circle" theme="twoTone" />
              {{ $t('Report.titleCheckIn') }}
              {{ items.checkin }}</a-col
            >
          </h1>
          <h1>
            <a-col :span="8">
              <a-icon type="close-circle" theme="twoTone" />
              {{ $t('Report.titleCheckOut') }}
              {{ items.checkout }}</a-col
            >
          </h1>
          <h1>
            <a-col :span="8">
              <a-icon type="clock-circle" theme="twoTone" />
              {{ $t('Report.titleCheckstayt') }}
              {{ items.checkin - items.checkout }}</a-col
            >
          </h1>
        </a-card>
      </div>
    </div>

    <!-- graph -->

    <div v-if="$t('Report.titleCard') === 'TH'">
      <a-row class="mt-3">
        <a-col :span="14">
          <a-card :title="$t('Report.titlelaste7')">
            <line-chart style="height: 70vh" />
            <hr />
          </a-card>
        </a-col>
        <a-col :span="10">
          <a-card :title="$t('Report.titlechart')" class="ml-3">
            <center>
              <pie-chart style="width: 30vw; height: 70vh" />
              <hr />
            </center>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <div v-else>
      <h1>{{ $t('Report.titleCard') }}</h1>
      <a-row class="mt-3">
        <a-col :span="14" style="font-size: xx-large">
          <a-card :title="$t('Report.titlelaste7')">
            <line-chart :key="componentKey" style="height: 70vh" />
            <hr />
          </a-card>
        </a-col>
        <a-col :span="10">
          <a-card :title="$t('Report.titlechart')" class="ml-3">
            <center>
              <pie-chart
                :key="componentKey"
                style="width: 30vw; height: 70vh"
              />
              <hr />
            </center>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import lineChart from '~/components/report/lineChartTest.vue'
import PieChart from '~/components/report/PieChartTest.vue'
export default defineComponent({
  components: {
    'line-chart': lineChart,
    'pie-chart': PieChart,
  },
  setup(_props, context) {
    const dataFrist = ref([])
    const dataSecond = ref([])
    const componentKey = ref(false)

    const fetch = async () => {
      await context.root.$axios
        .get('/Report/' + 'GetReportdashboardFrist')
        .then(({ data }) => {
          dataFrist.value = data
        })
        .catch()
      await context.root.$axios
        .get('/Report/' + 'GetReportdashboardSecond')
        .then(({ data }) => {
          dataSecond.value = data
        })
        .catch()
    }
    onMounted(() => {
      fetch()
    })

    function forceRerender() {
      componentKey.value = true
    }
    return {
      dataFrist,
      dataSecond,
      forceRerender,
      componentKey,
    }
  },
})
</script>

<style scoped>
.SizeCustom {
  font-size: x-large;
  margin-bottom: 5mm;
}
</style>

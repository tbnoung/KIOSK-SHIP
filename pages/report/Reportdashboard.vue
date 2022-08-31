<template>
  <div style="background: #ececec">
    <a-divider orientation="center">
      <h1 id="headerregister">{{ $t('Report.Dashboard.title') }}+ ข้อมูลเทส</h1>
    </a-divider>

    <a-card
      v-for="(item, index) in dataFrist"
      :key="index"
      :title="$t('Report.titleTotal')"
      class="SizeCustom"
      size="small"
      head-style="font-size: x-large;"
    >
      <div>
        <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
          <h1>
            <a-icon type="check-circle" theme="twoTone" />
            {{ $t('Report.titleCheckIn') }} {{ item.checkin }}
          </h1>
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
          <h1>
            <a-icon type="close-circle" theme="twoTone" />
            {{ $t('Report.titleCheckOut') }} {{ item.checkout }}
          </h1>
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
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
        <a-card
          :title="items.kioskdisplay"
          class="SizeCustom"
          size="small"
          head-style="font-size: x-large;"
        >
          <h1>
            <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
              <a-icon type="check-circle" theme="twoTone" />
              {{ $t('Report.titleCheckIn') }} {{ items.checkin }}
            </a-col>
          </h1>
          <h1>
            <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
              <a-icon type="close-circle" theme="twoTone" />
              {{ $t('Report.titleCheckOut') }} {{ items.checkout }}
            </a-col>
          </h1>
          <h1>
            <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
              <a-icon type="clock-circle" theme="twoTone" />
              {{ $t('Report.titleCheckstayt')
              }}{{ items.checkin - items.checkout }}
            </a-col>
          </h1>
        </a-card>
      </div>
      <div v-else>
        <a-card
          head-style="font-size: x-large;"
          :title="items.kioskdisplayen"
          class="SizeCustom"
          size="small"
        >
          <h1>
            <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
              <a-icon type="check-circle" theme="twoTone" />
              {{ $t('Report.titleCheckIn') }} {{ items.checkin }}
            </a-col>
          </h1>
          <h1>
            <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
              <a-icon type="close-circle" theme="twoTone" />
              {{ $t('Report.titleCheckOut') }} {{ items.checkout }}
            </a-col>
          </h1>
          <h1>
            <a-col :xs="{ span: 24 }" :md="{ span: 8 }">
              <a-icon type="clock-circle" theme="twoTone" />
              {{ $t('Report.titleCheckstayt') }}
              {{ items.checkin - items.checkout }}
            </a-col>
          </h1>
        </a-card>
      </div>
    </div>

    <!-- graph -->

    <div v-if="$t('Report.titleCard') === 'TH'">
      <a-row>
        <a-col class="mt-3" :xs="{ span: 24 }" :lg="{ span: 12 }">
          <a-card
            :title="$t('Report.titlelaste7')"
            head-style="font-size: x-large;"
            class="mb-4"
          >
            <line-chart :height="200" />
          </a-card>
        </a-col>
        <a-col class="mt-3" :xs="{ span: 24 }" :lg="{ span: 12 }">
          <a-card
            head-style="font-size: x-large;"
            :title="$t('Report.titlechart')"
            class="mb-4 ml-5"
          >
            <center>
              <pie-chart :height="200" :width="200" />
            </center>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <div v-else>
      <a-row>
        <a-col
          class="mt-3"
          :xs="{ span: 24 }"
          :lg="{ span: 12 }"
          style="font-size: x-large"
        >
          <a-card :title="$t('Report.titlelaste7')" class="mb-4">
            <line-chart :height="200" />
          </a-card>
        </a-col>
        <a-col class="mt-3" :xs="{ span: 24 }" :lg="{ span: 12 }">
          <a-card :title="$t('Report.titlechart')" class="mb-4 ml-5">
            <center>
              <pie-chart :height="200" :width="200" />
            </center>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, useFetch } from '@nuxtjs/composition-api'
import lineChart from '~/components/report/lineChart.vue'
import PieChart from '~/components/report/PieChart.vue'
export default defineComponent({
  components: {
    'line-chart': lineChart,
    'pie-chart': PieChart,
  },
  setup(_props, context) {
    const dataFrist = ref([])
    const dataSecond = ref([])
    const componentKey = ref(false)

    const { fetch } = useFetch(async () => {
      await context.root.$axios
        .get('/Report/' + 'GetReportdashboardFristNow')
        .then(({ data }) => {
          dataFrist.value = data
        })
        .catch()
      await context.root.$axios
        .get('/Report/' + 'GetReportdashboardSecondNow')
        .then(({ data }) => {
          dataSecond.value = data
        })
        .catch()
    })
    fetch()
    function dateToText(v) {
      return this.$moment(v).format('MM-DD-YYYY HH:ss')
    }

    function forceRerender() {
      componentKey.value = true
    }

    return {
      dataFrist,
      dataSecond,
      forceRerender,
      componentKey,
      dateToText,
    }
  },
})
</script>

<style scoped>
.SizeCustom {
  font-size: large;
  margin-bottom: 5mm;
}
#headerregister {
  font-size: x-large;
}
</style>

<script>
import { Pie } from 'vue-chartjs'
export default {
  extends: Pie,
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      await this.$axios
        .get('/Report/' + 'GetReportdashboardSecond')
        .then(({ data }) => {
          this.renderChart(
            {
              labels: [
                this.$i18n.t('Report.titleENCOA'),
                this.$i18n.t('Report.titleENCOB'),
                this.$i18n.t('Report.titleLOADINGA'),
                this.$i18n.t('Report.titleLOADINGB'),
              ],
              datasets: [
                {
                  data: [
                    data[0].checkin,
                    data[1].checkin,
                    data[2].checkin,
                    data[3].checkin,
                  ],
                  backgroundColor: ['#343a40', '#e77681', '#ffc107', '#fd7e14'],
                  hoverBackgroundColor: [
                    '#343a40',
                    '#e77681',
                    '#ffc107',
                    '#fd7e14',
                  ],
                },
              ],
            },
            {
              responsive: false,
            }
          )
        })
        .catch()
    },
  },
}
</script>

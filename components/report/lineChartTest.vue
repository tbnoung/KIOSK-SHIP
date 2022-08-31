<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const BA = []
      const BB = []
      const LA = []
      const LB = []
      const NBA = []
      const NBB = []
      const NLA = []
      const NLB = []
      await this.$axios
        .get('/Report/' + 'GetReportdashboardlast7days')
        .then(({ data }) => {
          data.forEach((res) => {
            // eslint-disable-next-line array-callback-return
            const aa = res.map((el, i) => {
              if (i === 0) {
                return BA.push(el.checkin)
              }
              if (i === 1) {
                return BB.push(el.checkin)
              }
              if (i === 2) {
                return LA.push(el.checkin)
              }
              if (i === 3) {
                return LB.push(el.checkin)
              }
            })
            return aa
          })
          for (let index = 0; index < 8; index++) {
            NBA.push(BA.pop())
          }
          for (let index = 0; index < 8; index++) {
            NBB.push(BB.pop())
          }
          for (let index = 0; index < 8; index++) {
            NLA.push(LA.pop())
          }
          for (let index = 0; index < 8; index++) {
            NLB.push(LB.pop())
          }
          this.renderChart(
            {
              labels: [
                '8 วันที่แล้ว',
                '7 วันที่แล้ว',
                '6 วันที่แล้ว',
                '5 วันที่แล้ว',
                '4 วันที่แล้ว',
                '3 วันที่แล้ว',
                '2 วันที่แล้ว',
                'วันนี้',
              ],
              datasets: [
                {
                  label: this.$i18n.t('Report.titleENCOA'),
                  borderColor: '#343a40',
                  backgroundColor: '#343a40',
                  fill: false,
                  data: NBA,
                  borderDash: [10, 10],
                },
                {
                  label: this.$i18n.t('Report.titleENCOB'),
                  borderColor: '#e77681',
                  backgroundColor: '#e77681',
                  fill: false,
                  data: NBB,
                  borderDash: [10, 10],
                },
                {
                  label: this.$i18n.t('Report.titleLOADINGA'),
                  borderColor: '#ffc107',
                  backgroundColor: '#ffc107',
                  fill: false,
                  data: NLA,
                  borderDash: [10, 10],
                },
                {
                  label: this.$i18n.t('Report.titleLOADINGB'),
                  borderColor: '#fd7e14',
                  backgroundColor: '#fd7e14',
                  fill: false,
                  data: NLB,
                  borderDash: [10, 10],
                },
              ],
            },
            {
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: true,
                labels: {
                  fontSize: 16,
                  fontFamily: 'Prompt',
                },
              },
              animation: {
                duration: 20,
              },
              scales: {
                yAxes: [
                  {
                    gridLines: {
                      display: true,
                    },
                    ticks: {
                      beginAtZero: true,
                      min: 0,
                      max: 300,
                    },
                  },
                ],
                xAxes: [
                  {
                    gridLines: {
                      display: false,
                    },
                  },
                ],
              },
            }
          )
        })
        .catch()
    },
  },
}
</script>

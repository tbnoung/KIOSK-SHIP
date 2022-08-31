<template>
  <a-row type="flex" justify="center" class="mt-3">
    <a-col :span="24">
      <a-steps
        :current="current"
        type="navigation"
        :style="stepStyle"
        @change="onChange"
      >
        <a-step
          status="process"
          title="ตรวจสอบเลขประจำตัว"
          :disabled="checkQueryId()"
        />
        <a-step
          status="process"
          title="ข้อมูลส่วนตัว"
          :disabled="checkQueryId()"
        />
        <a-step
          status="process"
          title="ข้อมูลการติดต่อ"
          :disabled="checkQueryId()"
        />
        <a-step
          v-if="showConsideration"
          status="process"
          title="ผลการพิจารณา"
        />

        <!-- <a-step title="" description="ตรวจสอบเลขประจำตัว" :disabled="checkQueryId()" />
        <a-step title="" description="ข้อมูลส่วนตัว" :disabled="checkQueryId()" />
        <a-step title="" description="ข้อมูลการติดต่อ" :disabled="checkQueryId()" /> -->
        <!-- <a-step description="Consent Letter" /> -->
        <!-- <a-step v-if="showConsideration" description="ผลการพิจารณา" /> -->
      </a-steps>
    </a-col>
  </a-row>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      stepStyle: {
        boxShadow: '0px -1px 0 0 #e8e8e8 inset',
      },
    }
  },
  computed: {
    getDefaultPreRegister() {
      return this.$store.getters['preRegister/getDefaultPreRegister']
    },
    showConsideration() {
      const checkActionFollow =
        this.getDefaultPreRegister.shipPreregistorFollow.find((element) =>
          [1, 2, 3, 4].includes(element.statusOperationId)
        )
      const checkCurrentAction = [1, 2, 3, 4].includes(
        this.getDefaultPreRegister?.shipStatusOperation?.id
      )
      return checkCurrentAction || checkActionFollow
    },
  },
  methods: {
    onChange(current) {
      const getId = this.$route.query.id || this.$route.params.id
      switch (current) {
        case 0:
          this.$emit('changeSteps', `/ship/pre-register/create?id=${getId}`)
          break
        case 1:
          this.$emit('changeSteps', `/ship/pre-register/${getId}/detail`)
          break
        case 2:
          this.$emit('changeSteps', `/ship/pre-register/${getId}/contact`)
          break
        case 4:
          this.$emit(
            'changeSteps',
            `/ship/pre-register/${getId}/consent-letter`
          )
          break
        case 3:
          this.$emit('changeSteps', `/ship/pre-register/${getId}/consideration`)
          break
        default:
          break
      }
    },
    checkQueryId() {
      const queryId = this.$route.query?.id || false
      const queryParams = this.$route.params?.id || false
      return !(queryId || queryParams)
    },
    checkStepConsent() {
      return this.checkQueryId() || this.checkContent()
    },
    checkContent() {
      const requireField = [
        'address',
        'areaZoneName',
        'citizenId',
        'company',
        // 'detailPreregistor',
        'email',
        // 'employeeApprover',
        // 'emailApprover',
        'firstname',
        'lastname',
        'mobile',
      ]
      const error = [undefined, null, '']
      for (const item of requireField) {
        const check = error.includes(this.getDefaultPreRegister[item])
        if (check) {
          return true
        }
      }
      return false
    },
  },
}
</script>

<template>
  <a-card>
    <a-row type="flex">
      <a-col :span="8" class="pt-2">ยินยอมจัดเก็บข้อมูลส่วนบุคคล</a-col>
      <a-col :span="16">
        <a-row type="flex">
          <a-col :span="14">
            <a-input v-model="messageConsentStatus" disabled></a-input>
          </a-col>
          <a-col :span="10" class="pl-5">
            <a-button type="primary" @click="$emit('consent')"
              >ทำแบบฟอร์ม</a-button
            >
          </a-col>
        </a-row>
      </a-col>
      <a-col class="mt-5">
        <span class="text-red">หมายเหตุ:</span>
      </a-col>
      <a-col class="mt-5 pl-5">
        <a-row>
          <span class="text-red">
            - ผู้ให้ความยินยอมข้อมูลส่วนบุคคลต้องเป็นเจ้าของข้อมูลเท่านั้น</span
          >
        </a-row>
        <!-- <a-row>
          <span class="text-red">
            - กรุณายินยอมจัดเก็บข้อมูลส่วนบุคคลก่อนทำการ submit</span
          >
        </a-row> -->
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  props: {
    consentStatus: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    messageConsentStatus() {
      return this.consentStatus
        ? 'ยินยอมจัดเก็บข้อมูลเรียบร้อย'
        : 'กรุณาทำการยินยอมจัดเก็บข้อมูล'
    },
  },
}
</script>

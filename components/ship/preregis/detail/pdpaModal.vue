<template>
  <a-modal
    v-model="openModal"
    centered
    :closable="false"
    :mask-closable="false"
    class="overflow-modal"
    width="750px"
  >
    <a-row slot="title" type="flex" justify="center"
      >หนังสือให้ความยินยอมในการเก็บใช้เเละเปิดเผยข้อมูลส่วนบุคคล</a-row
    >
    <a-row type="flex" class="fix-content-modal line-content">
      <a-col v-if="isEmployee" :span="24">
        <a-row type="flex" justify="center" style="height: 550px">
          <iframe
            src="https://privacyportal-apac.onetrust.com/ui/#/preferences/multipage/login/bd157c3e-2ed3-422a-9f97-172481e3e3a7"
            width="100%"
            height="calc(100vh - 300px)"
          ></iframe>
        </a-row>
      </a-col>
      <a-col v-else :span="24">
        <a-row type="flex" justify="center" class="text-bold">
          หนังสือให้ความยินยอมในการเก็บ ใช้ และเปิดเผยข้อมูลส่วนบุคคล
        </a-row>
        <a-row type="flex" justify="center" class="text-bold">
          สำหรับผู้มาติดต่อ ผู้ขอเข้าอาคาร สถานที่ปฏิบัติงาน หรือพื้นที่เฉพาะของ
          ปตท.
        </a-row>
        <a-row type="flex" class="text-bold">
          เรียน ผู้มาติดต่อ ผู้ขอเข้าอาคาร สถานที่ปฏิบัติงาน หรือพื้นที่เฉพาะของ
          ปตท.
        </a-row>
        <a-row type="flex" class="indent-1">
          เพื่อปฏิบัติตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 บริษัท
          ปตท. จำกัด (มหาชน) (“ปตท.”) ใคร่ขอความยินยอมจากท่านในการเก็บ ใช้
          และเปิดเผยข้อมูลส่วนบุคคลของท่าน สำหรับวัตถุประสงค์ดังต่อไปนี้
        </a-row>
        <a-row type="flex" class="text-bold indent-1">
          1. ในกรณีที่ท่านต้องการติดต่อ เยี่ยมชม หรือเข้าปฏิบัติงานในทะเล
          หรือที่แท่น PRP-ERP
        </a-row>
        <a-row type="flex" class="indent-2">
          เก็บและใช้ข้อมูลสุขภาพ ความพิการของท่าน
          เพื่อความเหมาะสมในการเข้าพื้นที่
          หรือเพื่อการพิจารณาคุณสมบัติของผู้ปฏิบัติงานในทะเล
          โดยการใช้ข้อมูลทางสุขภาพเพื่อยืนยันว่ามีสุขภาพดีเพียงพอที่จะปฏิบัติงานในทะเลได้
          (Fit for Duty Offshore) รวมถึงการขออนุมัติหรือขออนุญาตปฏิบัติงาน
          หรือการดำเนินการอื่น ๆ ที่แท่น PRP-ERP
        </a-row>
        <a-row type="flex" class="text-bold indent-1">
          2. ในกรณีที่ท่านต้องการติดต่อ หรือเข้าปฏิบัติงาน ในพื้นที่เฉพาะอื่น ๆ
          ของ ปตท.
        </a-row>
        <a-row type="flex" class="indent-2">
          2.1 เก็บและใช้ข้อมูลจำลองลายนิ้วมือ
          ข้อมูลภาพจำลองใบหน้าของท่านเพื่อใช้สำหรับยืนยันตัวตน
          และการรักษาความปลอดภัยภายในบริเวณอาคารหรือสถานที่ของ ปตท.
          โดยการกำหนดสิทธิของบุคคลในการเข้าออกพื้นที่ดังกล่าว
          รวมถึงเปิดเผยข้อมูลดังกล่าวแก่ตัวแทน ผู้รับจ้าง/ผู้รับจ้างช่วง
          และ/หรือผู้ให้บริการสำหรับการดำเนินการดังกล่าว
        </a-row>
        <a-row type="flex" class="indent-2">
          2.2 เก็บและใช้ข้อมูลสุขภาพ เช่น ผลการตรวจสุขภาพ
          ผลการตรวจสารเสพติดในร่างกาย และข้อมูลความพิการของท่าน
          เพื่อการพิจารณาคุณสมบัติประกอบการขอใบอนุญาตเข้าทำงานใน ปตท.
          หรือใบอนุญาตทำงานในพื้นที่เฉพาะ
          และเพื่อเป็นประวัติของผู้เข้าปฏิบัติงานเมื่อเข้าปฏิบัติงานภายในบริเวณอาคาร
          และสถานที่ของ ปตท. รวมถึงเปิดเผยข้อมูลดังกล่าวแก่ตัวแทน
          ผู้รับจ้าง/ผู้รับจ้างช่วง
          และ/หรือผู้ให้บริการสำหรับการดำเนินการดังกล่าว
        </a-row>
        <!-- -----------------------------ข้อที่ 1---------------------------------------------- -->
        <a-row type="flex" class="mt-5 text-bold">
          ข้าพเจ้าได้อ่านและเข้าใจวัตถุประสงค์เกี่ยวกับข้อมูลส่วนบุคคลที่มีความละเอียดอ่อนตามข้อ
          1. รวมทั้งแบบแจ้งเกี่ยวกับข้อมูลส่วนบุคคลของท่าน (Privacy Notice)
          ตามเอกสารแนบอย่างชัดเจนแล้ว จึงแสดงความประสงค์ดังนี้
        </a-row>
        <a-row type="flex" class="pl-10 mt-2">
          <a-radio-group v-model="pdpaStatus" name="radioGroup">
            <a-radio :value="1" class="mb-2">
              ยินยอมให้เก็บและใช้ข้อมูลส่วนบุคคลที่มีความละเอียดอ่อนของข้าพเจ้า
            </a-radio>
            <a-radio :value="2">
              ไม่ยินยอมให้เก็บและใช้ข้อมูลส่วนบุคคลที่มีความละเอียดอ่อนของข้าพเจ้า
              <SharesFormRequiredLabel />
            </a-radio>
          </a-radio-group>
        </a-row>
        <a-row type="flex" class="pl-5">
          <span class="text-red mt-2">
            *หากท่านไม่ให้ความยินยอมหรือถอนความยินยอมในการเก็บและใช้ข้อมูลดังกล่าวข้างต้น
            ท่านอาจไม่ได้รับความสะดวกหรือไม่ได้รับอนุญาตให้เข้า
            หรือปฏิบัติงานในพื้นที่ดังกล่าว
          </span>
        </a-row>
        <!-- -----------------------------ข้อที่ 2---------------------------------------------- -->
        <!-- <a-row type="flex" class="mt-5 text-bold">
          ข้าพเจ้าได้อ่านและเข้าใจวัตถุประสงค์เกี่ยวกับข้อมูลส่วนบุคคลที่มีความละเอียดอ่อนตามข้อ
          2. รวมทั้งแบบแจ้งเกี่ยวกับข้อมูลส่วนบุคคลของท่าน (Privacy Notice)
          ตามเอกสารแนบอย่างชัดเจนแล้ว จึงแสดงความประสงค์ดังนี้
        </a-row>
        <a-row type="flex" class="pl-5"> วัตถุประสงค์ตามข้อ 2.1 </a-row>
        <a-row type="flex" class="pl-10 mt-2">
          <a-radio-group name="radioGroup" :default-value="1">
            <a-radio :value="1" class="mb-2">
              ยินยอมให้เก็บ ใช้
              และเปิดเผยข้อมูลส่วนบุคคลที่มีความละเอียดอ่อนของข้าพเจ้า
            </a-radio>
            <a-radio :value="2">
              ไม่ยินยอมให้เก็บ ใช้
              และเปิดเผยข้อมูลส่วนบุคคลที่มีความละเอียดอ่อนของข้าพเจ้า
              <SharesFormRequiredLabel />
            </a-radio>
          </a-radio-group>
        </a-row>
        <a-row type="flex" class="pl-5">
          <span class="text-red mt-2">
            *หากท่านไม่ให้ความยินยอมหรือถอนความยินยอมในการเก็บ ใช้
            และเปิดเผยข้อมูลดังกล่าวข้างต้น
            ท่านอาจไม่ได้รับความสะดวกหรือไม่ได้รับอนุญาตให้เข้า
            หรือปฏิบัติงานในพื้นที่ดังกล่าว
          </span>
        </a-row>
        <a-row type="flex" class="pl-5"> วัตถุประสงค์ตามข้อ 2.2 </a-row>
        <a-row type="flex" class="pl-10 mt-2">
          <a-radio-group name="radioGroup" :default-value="1">
            <a-radio :value="1" class="mb-2">
              ยินยอมให้เก็บ ใช้
              และเปิดเผยข้อมูลส่วนบุคคลที่มีความละเอียดอ่อนของข้าพเจ้า
            </a-radio>
            <a-radio :value="2">
              ไม่ยินยอมให้เก็บ ใช้
              และเปิดเผยข้อมูลส่วนบุคคลที่มีความละเอียดอ่อนของข้าพเจ้า
              <SharesFormRequiredLabel />
            </a-radio>
          </a-radio-group>
        </a-row>
        <a-row type="flex" class="pl-5">
          <span class="text-red mt-2">
            *หากท่านไม่ให้ความยินยอมหรือถอนความยินยอมในการเก็บ ใช้
            และเปิดเผยข้อมูลดังกล่าวข้างต้น
            ท่านอาจไม่ได้รับความสะดวกหรือไม่ได้รับอนุญาตให้เข้า
            หรือปฏิบัติงานในพื้นที่ดังกล่าว
          </span>
        </a-row> -->
      </a-col>
    </a-row>
    <a-row slot="footer" type="flex" justify="end">
      <a-button type="danger" @click="$emit('close')">{{
        textCancle
      }}</a-button>
      <a-button
        v-if="!isEmployee"
        type="primary"
        class="ml-3"
        @click="confirmModalPDPA"
        >{{ textConfirm }}</a-button
      >
    </a-row>
  </a-modal>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    accesstypepersonId: {
      type: Number,
      default: null,
    },
    consentStatus: {
      type: Boolean,
      default: false,
    },
    textConfirm: {
      type: String,
      default: null,
    },
    textCancle: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      openModal: false,
      pdpaStatus: null,
    }
  },
  computed: {
    isEmployee() {
      return this.accesstypepersonId === 1
    },
  },
  watch: {
    active() {
      this.openModal = this.active
      this.pdpaStatus = this.consentStatus ? 1 : 2
    },
  },
  methods: {
    confirmModalPDPA() {
      const status = this.pdpaStatus === 1
      this.$emit('confirm', status)
    },
  },
}
</script>
<style lang="less" scoped>
.indent-1 {
  text-indent: 25px;
}
.indent-2 {
  text-indent: 50px;
}
.line-content {
  line-height: 26px !important;
}
</style>

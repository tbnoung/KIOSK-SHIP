<template>
  <div v-if="active">
    <a-modal
      v-model="openModal"
      centered
      :closable="false"
      :mask-closable="false"
      class="overflow-modal"
      width="650px"
    >
      <a-row slot="title" type="flex" justify="center">ผู้มาติดต่อ</a-row>
      <a-row type="flex" justify="center" class="fix-content-modal pl-0">
        <a-col :span="20">
          <!--------------------- คำนำหน้า ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">คำนำหน้า</a-col>
            <a-col :span="10">
              <a-input :value="record.titleName" disabled></a-input>
            </a-col>
          </a-row>
          <!--------------------- ชื่อ ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">ชื่อ</a-col>
            <a-col :span="10">
              <a-input :value="record.firstname" disabled></a-input>
            </a-col>
          </a-row>
          <!--------------------- นามสกุล ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">นามสกุล</a-col>
            <a-col :span="10">
              <a-input :value="record.lastname" disabled></a-input>
            </a-col>
          </a-row>
          <!--------------------- เลขบัตรประจำตัวประชาชน ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">เลขบัตรประจำตัวประชาชน</a-col>
            <a-col :span="10">
              <a-input :value="record.citizenId" disabled></a-input>
            </a-col>
          </a-row>
          <!--------------------- เบอร์ติดต่อ ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">เบอร์ติดต่อ</a-col>
            <a-col :span="10">
              <a-input :value="record.mobile" disabled></a-input>
            </a-col>
          </a-row>
          <!--------------------- อีเมล์ ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">อีเมล์</a-col>
            <a-col :span="10">
              <a-input :value="record.email" disabled></a-input>
            </a-col>
          </a-row>
          <!--------------------- ที่อยู่ ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">ที่อยู่</a-col>
            <a-col :span="10">
              <a-input :value="record.address" disabled type="textarea" />
            </a-col>
          </a-row>
          <!--------------------- ตำเเหน่ง ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">ตำเเหน่ง</a-col>
            <a-col :span="10">
              <a-input :value="record.positionName" disabled />
            </a-col>
          </a-row>
          <!--------------------- ประเภทบุคคล ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">ประเภทบุคคล</a-col>
            <a-col :span="10">
              <a-input :value="record.personName" disabled />
            </a-col>
          </a-row>
          <!--------------------- ประเภทบุคคล ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">รูป</a-col>
            <a-col :span="10">
              <img
                v-if="record.image"
                :src="getImage(record.image)"
                alt="avatar"
                class="image"
              />
              <div v-else class="image"></div>
            </a-col>
          </a-row>
          <!--------------------- ประเภทบุคคล ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">หนังสือยินยอม</a-col>
            <a-col :span="10">
              <a-input
                :value="getConsentStatus(record.consentStatus)"
                disabled
              />
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row slot="footer" type="flex" justify="end">
        <a-button type="danger" class="ml-3" @click="$emit('close')">{{
          textCancle
        }}</a-button>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    textCancle: {
      type: String,
      default: null,
    },
    record: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      openModal: this.active,
      baseURLImg: process.env.APP_IMAGE,
    }
  },
  watch: {
    active() {
      this.openModal = this.active
    },
  },
  methods: {
    getConsentStatus(consent) {
      return consent
        ? 'ยินยอมจัดเก็บข้อมูลส่วนบุคคล'
        : 'ยังไม่ยินยอมจัดเก็บข้อมูลส่วนบุคคล'
    },
    getImage(img) {
      return `${this.baseURLImg}${img}`
    },
  },
}
</script>
<style lang="less" scoped>
.image {
  width: 100px;
  height: 100px;
  background-color: grey;
  border-radius: 5px;
}
</style>

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
      <a-row slot="title" type="flex" justify="center"
        >จัดการบัญชีผู้ใช้งาน</a-row
      >
      <a-row type="flex" justify="center" class="fix-content-modal pl-0">
        <a-col :span="20">
          <!--------------------- คำนำหน้า ------------------------------>
          <!-- <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">คำนำหน้า</a-col>
            <a-col :span="10">
              <a-input :value="record.titleName" disabled></a-input>
            </a-col>
          </a-row> -->
          <!--------------------- ชื่อ ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">ชื่อ</a-col>
            <a-col :span="10">
              <a-input :value="propRecord.firstnameTh" disabled></a-input>
            </a-col>
          </a-row>
          <!--------------------- นามสกุล ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">นามสกุล</a-col>
            <a-col :span="10">
              <a-input :value="propRecord.lastnameTh" disabled></a-input>
            </a-col>
          </a-row>
          <!--------------------- เลขบัตรประจำตัวประชาชน ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">เลขบัตรประจำตัวประชาชน</a-col>
            <a-col :span="10">
              <a-input :value="propRecord.citizenId" disabled></a-input>
            </a-col>
          </a-row>
          <!--------------------- บริษัท ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">บริษัท</a-col>
            <a-col :span="10">
              <a-input :value="propRecord.company" disabled></a-input>
            </a-col>
          </a-row>
          <!--------------------- เบอร์ติดต่อ ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">เบอร์ติดต่อ</a-col>
            <a-col :span="10">
              <a-input :value="propRecord.mobile" disabled></a-input>
            </a-col>
          </a-row>
          <!--------------------- อีเมล์ ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">อีเมล์</a-col>
            <a-col :span="10">
              <a-input :value="propRecord.email" disabled></a-input>
            </a-col>
          </a-row>
          <!--------------------- ประเภทบุคคล ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">รูป</a-col>
            <a-col :span="10">
              <div class="image">
                <a-avatar
                  v-if="propRecord.displayImg"
                  :src="propRecord.displayImg"
                  :size="100"
                />
              </div>
            </a-col>
          </a-row>
          <!--------------------- สิทธิ์การใช้งาน ------------------------------>
          <a-row type="flex" justify="center" class="mb-5">
            <a-col :span="10">สิทธิ์การใช้งาน</a-col>
            <a-col :span="10">
              <a-select
                v-model="propRecord.roleId"
                show-search
                :filter-option="$global.filterOption"
                style="width: 100%"
              >
                <a-select-option
                  v-for="(permission, index) in getPermission"
                  :key="index"
                  :value="permission.roleId"
                >
                  {{ permission.text }}
                </a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row slot="footer" type="flex" justify="end">
        <a-button
          type="primary"
          class="ml-3"
          @click="$emit('confirm', propRecord)"
          >{{ textConfirm }}</a-button
        >
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
    textConfirm: {
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
      propRecord: null,
      getPermission: [
        { roleId: 1, text: 'contractor' },
        { roleId: 2, text: 'supervisor' },
        { roleId: 3, text: 'admin' },
        { roleId: 4, text: 'staff' },
      ],
    }
  },
  watch: {
    active() {
      this.propRecord = _.cloneDeep(this.record)
      this.openModal = this.active
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

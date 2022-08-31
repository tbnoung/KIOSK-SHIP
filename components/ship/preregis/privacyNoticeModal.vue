<template>
  <div v-if="active">
    <a-modal
      v-model="openModal"
      centered
      :closable="false"
      :mask-closable="false"
      class="overflow-modal"
      width="850px"
    >
      <a-row slot="title" type="flex" justify="center">Privacy Notice</a-row>
      <a-row type="flex" justify="center" class="fix-content-modal pl-0">
        <a-col :span="20">
          <a-row type="flex">
            <span class="mt-2 mr-5">
              {{ $t('ShipPreregister.label.personalType') }}
              <SharesFormRequiredLabel />
            </span>
            <a-col :span="10">
              <a-select
                v-model="form.personTypeId"
                :placeholder="$t('ShipPreregister.placeholder.select')"
                show-search
                :filter-option="$global.filterOption"
                style="width: 100%"
                @change="selectPersonalType"
              >
                <a-select-option
                  v-for="personalType in getPersonalType"
                  :key="personalType.id"
                  :value="personalType.id"
                >
                  <!-- {{ personalType.nameTh }} -->
                  {{
                    $global.language(personalType.nameTh, personalType.nameEn)
                  }}
                </a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </a-col>
        <a-col
          v-if="showPrivacyNotice"
          :key="updateComponent"
          :span="20"
          class="mt-5"
        >
          <ShipPreregisPrivacyNoticeForEmployee v-if="roleEmployee" />
          <ShipPreregisPrivacyNoticeForVisitor v-else />
        </a-col>
        <a-col v-if="showPrivacyNotice" :span="20" class="mt-5">
          <a-row type="flex">
            <a-checkbox v-model="check">
              คลิกเพื่อยินยอมจัดเก็บข้อมูล
            </a-checkbox>
          </a-row>
        </a-col>
      </a-row>
      <a-row slot="footer" type="flex" justify="end">
        <a-button
          v-if="textConfirm"
          type="primary"
          class="ml-3"
          :disabled="!check"
          @click="$emit('confirm', form)"
          >{{ textConfirm }}</a-button
        >
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
    textConfirm: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      updateComponent: 0,
      openModal: this.active,
      check: false,
      accesstypepersonId: null,
      form: {
        personTypeId: null,
        personName: null,
        accesstypepersonId: null,
        statusPrivacyNotice: this.check,
      },
    }
  },
  computed: {
    roleEmployee() {
      return this.accesstypepersonId === 1
    },
    getPersonalType() {
      return this.$store.getters['personalType/getPersonalData'].filter(
        (element) => element.status === true
      )
    },
    showPrivacyNotice() {
      return this.form.personTypeId
    },
  },
  watch: {
    active() {
      this.openModal = this.active
    },
  },
  methods: {
    selectPersonalType(id) {
      const find = this.getPersonalType.find((element) => element.id === id)
      this.form.personName = find?.nameTh
      this.form.accesstypepersonId = find?.accesstypepersonId
      this.accesstypepersonId = find?.accesstypepersonId
    },
  },
}
</script>
<style lang="less" scoped>
.privacy-notice {
  height: 500px;
  border: 1px solid gray;
}
</style>

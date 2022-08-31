<template>
  <div v-if="openModal">
    <a-modal
      v-model="openModal"
      centered
      :closable="false"
      :mask-closable="false"
      width="750px"
      class="overflow-modal"
    >
      <a-row slot="title" type="flex" justify="center">{{
        propArea.title
      }}</a-row>
      <a-row type="flex" justify="center" class="fix-content-modal">
        <a-col :span="22">
          <a-form-model ref="formArea" :model="shipUserarea" :rules="rules">
            <!-------------------- AREA field -------------------------->
            <a-row type="flex">
              <a-col :span="8" class="pt-2"
                >เลือกโซนพื้นที่เข้า
                <SharesFormRequiredLabel />
              </a-col>
              <a-col :span="16">
                <a-form-model-item prop="zoneName">
                  <a-select
                    v-model="shipUserarea.zoneName"
                    show-search
                    :filter-option="$global.filterOption"
                    :placeholder="$t('ShipPreregister.placeholder.select')"
                    :disabled="!$shipPermission.canEditShip(propsForm, $route)"
                    @change="selectZone"
                  >
                    <a-select-option
                      v-for="zone in getZone"
                      :key="zone.BLDGID"
                      :value="zone.ZONE"
                    >
                      {{ zone.ZONE }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
            </a-row>
            <!-------------------- PLANT field -------------------------->
            <a-row v-if="showFieldPlant" type="flex">
              <a-col :span="8" class="pt-2"
                >เลือกเเพลนพื้นที่เข้า
                <SharesFormRequiredLabel />
              </a-col>
              <a-col :span="16">
                <a-form-model-item prop="plantId">
                  <a-select
                    v-model="shipUserarea.plantId"
                    show-search
                    :filter-option="$global.filterOption"
                    :placeholder="$t('ShipPreregister.placeholder.select')"
                    :disabled="!$shipPermission.canEditShip(propsForm, $route)"
                    @change="selectPlant"
                  >
                    <a-select-option
                      v-for="zone in getPlant"
                      :key="zone.UNITID"
                      :value="zone.UNITID"
                    >
                      {{ zone.UNITNAME }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
            </a-row>
            <!-------------------- AREA field -------------------------->
            <a-row v-if="showFieldArea" type="flex">
              <a-col :span="8" class="pt-2"
                >เลือกบริเวณพื้นที่เข้า
                <SharesFormRequiredLabel />
              </a-col>
              <a-col :span="16">
                <a-form-model-item prop="areaId">
                  <a-select
                    v-model="shipUserarea.areaId"
                    show-search
                    :filter-option="$global.filterOption"
                    :placeholder="$t('ShipPreregister.placeholder.select')"
                    :disabled="!$shipPermission.canEditShip(propsForm, $route)"
                    @change="selectArea"
                  >
                    <a-select-option
                      v-for="area in getArea"
                      :key="area.SUBUNITID"
                      :value="area.SUBUNITID"
                    >
                      {{ area.SUBUNITNAME }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
        </a-col>
      </a-row>
      <a-row slot="footer" type="flex" justify="end">
        <a-button type="danger" @click="$emit('close')">{{
          textCancle
        }}</a-button>
        <a-button type="primary" class="ml-3" @click="confirmModal">{{
          textConfirm
        }}</a-button>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
import rulesValidateForm from '@/mixins/ship/rules'
export default {
  mixins: [rulesValidateForm],
  props: {
    propArea: {
      type: Object,
      default: null,
    },
    active: {
      type: Boolean,
      default: false,
    },
    propsForm: {
      type: Object,
      default: null,
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
      shipUserarea: this.getDefaultShipUserArea(),
    }
  },
  computed: {
    getZone() {
      return this.$store.getters['ship/mapInterface/getZone']
    },
    getPlant() {
      return this.$store.getters['ship/mapInterface/getPlant']
    },
    getArea() {
      return this.$store.getters['ship/mapInterface/getArea']
    },
    showFieldPlant() {
      return ['พื้นที่กระบวนการผลิต', 'พื้นที่ควบคุมพิเศษ'].includes(
        this.shipUserarea.zoneName
      )
    },
    showFieldArea() {
      return ['พื้นที่กระบวนการผลิต'].includes(this.shipUserarea.zoneName)
    },
  },
  watch: {
    active() {
      this.openModal = this.active
      if (this.propArea.action === 'add') {
        this.shipUserarea = this.getDefaultShipUserArea()
      } else {
        this.shipUserarea = this.propArea.record
      }
    },
  },
  methods: {
    getDefaultShipUserArea() {
      return {
        id: 0,
        preregistorId: this.propsForm.id,
        zoneName: null,
        plantId: null,
        plantName: null,
        areaId: null,
        areaName: null,
        buildingorequId: null,
        buildingorequName: null,
      }
    },
    async selectZone(select) {
      const search = ['พื้นที่กระบวนการผลิต', 'พื้นที่ควบคุมพิเศษ'].includes(
        select
      )
      this.shipUserarea.plantId = null
      this.shipUserarea.areaId = null
      if (search) {
        const payload = [
          {
            layeR_NAME: 'PLANT',
            searcH_COLUMN: [
              {
                coL_NAME: 'ZONE',
                coL_REGEX: '=',
                coL_VALUE: select,
              },
            ],
          },
        ]
        await this.$store.dispatch('ship/mapInterface/getPlant', payload)
      } else {
        this.$store.commit('ship/mapInterface/SET_PLANT', [])
        this.$store.commit('ship/mapInterface/SET_AREA', [])
      }
    },
    async selectPlant(select) {
      const find = this.getPlant.find((element) => element.UNITID === select)
      this.shipUserarea.plantName = find?.UNITNAME
      const payload = [
        {
          layeR_NAME: 'AREA',
          searcH_COLUMN: [
            {
              coL_NAME: 'UNITID',
              coL_REGEX: '=',
              coL_VALUE: select,
            },
          ],
        },
      ]
      await this.$store.dispatch('ship/mapInterface/getArea', payload)
    },
    selectArea(select) {
      const find = this.getArea.find((element) => element.SUBUNITID === select)
      this.shipUserarea.areaName = find?.SUBUNITNAME
    },
    confirmModal() {
      this.$refs.formArea.validate((valid) => {
        if (valid) {
          this.$emit('comfirm', this.shipUserarea)
        }
      })
    },
  },
}
</script>

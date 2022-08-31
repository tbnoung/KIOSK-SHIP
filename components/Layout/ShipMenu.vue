<template>
  <div :style="{ overflow: 'auto', height: '88vh' }">
    <div v-for="item in shipMenu" :key="item.key">
      <a-row type="flex" justify="center" align="middle" class="title-menu">
        <a-icon :type="item.icon" />
        <span v-if="!collapsed">{{ item.text }}</span>
      </a-row>
      <a-menu
        v-for="(child, index) in item.child"
        :key="index"
        :selected-keys="selectedKeys"
        mode="inline"
      >
        <a-menu-item :key="child.key" @click="onSelect($event, child.path)">
          <a-icon :type="child.icon" />
          <span>{{ child.text }}</span>
        </a-menu-item>
      </a-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedKeys: [],
      shipMenu: [
        {
          key: 1,
          text: 'Transection',
          icon: 'desktop',
          child: [
            {
              key: 11,
              text: 'รายการลงทะเบียน',
              icon: 'desktop',
              path: '/ship/pre-register',
            },
            {
              key: 12,
              text: 'ตรวจสอบอายุการปฏิบัติงาน',
              icon: 'desktop',
              path: '/ship/work-experience',
            },
            {
              key: 13,
              text: 'Invitation',
              icon: 'desktop',
              path: '/ship/Invitation',
            },
            {
              key: 14,
              text: 'รายชื่อผู้เข้าพบประจำวัน',
              icon: 'desktop',
              path: '/ship/visitor',
            },
          ],
        },
        {
          key: 2,
          text: 'Master',
          icon: 'desktop',
          child: [
            {
              key: 21,
              text: 'ข้อมูลผู้ลงทะเบียน',
              icon: 'desktop',
              path: '/ship/contact-list',
            },
            {
              key: 22,
              text: 'พนักงาน',
              icon: 'desktop',
              path: '/ship/employee-list',
            },
            {
              key: 23,
              text: 'Blacklist',
              icon: 'desktop',
              path: '/ship/backlist',
            },
            {
              key: 24,
              text: 'ประเภทบุคคล',
              icon: 'desktop',
              path: '/ShipTest/Master/personalType',
            },
            {
              key: 25,
              text: 'ประเภทพื้นที่',
              icon: 'desktop',
              path: '/ShipTest/Master/AreaZones',
            },
            {
              key: 26,
              text: 'ช่วงเวลาที่อนุญาติให้ปฏิบัติงาน',
              icon: 'desktop',
              path: '/ShipTest/Master/TimeWorks',
            },
            {
              key: 27,
              text: 'วัตถุประสงค์ในการเข้าพื้นที่',
              icon: 'desktop',
              path: '/ShipTest/Master/ObjectioveWorks',
            },
          ],
        },
        {
          key: 3,
          text: 'Setting',
          icon: 'desktop',
          child: [
            {
              key: 31,
              text: 'จัดการบัญชีใช้งาน',
              icon: 'desktop',
              path: '/ship/user-management',
            },
            {
              key: 32,
              text: 'จัดการสิทธิ์',
              icon: 'desktop',
              path: '/ship/permission-management',
            },
            {
              key: 33,
              text: 'COVID-19 Management',
              icon: 'desktop',
              path: '/ShipTest/Master/Covids',
            },
            {
              key: 34,
              text: 'ReauireField',
              icon: 'desktop',
              path: '/ShipTest/Master/RequireFields',
            },
            {
              key: 35,
              text: 'E-mail',
              icon: 'desktop',
              path: '/ship/email-management',
            },
          ],
        },
      ],
    }
  },
  created() {
    this.selectedKeys.push(this.setDefaultSelectedKey())
  },
  methods: {
    setDefaultSelectedKey() {
      const { fullPath } = this.$route
      for (const item of this.shipMenu) {
        for (const child of item.child) {
          if (child.path === fullPath) {
            this.selectedKeys.push(child.key)
            return child.key
          }
        }
      }
    },
    onSelect(e, path) {
      this.selectedKeys = e.keyPath
      this.$router.push({ path })
    },
  },
}
</script>
<style lang="less" scoped>
.title-menu {
  height: 40px;
  background-color: gray;
  margin: 10px;
  border-radius: 10px;
}
</style>

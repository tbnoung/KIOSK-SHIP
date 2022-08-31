<template>
  <div>
    <a-row type="flex">กรอกเพื่อทำการค้นหา </a-row>
    <!-- ----------------MOC No----------------------------- -->
    <a-row type="flex" class="mt-5">
      <a-col :span="8" class="pt-1">
        <a-row type="flex" justify="center"> MOC No. </a-row>
      </a-col>
      <a-col :span="16">
        <a-input v-model="mocId" />
      </a-col>
    </a-row>
    <!-- ----------------ชื่องาน ----------------------------- -->
    <a-row type="flex" class="mt-5">
      <a-col :span="8" class="pt-1">
        <a-row type="flex" justify="center"> ชื่องาน </a-row>
      </a-col>
      <a-col :span="16">
        <a-input v-model="workName" />
      </a-col>
    </a-row>
    <!-- ----------------ชื่อ - นามสกุล ----------------------------- -->
    <a-row type="flex" class="mt-5">
      <a-col :span="8" class="pt-1">
        <a-row type="flex" justify="center"> ชื่อ - นามสกุล </a-row>
      </a-col>
      <a-col :span="16">
        <a-input v-model="fullName" />
      </a-col>
    </a-row>
    <!-- ----------------สถานะ ----------------------------- -->
    <a-row type="flex" class="mt-5">
      <a-col :span="8" class="pt-1">
        <a-row type="flex" justify="center"> รายชื่อผู้รับผิดชอบ </a-row>
      </a-col>
      <a-col :span="16">
        <a-input v-model="status" />
      </a-col>
    </a-row>
    <!-- ----------------ผู้รับผิดชอบ ----------------------------- -->
    <a-row type="flex" class="mt-5">
      <a-col :span="8" class="pt-1">
        <a-row type="flex" justify="center"> สถานะ </a-row>
      </a-col>
      <a-col :span="16">
        <a-input v-model="responsible" />
      </a-col>
    </a-row>
    <!-- ----------------Button Search ----------------------------- -->
    <a-row type="flex" justify="center" class="mt-5">
      <a-button type="primary" class="mr-5">ค้นหา</a-button>
      <a-button class="btn-yellow">Reset</a-button>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mocId: '',
      workName: '',
      fullName: '',
      status: '',
      responsible: '',
    }
  },
}
</script>

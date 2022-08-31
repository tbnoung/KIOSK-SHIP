<template>
  <div>
    <a-row type="flex" justify="center">E-Mail </a-row>
    <a-row class="mt-5">กรอกเพื่อทำการค้นหา</a-row>
    <a-row type="flex" :gutter="[20, 0]" class="mt-5">
      <a-col :span="5" class="text-center pt-1">
        <span>E-mail</span>
      </a-col>
      <a-col :span="7">
        <a-input placeholder="search text" />
      </a-col>
    </a-row>
    <a-row type="flex" justify="center" class="mt-5">
      <a-button class="mr-3" type="primary">ค้นหา</a-button>
      <a-button class="btn-yellow">Reset</a-button>
    </a-row>
  </div>
</template>

<script>
export default {}
</script>

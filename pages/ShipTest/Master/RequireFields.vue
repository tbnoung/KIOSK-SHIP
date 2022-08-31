import axios from 'axios';
<template>
  <div>
    <div style="margin-bottom: 25px">
      <NuxtLink class="index_current_2jw3G" to="/"
        ><a-icon type="home" /> Home</NuxtLink
      >
      <span>
        <span class="index_arrow_AzRHV"></span>
        <strong class="index_current_2jw3G"> Mock </strong>
      </span>
    </div>
    <a-card>
      <ShipTableRequireFields />
    </a-card>
  </div>
</template>

<script>
export default {
  // middleware: 'isdev',
}
</script>

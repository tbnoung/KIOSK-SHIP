<template>
  <Initialize>
    <a-spin :spinning="getLoader">
      <a-layout class="min-h-screen">
        <LayoutHeader />
        <a-layout-content class="flex justify-center">
          <a-row
            type="flex"
            justify="center"
            class="mb-5"
            style="
              background: #ececec;
              padding: 15px;
              height: calc(100vh - 60px);
              overflow: auto;
              position: fixed;
              width: 100vw;
            "
          >
            <a-col :span="16">
              <Nuxt />
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-spin>
  </Initialize>
</template>

<script>
export default {
  computed: {
    getLoader() {
      return this.$store.getters['global/getLoader']
    },
  },
}
</script>

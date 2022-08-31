<template>
  <a-row type="flex" justify="center" align="middle" style="height: 100vh">
    <a-col :span="24">
      <a-row type="flex" justify="center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="90"
          height="90"
          fill="#DBE1EC"
          viewBox="0 0 48 48"
          class="inline-block"
        >
          <path
            d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
          />
        </svg>
      </a-row>
      <a-row type="flex" justify="center">
        <div class="mt-4 mb-2 text-2xl text-via-denim">{{ error.message }}</div>
      </a-row>
      <a-row type="flex" justify="center">
        <p
          v-if="error.statusCode === 404"
          class="mb-3 leading-snug text-slate-80"
        >
          <NuxtLink class="error-link" to="/">
            {{ $t('pages.error.backToHomepage') }}
          </NuxtLink>
        </p>
        <p v-else class="mb-3 leading-snug text-slate-80">
          An error occurred while rendering the page. Check developer tools
          console for details.
        </p>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>

<template>
  <div>
    <!-- <div class="mr-4">
      <LayoutTopbarFavPages />
    </div>
    <div class="mr-auto">
      <LayoutTopbarSearch />
    </div> -->
    <!-- <div class="mr-4 d-none d-md-block">
      <LayoutTopbarIssuesHistory />
    </div>
    <div class="mb-0 mr-auto d-xl-block d-none">
      <LayoutTopbarProjectManagement />
    </div> -->
    <div id="headerSignInLanguage">
      <LayoutTopbarLanguageSwitcher />
    </div>
    <!-- <div class="mr-4 d-none d-sm-block">
      <LayoutTopbarActions />
    </div> -->
    <div>
      <LayoutTopbarUserMenu />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>
<style scoped>
@media (max-width: 319px) {
  #headerSignInLanguage {
    display: none;
  }
}
</style>

<template>
  <Initialize>
    <a-spin :spinning="getLoader" class="bg-img">
      <div class="spin-content">
        <a-layout class="min-h-screen">
          <LayoutHeader class="w-full mb-20" />
          <a-layout-content>
            <div style="height: 70vh">
              <a-row
                style="height: 100%"
                type="flex"
                align="middle"
                justify="center"
              >
                <Nuxt />
              </a-row>
            </div>
          </a-layout-content>
          <a-layout-footer
            class="
              flex flex-col
              items-center
              justify-center
              pt-12
              pb-12
              mt-auto
            "
          >
            <!-- <ul class="p-0 mb-0 list-none">
              <li class="inline-block mx-2 my-1">
                <router-link to="/login" class="kit__utils__link font-size-16">
                  {{ $t('footer.home') }}
                </router-link>
                <a href="javascript: void(0);">{{ $t('footer.home') }}</a>
              </li>
              <li class="inline-block mx-2 my-1">
                <a href="javascript: void(0);">{{ $t('footer.aboutUs') }}</a>
              </li>
              <li class="inline-block mx-2 my-1">
                <a href="javascript: void(0);">{{ $t('footer.services') }}</a>
              </li>
              <li class="inline-block mx-2 my-1">
                <a href="javascript: void(0);">{{ $t('footer.products') }}</a>
              </li>
              <li class="inline-block mx-2 my-1">
                <a href="javascript: void(0);">{{ $t('footer.contacts') }}</a>
              </li>
            </ul> -->
            <div class="text-center text-white">
              Copyright © 2021-2025 PTT Digital Solutions
              <!-- |
              <a
                href="https://www.pttdigital.com/home/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ $t('footer.privacyPolicy') }}
              </a> -->
            </div>
          </a-layout-footer>
        </a-layout>
      </div>
    </a-spin>
  </Initialize>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useStore,
} from '@nuxtjs/composition-api'
import { find } from 'lodash'

export default defineComponent({
  setup(_props, context) {
    const Store = useStore()
    const i18n = context.root.$i18n
    const locales = ref(i18n.locales)
    const currentLocale = computed(() => {
      return find(locales.value, (l: any) => l.code === i18n.locale)
    })

    return {
      getLoader: computed(() => Store.getters['global/getLoader']),
      currentLocale,
    }
  },
})
</script>

<style lang="less" scoped>
.bg-img {
  background-image: url('@/static/S__48447576.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

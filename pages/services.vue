<template>
  <div class="w-full max-w-3xl">
    <!-- <h3><span>{{ $t('user.register.register') }}</span></h3> -->
    <div class="flex justify-center">
      <img
        slot="cover"
        class="mb-12 background-size: auto"
        alt="example"
        src="kronos-blue.png"
      />
    </div>
    <a-card
      :bordered="false"
      :title="$t('services.title')"
      class="text-3xl text-center"
      size="default"
    ></a-card>
    <!-- <div style="background-color: #ececec; padding: 20px"> -->
    <div>
      <a-row :gutter="16">
        <!-- <a-col :span="12">
          <div>
            <nuxt-link to="/pre-register">
              <a-card hoverable>
                <img slot="cover" alt="example" src="Pr-logo.jpg" />
                <a-card-meta title="ENCO - PRE REGISTER">
                  <template slot="description">
                    {{ $t('services.pr') }}
                  </template>
                </a-card-meta>
              </a-card></nuxt-link
            >
          </div>
        </a-col> -->
        <!-- <a-col :span="12"> -->
        <a-col :span="12" :offset="6">
          <div style="background-color: #ececec; padding: 20px">
            <nuxt-link to="/work-permit">
              <a-card hoverable>
                <img slot="cover" alt="example" src="Wp-logo.jpg" />
                <a-card-meta title="WORK PERMIT - DATA CENTER">
                  <template slot="description">
                    {{ $t('services.wp') }}
                  </template>
                </a-card-meta>
              </a-card></nuxt-link
            >
          </div>
        </a-col>
      </a-row>
      <!-- <a-row :gutter="16">
        <a-col :span="8">
          <a-card hoverable>
            <img slot="cover" alt="example" src="AppSlot1.jpg" />
            <a-card-meta title="APP SLOT">
              <template slot="description"> - </template>
            </a-card-meta>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card hoverable>
            <img slot="cover" alt="example" src="AppSlot2.jpg" />
            <a-card-meta title="APP SLOT">
              <template slot="description"> - </template>
            </a-card-meta>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card hoverable>
            <img slot="cover" alt="example" src="AppSlot3.jpg" />
            <a-card-meta title="APP SLOT">
              <template slot="description"> - </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import { find } from 'lodash'

export default defineComponent({
  layout: 'auth',
  auth: false,

  setup(_props, context) {
    const i18n = context.root.$i18n
    const locales = ref(i18n.locales)
    const currentLocale = computed(() => {
      return find(
        locales.value,
        (l: any) => (l.code ? l.code : '') === i18n.locale
      )
    })

    return {
      currentLocale,
    }
  },
})
</script>

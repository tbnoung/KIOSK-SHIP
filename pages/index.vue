<template>
  <div class="bg-white">
    <div>
      <a-row class="flex justify-center min-h-full text-center">
        <a-col>
          <!-- <img alt="example" src="kronos-blue.png" /> -->
          <!-- <div class="flex justify-center mt-10">
            <img alt="example" src="kronos-blue.png" />
          </div> -->
          <!-- <div id="typed-strings">
            <p>Typed.js is a <strong>JavaScript</strong> library.</p>
            <p>It <em>typed</em> out sentences.</p>
          </div>
          <span id="typed"></span> -->
          <!-- <h1 id="typed" class="title"></h1>
          <div class="mb-10">
            {{ currentTime }}
          </div> -->
          <!-- <Logo /> -->
        </a-col>
      </a-row>
    </div>
    <!-- <div
      class="
        flex
        items-center
        justify-center
        min-h-screen
        mx-auto
        my-0
        text-center
      "
    >
      <div>
        <Logo />
        <h1 class="title">KRONOS : VISITOR MANAGEMENT PLATFORM</h1>
        <div class="mt-4">
          {{ currentTime }}
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import { find } from 'lodash'
import moment from 'moment'
import Typed from 'typed.js'

export default defineComponent({
  setup() {
    // Hook
    const router = useRouter()
    router.push('/ship/pre-register')
    const {
      app: { i18n },
    } = useContext()

    // const typed = new Typed('.bg-title', {
    //   strings: ['KRONOS : VISITOR MANAGEMENT PLATFORM'],
    //   typeSpeed: 80,
    //   loop: true,
    //   smartBackspace: true,
    // })
    // const typed = new Typed('#typed', {
    //   strings: ['KRONOS : VISITOR MANAGEMENT PLATFORM'],
    //   typeSpeed: 80,
    //   loop: true,
    //   smartBackspace: true,
    // })
    const typed = ref()
    const currentTime = ref(String)
    // Ref
    const locales = ref(i18n.locales)

    // Computed
    const currentLocale = computed(() => {
      return find(locales.value, (l) => {
        const code = typeof l === 'object' ? l.code : l
        return code === i18n.locale
      })
    })

    function updateTime() {
      currentTime.value = moment().format('Do MMMM YYYY, h:mm:ss a')
    }

    onMounted(() => {
      setInterval(updateTime, 1000)
      typed.value = new Typed('#typed', {
        strings: ['KRONOS : VISITOR MANAGEMENT PLATFORM'],
        typeSpeed: 60,
        backSpeed: 60,
        loop: true,
        smartBackspace: true,
        cursorChar: '_',
      })
    })

    return {
      updateTime,
      currentTime,
      locales,
      currentLocale,
    }
  },
})
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 3vw;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

<template>
  <div>
    <a-dropdown
      v-if="$auth.loggedIn"
      :trigger="['click']"
      placement="bottomLeft"
      @visibleChange="addCount"
    >
      <div>
        <a-badge :count="count"> <a-avatar :src="user.displayImg" /> </a-badge>
      </div>
      <a-menu slot="overlay">
        <a-menu-item>
          <div>
            <strong
              >{{ user.hello_display || $t('topBar.profileMenu.hello') }},
              {{ user.displayName || user.username }}</strong
            >
          </div>
          <!-- <div>
            <strong class="mr-1"
              >{{ $t('topBar.profileMenu.billingPlan') }}:</strong
            >
            Professional
          </div> -->
          <div>
            <strong class="mr-1">{{ $t('topBar.profileMenu.role') }}:</strong>
            {{ user.permissions.name || '—' }}
          </div>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item>
          <a href="javascript: void(0);" @click="showProfile">
            <a-icon type="user" />
            {{ $t('topBar.profileMenu.editProfile') }}
          </a>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item>
          <a href="javascript: void(0);" @click="handleLogout">
            <a-icon type="logout" />
            {{ $t('topBar.profileMenu.logout') }}
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <template v-else>
      <span id="headerSignIn">{{ $t('topBar.dontHaveAccount') }}</span>
      <nuxt-link id="headerFontSize" to="/register">{{
        $t('topBar.register')
      }}</nuxt-link>
    </template>
    <validation-observer
      ref="inputForm"
      v-slot="{ handleSubmit }"
      slim
      class="overflow-modal"
    >
      <a-modal
        :visible="showPopup"
        :closable="false"
        :mask-closable="false"
        :confirm-loading="isLoading"
        :width="800"
      >
        <template slot="footer">
          <a-button type="primary" @click="handleSubmit(update)">
            {{ $t('UserMenu.btnUpdated') }}
          </a-button>
          <a-button type="danger" @click="cancel">
            {{ $t('UserMenu.btnCancel') }}
          </a-button>
        </template>
        <div class="fix-content-modal">
          <a-form :form="form" @submit.prevent="handleSubmit(onSubmit)">
            <a-row :gutter="24">
              <a-col :md="{ span: 24 }" :lg="{ span: 24 }">
                <a-card hoverable style="width: 100%">
                  <!-- <img
                    slot="cover"
                    alt="example"
                    :src="
                      user
                        ? user.displayImg
                        : 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                    "
                  /> -->
                  <div v-if="user">
                    <center>
                      <a-avatar
                        shape="square"
                        :src="user.displayImg || imageUrl"
                        :size="300"
                        alt="รูปภาพ"
                      />
                    </center>
                  </div>
                  <!-- <div v-else>
                    <img slot="cover" alt="example" :src="imageUrl" />
                  </div> -->

                  <!-- <img
                    v-if="user.displayImg"
                    slot="cover"
                    alt="example"
                    :src="imageUrl ? imageUrl : user.displayImg"
                  />
                  <img
                    v-else-if="imageUrl"
                    slot="cover"
                    alt="example"
                    :src="imageUrl"
                  /> -->
                  <a-card-meta :title="$t('UserMenu.LogoPorfile')">
                    <template slot="description">
                      <a-upload-dragger
                        list-type="picture"
                        :multiple="false"
                        :file-list="fileLists"
                        :before-upload="beforeUpload"
                        :remove="handleRemove"
                        action="http://vms-poc.pttdigital.com/dev_api/"
                        @change="handleChange"
                      >
                        <p class="ant-upload-drag-icon">
                          <a-icon type="inbox" />
                        </p>
                        <p class="ant-upload-text">
                          {{ $t('UserMenu.PicUploadTile') }}
                        </p>
                        <p class="ant-upload-hint">
                          {{ $t('UserMenu.PicUploadSubTile') }}
                        </p>
                      </a-upload-dragger>
                    </template>
                  </a-card-meta>
                </a-card>
              </a-col>
              <a-col :md="{ span: 24 }" :lg="{ span: 24 }">
                <a-card :title="$t('UserMenu.profile')" :bordered="false">
                  <a-collapse>
                    <a-collapse-panel
                      :header="$t('UserMenu.Personal')"
                      class="header-collapse"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('profile.firstname_th')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('profile.firstname_th')"
                          required
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.firstnameTh"
                            :placeholder="$t('profile.firstname_th')"
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('profile.lastname_th')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('profile.lastname_th')"
                          required
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.lastnameTh"
                            :placeholder="$t('profile.lastname_th')"
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('profile.firstname_en')"
                        rules="required|alpha"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('profile.firstname_en')"
                          required
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.firstnameEn"
                            :placeholder="$t('profile.firstname_en')"
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('profile.lastname_en')"
                        rules="required|alpha"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('profile.lastname_en')"
                          required
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.lastnameEn"
                            :placeholder="$t('profile.lastname_en')"
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('profile.email')"
                        rules="required|email"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('profile.email')"
                          required
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.email"
                            :placeholder="$t('profile.email')"
                            disabled
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('profile.mobile')"
                        rules="required|numeric|length:10"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('profile.mobile')"
                          required
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.mobile"
                            :placeholder="$t('profile.mobile')"
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('profile.company')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('profile.company')"
                          required
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.company"
                            :placeholder="$t('profile.company')"
                          />
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        :name="$t('profile.displayName')"
                        rules="required"
                      >
                        <a-form-item
                          :validate-status="errors[0] ? 'error' : null"
                          :help="errors[0]"
                          :label="$t('profile.displayName')"
                          required
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.displayName"
                            :placeholder="$t('profile.displayName')"
                          />
                        </a-form-item>
                      </validation-provider>
                    </a-collapse-panel>
                  </a-collapse>
                  <a-collapse class="mt-4">
                    <a-collapse-panel
                      :header="$t('UserMenu.ComfirmPersonal')"
                      class="header-collapse"
                    >
                      <validation-provider
                        v-slot="{ errors, validated }"
                        :name="$t('profile.citizen')"
                        :rules="{ required: isRequired, citizenId: true }"
                      >
                        <a-form-item
                          :validate-status="
                            errors[0] ? 'error' : validated ? 'success' : null
                          "
                          :label="$t('profile.citizen')"
                          :help="errors[0]"
                          has-feedback
                          class="mb-3"
                        >
                          <a-input
                            v-model="form.citizenId"
                            type="text"
                            :placeholder="$t('profile.citizen')"
                            allow-clear
                          ></a-input>
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors, validated }"
                        :name="$t('profile.passport')"
                        :rules="{ required: isRequired, passport: true }"
                      >
                        <a-form-item
                          :validate-status="
                            errors[0] ? 'error' : validated ? 'success' : null
                          "
                          :help="errors[0]"
                          has-feedback
                          class="mb-3"
                          :label="$t('profile.passport')"
                        >
                          <a-input
                            v-model="form.passportNo"
                            type="text"
                            :placeholder="$t('profile.passport')"
                            allow-clear
                          ></a-input>
                        </a-form-item>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors, validated }"
                        :name="$t('profile.personalNo')"
                        :rules="{ required: isRequired, personal: true }"
                      >
                        <a-form-item
                          :validate-status="
                            errors[0] ? 'error' : validated ? 'success' : null
                          "
                          :help="errors[0]"
                          has-feedback
                          class="mb-3"
                          :label="$t('profile.personalNo')"
                        >
                          <a-input
                            v-model="form.personalNo"
                            type="text"
                            :placeholder="$t('profile.personalNo')"
                            allow-clear
                          ></a-input>
                        </a-form-item>
                      </validation-provider>
                    </a-collapse-panel>
                  </a-collapse>
                </a-card>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-modal>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  reactive,
  onMounted,
  watch,
} from '@nuxtjs/composition-api'

interface MyForm {
  displayName: string | null
  displayImg: string | null
  firstnameTh: string | null
  lastnameTh: string | null
  firstnameEn: string | null
  lastnameEn: string | null
  email: string | null
  mobile: string | null
  citizenId: string | null
  passportNo: string | null
  // drivingNo: string | null
  personalNo: string | null
  company: string | null
}

interface AccountForm {
  accountType: string | null
  accountTypeId: number | null
  banned: boolean | null
  bannedBy: string | null
  bannedDate: Date | null
  citizenId: string | null
  createdAt: Date | null
  createdBy: string | null
  deleteRemark: string | null
  deletedAt: Date | null
  deletedBy: string | null
  displayImg: string | null
  displayName: string | null
  // drivingNo: string | null
  email: string | null
  emailAccount: string | null
  firstnameEn: string | null
  firstnameTh: string | null
  id: number | null
  lastedLogin: Date | null
  lastnameEn: string | null
  lastnameTh: string | null
  mobile: string | null
  company: string | null
  passportNo: string | null
  personalNo: string | null
  profileId: number | null
  pwd: string | null
  resetPwdDate: Date | null
  resetPwdToken: string | null
  updatedAt: Date | null
  updatedBy: string | number
  username: string | number
  verifyAccount: boolean | null
  verifyToken: string | null
  vip: boolean | null
  vipBy: string | null
  vipDate: Date | null
}


export default defineComponent({
  setup(_props, context) {
    // Hook
    const {
      app: { router },
      $message,
      $auth,
    } = useContext()
    const showPopup = ref(false)
    const isLoading = ref(false)
    const loading = ref(false)
    const imageUrl = ref('')
    const labelCol = ref({ span: 4 })
    const wrapperCol = ref({ span: 14 })
    // Ref
    const count = ref(0)
    const data = ref<AccountForm>()
    const form = reactive<MyForm>({
      displayName: null,
      displayImg: null,
      firstnameTh: null,
      lastnameTh: null,
      firstnameEn: null,
      lastnameEn: null,
      email: null,
      mobile: null,
      citizenId: null,
      passportNo: null,
      // drivingNo: null,
      personalNo: null,
      company: null,
    })

    // Computed
    const user = computed(() => {
      const { user } = $auth
      // imageUrl.value = user.displayImg
      return user
    })

    // Method
    function addCount() {
      count.value = 0
    }
    function handleLogout() {
      router?.push('/logout')
    }

    function showProfile() {
      showPopup.value = true
      isLoading.value = false
      // console.log('user', user.value)
    }

    function update() {
      isLoading.value = true
      updateProfile()
      showPopup.value = false
      isLoading.value = false
    }

    function cancel() {
      showPopup.value = false
      isLoading.value = false
      fileLists.value = []
      imageUrl.value = ''
    }

    const fileLists = ref<
      {
        uid: number
        name: string
        status: string
        url: string
        thumbUrl: string
      }[]
    >()

    function handleChange(info: any) {
      let fileList = [...info.fileList]

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1)

      // 2. read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url
        }
        return file
      })
      fileLists.value = fileList
      info.fileList = fileList

      if (info.fileList.length > 1) {
        return false
      }

      if (info.file.status === 'uploading') {
        loading.value = true
        // console.log('status: ', info.file.status)
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url: any) => {
          imageUrl.value = url
          // console.log(imageUrl.value)
          // imageUrl.value = url
          // loading.value = false
          // form.displayImg = imageUrl.value
          form.displayImg = imageUrl.value
          loading.value = false
        })
        // console.log('statusdone: ', info.file.status)
        // console.log('img: ', imageUrl)
      }
    }

    function handleRemove() {
      fileLists.value = []
    }
    function beforeUpload(file: any) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        $message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        $message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }

    function getBase64(img: any, callback: any) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    }

    function fetchAPI() {
      return context.root.$axios
        .get('Auth/Profile', {})
        .then((res: any) => {
          data.value = res.data as AccountForm
          if (data !== null) {
            form.displayName = data.value?.displayName
            form.displayImg = data.value?.displayImg
            form.firstnameTh = data.value?.firstnameTh
            form.lastnameTh = data.value?.lastnameTh
            form.firstnameEn = data.value?.firstnameEn
            form.lastnameEn = data.value?.lastnameEn
            form.email = data.value?.email
            form.mobile = data.value?.mobile
            form.citizenId = data.value?.citizenId
            // form.drivingNo = data.value?.drivingNo
            form.personalNo = data.value?.personalNo
            form.passportNo = data.value?.passportNo
            form.company = data.value?.company
          }
        })
        .catch((e: any) => {
          // console.log(e)
          const modal = {
            title: 'มีข้อผิดพลาด',
            content: '',
          }

          if (e.response.status === 400) {
            modal.title = e.response.data.message.th
            modal.content = e.response.data.message.th
          } else {
            modal.title = 'ไม่สำเร็จ'
            modal.content = e.response.data.message.th
          }

          context.root.$error(modal)
        })
        .finally(() => {
          // isConfirmLoading.value = false
        })
    }

    function updateProfile() {
      return context.root.$axios
        .put('Account/Profile/Update', {
          displayName: form.displayName,
          displayImg: form.displayImg,
          firstnameTh: form.firstnameTh,
          lastnameTh: form.lastnameTh,
          firstnameEn: form.firstnameEn,
          lastnameEn: form.lastnameEn,
          email: form.email,
          mobile: form.mobile,
          citizenId: form.citizenId,
          passportNo: form.passportNo,
          // drivingNo: form.drivingNo,
          personalNo: form.personalNo,
          company: form.company,
        })
        .then(() => {
          context.root.$success({
            title: 'บันทึกสำเร็จ',
            content: 'อัพเดทสำเร็จ',
          })
          $auth.fetchUser()
          cancel()
        })
        .catch((e: any) => {
          // console.log(e.response) // eslint-disable-line no-console
          const modal = {
            title: 'มีข้อผิดพลาด',
            content: '',
          }

          if (e.response.status === 400) {
            modal.title = e.response.data.message.th
            modal.content = e.response.data.message.th
          } else {
            modal.title = 'บันทึกไม่สำเร็จ'
            modal.content = e.response.data.message.th
          }

          context.root.$error(modal)
        })
        .then(() => {
          isLoading.value = false
        })
    }

    const isRequired = computed(() => {
      // console.log(this.errors.items.length === 0)
      return !(
        form.citizenId ||
        form.passportNo ||
        // form.drivingNo ||
        form.personalNo
      )
    })
    watch(
      () => showPopup.value,
      () => {
        if (showPopup.value) {
          isLoading.value = true
          fetchAPI()
        }
      }
    )

    onMounted(() => {
      showPopup.value = false
      isLoading.value = false
    })
    return {
      labelCol,
      wrapperCol,
      count,
      user,
      addCount,
      handleLogout,
      showPopup,
      isLoading,
      showProfile,
      update,
      cancel,
      handleChange,
      form,
      fetchAPI,
      isRequired,
      data,
      updateProfile,
      getBase64,
      loading,
      imageUrl,
      beforeUpload,
      fileLists,
      handleRemove,
    }
  },
})
</script>

<style scoped>
@media (max-width: 880px) {
  #headerSignIn {
    display: none;
  }
}
@media (max-width: 350px) {
  #headerFontSize {
    font-size: xx-small;
  }
}
.header-collapse {
  font-size: 16px;
  padding: 4px 0;
}
</style>

<template>
  <div>
    <div
      id="otnotice-0e7f44fd-f92e-4f11-935d-75c94b8e2ed8"
      class="otnotice"
    ></div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      script: [
        {
          type: 'text/javascript',
          id: 'otprivacy-notice-script',
          src: 'https://privacyportal-uat-cdn.onetrust.com/privacy-notice-scripts/otnotice-1.0.min.js',
          charset: 'UTF-8',
          defer: true,
        },
        {
          type: 'text/javascript',
          charset: 'UTF-8',
          innerHTML: `OneTrust.NoticeApi.Initialized.then(function() {
            OneTrust.NoticeApi.LoadNotices(["https://privacyportal-uat-cdn.onetrust.com/0ff77d05-b370-4d80-a051-799d0e5cb788/privacy-notices/0e7f44fd-f92e-4f11-935d-75c94b8e2ed8.json"]);
          })`,
        },
      ],
    }
  },
}
</script>

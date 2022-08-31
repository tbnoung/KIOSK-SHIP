<template>
  <div>
    <div
      id="otnotice-d8f5079b-fd64-4105-b529-a9b3896f6720"
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
          charset: 'UTF-8',
          src: 'https://privacyportal-uat-cdn.onetrust.com/privacy-notice-scripts/otnotice-1.0.min.js',
          defer: true,
        },
        {
          type: 'text/javascript',
          charset: 'UTF-8',
          innerHTML: `OneTrust.NoticeApi.Initialized.then(function() {
            OneTrust.NoticeApi.LoadNotices(["https://privacyportal-uat-cdn.onetrust.com/0ff77d05-b370-4d80-a051-799d0e5cb788/privacy-notices/d8f5079b-fd64-4105-b529-a9b3896f6720.json"]);
          })`,
        },
      ],
    }
  },
}
</script>

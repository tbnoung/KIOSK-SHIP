<template>
  <a-dropdown :trigger="['click']" placement="bottomLeft">
    <div
      class="px-3 text-sm uppercase transition-all duration-200 cursor-pointer"
    >
      <font-awesome-icon :icon="['fad', 'database']" />
      <span class="d-none d-xl-inline">
        {{ $t('topBar.projectManagement') }}
      </span>
    </div>
    <a-menu slot="overlay">
      <a-menu-item-group title="Active">
        <a-menu-item>
          <a href="javascript: void(0);">Project Management</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript: void(0);">User Interface Development</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript: void(0);">Documentation</a>
        </a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group title="Inactive">
        <a-menu-item>
          <a href="javascript: void(0);">Marketing</a>
        </a-menu-item>
      </a-menu-item-group>
      <a-menu-divider />
      <a-menu-item>
        <a href="javascript: void(0);">
          <i class="mr-2 fe fe-settings" />
          Settings
        </a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

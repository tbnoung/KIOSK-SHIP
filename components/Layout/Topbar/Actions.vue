<template>
  <a-dropdown :trigger="['click']" placement="bottomLeft">
    <div class="px-3 transition-all duration-200 cursor-pointer">
      <font-awesome-icon :icon="['fad', 'bell']" />
      <a-icon type="down" />
    </div>
    <div slot="overlay">
      <div
        class="relative flex flex-col bg-white border rounded shadow w-72 border-kit-gray-2"
      >
        <div class="px-6 py-5">
          <a-list item-layout="horizontal" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              >
                <a slot="title" href="https://www.antdv.com/">
                  {{ item.title }}
                </a>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </div>
    </div>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const data = [
      {
        title: 'Ant Design Title 1'
      },
      {
        title: 'Ant Design Title 2'
      },
      {
        title: 'Ant Design Title 3'
      },
      {
        title: 'Ant Design Title 4'
      }
    ]

    return {
      data
    }
  }
})
</script>

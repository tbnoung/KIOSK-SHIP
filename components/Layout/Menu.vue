<template>
  <a-menu
    :default-open-keys="defaultOpenKeys"
    :selected-keys="selectedKeys"
    :open-keys.sync="openKeys"
    mode="inline"
    class="border-none"
    theme="light"
    @open-change="handleOpenChange"
  >
    <template v-for="menu in menus">
      <a-sub-menu v-if="menu.childrens" :key="`${menu.name}`">
        <AppMenuSub slot="title" :menu="menu" />
        <a-menu-item v-for="children in menu.childrens" :key="children.name">
          <AppMenuItem :menu="children" />
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="`${menu.name}`">
        <AppMenuItem :menu="menu" />
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  watch,
  useContext,
  computed,
} from '@nuxtjs/composition-api'
import { find, includes, map, filter, forEach, get, cloneDeep } from 'lodash'

export default defineComponent({
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const {
      store: { getters },
      route,
      $auth: { user },
    } = useContext()

    // Function
    function mapMenu(menus: MenuRoute[]) {
      return map(menus, (menu) => {
        if (menu.childrens && menu.hideChildren) {
          delete menu.childrens
        }

        if (menu.childrens) {
          menu.childrens = mapMenu(menu.childrens)
        }

        if (typeof menu.component === 'undefined') {
          if (/^(http)/.test(menu.path)) {
            menu.component = {
              name: 'a',
              props: {
                href: menu.path,
                target: '_blank',
              },
            }
          } else {
            menu.component = {
              name: 'nuxt-link',
              props: {
                to: menu.path,
              },
            }
          }
        }

        return menu
      })
    }
    function accessibleMenu(routes: MenuRoute[]) {
      const menus: MenuRoute[] = []
      const permissions = user.permissions?.permissions

      forEach(routes, (o) => {
        // console.log('!!get(permissions, o.permission)', get(permissions, o.permission), permissions, o.permission)
        if (
          typeof o.permission === 'undefined' ||
          o.permission === null ||
          !!get(permissions, o.permission)
        ) {
          const childrens: MenuRoute[] | undefined = o.childrens
            ? accessibleMenu(o.childrens)
            : undefined

          menus.push({
            ...o,
            childrens,
          })
        }
      })

      return menus
    }
    function visibleMenu(routes: MenuRoute[]) {
      const menus = filter(routes, (o) => !o.hidden)
      return map(menus, (menu) => {
        if (menu.childrens) {
          menu.childrens = visibleMenu(menu.childrens)
        }
        return menu
      })
    }
    function setMenu() {
      // console.log('routes.value', routes.value)
      const filteredMenus = accessibleMenu(visibleMenu(cloneDeep(routes.value)))
      menus.value = mapMenu(filteredMenus)

      updateMenu()
    }
    function openMenu(routes: MenuRoute[]) {
      const menus: MenuRoute[] = []
      const { name } = route.value

      forEach(routes, (o) => {
        if (o.childrens) {
          o.childrens = openMenu(o.childrens)
        }

        if (
          o.defaultOpen ||
          includes(name, o.name) ||
          (o.childrens && o.childrens?.length > 0)
        ) {
          menus.push(o)
        }
      })

      return menus
    }
    function updateMenu() {
      const openRoutes = openMenu(cloneDeep(routes.value))

      const _openKeys: string[] = map(openRoutes, (o) => o.name)
      const _selectedKeys: string[] = []
      const _setSelected = (route?: MenuRoute) => {
        if (!route) return
        if (route?.name) {
          _selectedKeys.push(route.name)
        }

        if (route.childrens) {
          _setSelected(route.children)
        }
      }

      _setSelected(routeTree.value)
      const indexPage =
        _selectedKeys.includes('index') && _selectedKeys.length === 1
      selectedKeys.value = _selectedKeys

      props.collapsed
        ? (cachedOpenKeys.value = _openKeys)
        : (openKeys.value = indexPage ? [] : _openKeys)
    }

    // Ref
    const menus = ref<MenuRoute[]>([])
    const defaultOpenKeys = ref<string[]>(['index', 'work-permit'])
    const selectedKeys = ref<string[]>([])
    const openKeys = ref<string[]>([])
    const cachedOpenKeys = ref<string[]>([])

    const routes = computed<MenuRoute[]>(() => {
      const data = getters['menu-routes/getRoutes'] as MenuRoute[]
      return data
    })
    const routeTree = computed<MenuRoute>(() => {
      return getters['menu-routes/getRouteTree'](route.value)
    })

    // Watch
    watch(
      () => props.collapsed,
      (collapsed) => {
        if (collapsed) {
          openKeys.value = []
        } else {
          openKeys.value = cachedOpenKeys.value
        }
      }
    )
    watch(openKeys, (openKeys) => {
      if (!props.collapsed) {
        cachedOpenKeys.value = openKeys
      }
    })
    watch(route, () => {
      updateMenu()
    })
    watch(
      () => user,
      () => {
        setMenu()
      }
    )

    // Method
    function handleOpenChange(v: any) {
      const latestOpenKey = find(v, (key) => !includes(openKeys.value, key))

      openKeys.value = (latestOpenKey ? [latestOpenKey] : []) as string[]
    }

    onMounted(() => {
      // console.log('onMounted', user)
      setMenu()
    })

    return {
      defaultOpenKeys,
      menus,
      selectedKeys,
      openKeys,
      handleOpenChange,
    }
  },
})
</script>

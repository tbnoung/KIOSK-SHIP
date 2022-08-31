interface MenuRoute {
  path: string
  name: string
  component?:
    | string
    | {
        name: string
        props: {
          to?: string
          href?: string
          target?: string
        }
      }
  meta: {
    title: string | Record<string, string>
    description?: string | Record<string, string>
    icon?:
      | string
      | {
          name?: string
          props?: object
          component?: {
            render: (h: Vue.CreateElement) => Vue.VNode
          }
        }
  }
  defaultOpen?: boolean
  permission?: string | null
  hidden?: boolean
  hideBreadcrumb?: boolean
  hideChildren?: boolean
  children?: MenuRoute
  childrens?: MenuRoute[]
}

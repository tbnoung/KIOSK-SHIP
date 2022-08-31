import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { find, cloneDeep } from 'lodash'
import RouteMap from '@/routes'

function _findRouteTree(
  routes: MenuRoute[],
  route: MenuRoute
): MenuRoute | null {
  const { path, name } = route
  const currentRoute = find(routes, (o) => {
    if (o.path === path || o.name === name) return true
    return o.childrens && _findRouteTree(o.childrens, route)
  }) as MenuRoute

  if (!currentRoute) return null

  if (currentRoute.childrens) {
    const routeChildren: MenuRoute | null = _findRouteTree(
      currentRoute.childrens,
      route
    ) as MenuRoute | null

    if (routeChildren) {
      return {
        ...currentRoute,
        children: routeChildren,
      } as MenuRoute
    }
  }

  delete currentRoute.children
  return currentRoute
}

function _findRouteFromTree(routeTree: MenuRoute | null): MenuRoute | null {
  if (routeTree) {
    if (routeTree.children) return _findRouteFromTree(routeTree.children)
    return routeTree
  }

  return null
}

@Module({
  name: 'menu-routes',
  stateFactory: true,
  namespaced: true,
})
export default class extends VuexModule {
  routes = RouteMap // []
  accessibleRoutes = RouteMap // []

  @Mutation
  setAccessibleRoutes(routes: MenuRoute[]) {
    this.accessibleRoutes = routes
  }

  get getRoutes() {
    return cloneDeep(this.routes)
  }

  get getRouteTree() {
    return (route: MenuRoute) => _findRouteTree(this.routes, route)
  }

  get getRoute() {
    return (route: MenuRoute) => _findRouteFromTree(this.getRouteTree(route))
  }

  get getAccessibleRoutes() {
    return cloneDeep(this.accessibleRoutes)
  }

  get getAccessibleRouteTree() {
    return (route: MenuRoute) => _findRouteTree(this.accessibleRoutes, route)
  }

  get getAccessibleRoute() {
    return (route: MenuRoute) =>
      _findRouteFromTree(this.getAccessibleRouteTree(route))
  }
}

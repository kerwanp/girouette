import 'reflect-metadata'
import { test } from '@japa/runner'
import GirouetteProvider from '../providers/girouette_provider.js'
import app from '@adonisjs/core/services/app'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { HttpRouterService } from '@adonisjs/core/types'
import { HTTP_METHODS, RESOURCE_METHODS, ResourceRoute, Route } from './utils.js'

test.group('GirouetteProvider', async (group) => {
  let CONTROLLERS_PATH = join(cwd(), 'test/controllers')

  let router: HttpRouterService

  let provider: GirouetteProvider

  group.setup(async () => {
    router = await app.container.make('router')

    provider = new GirouetteProvider(app)
  })

  group.each.teardown(() => {
    router.routes = []
  })

  test('should register "group" routes', async ({ assert }) => {
    await provider.start(`${CONTROLLERS_PATH}/group`)

    const routes: Route[] = router.routes.map((r: any) => r.toJSON())

    assert.isTrue(routes.every((r) => r.pattern.startsWith('/posts')))

    assert.isTrue(routes.every((r) => r.domain === 'admin.example.com'))
  })

  test('should register "group_middleware" routes', async ({ assert }) => {
    await provider.start(`${CONTROLLERS_PATH}/group_middleware`)

    const routes: Route[] = router.routes.map((r: any) => r.toJSON())

    assert.isTrue(routes.every((r) => r.pattern.startsWith('/posts')))
  })

  test('should register "methods" routes', async ({ assert }) => {
    await provider.start(`${CONTROLLERS_PATH}/methods`)

    const routes: Route[] = router.routes.map((r: any) => r.toJSON())

    assert.isTrue(routes.every((r) => r.pattern.startsWith('/posts')))

    assert.isTrue(routes.every((r) => r.methods.every((m) => HTTP_METHODS.includes(m))))
  })

  test('should register "resource" routes', async ({ assert }) => {
    await provider.start(`${CONTROLLERS_PATH}/resource`)

    const resourceRoute = router.routes[0] as unknown as ResourceRoute

    const routes: Route[] = resourceRoute.routes.map((r: any) => r.toJSON())

    assert.isTrue(routes.every((r) => r.pattern.startsWith('/posts')))

    assert.isTrue(routes.every((r) => r.methods.every((m) => HTTP_METHODS.includes(m))))

    const controllerMethods: string[] = routes.map((i) => i.handler.reference[1])

    assert.isTrue(controllerMethods.every((r) => RESOURCE_METHODS.includes(r)))
  })

  test('should register "resource_middleware" routes', async ({ assert }) => {
    await provider.start(`${CONTROLLERS_PATH}/resource_middleware`)

    const resourceRoute = router.routes[0] as unknown as ResourceRoute

    const routes: Route[] = resourceRoute.routes.map((r: any) => r.toJSON())

    assert.isTrue(routes.every((r) => r.pattern.startsWith('/posts')))

    assert.isTrue(routes.every((r) => r.methods.every((m) => HTTP_METHODS.includes(m))))

    const controllerMethods: string[] = routes.map((i) => i.handler.reference[1])

    assert.isTrue(controllerMethods.every((r) => RESOURCE_METHODS.includes(r)))
  })

  test('should register "route_middleware" routes', async ({ assert }) => {
    await provider.start(`${CONTROLLERS_PATH}/route_middleware`)

    const routes: Route[] = router.routes.map((r: any) => r.toJSON())

    assert.isTrue(routes.every((r) => r.pattern.startsWith('/posts')))
  })

  test('should register "where" routes', async ({ assert }) => {
    await provider.start(`${CONTROLLERS_PATH}/where`)

    const routes: Route[] = router.routes.map((r: any) => r.toJSON())

    const slugMatcher = (routes[0].matchers.slug as any).match as RegExp

    assert.isFalse(new RegExp(slugMatcher).test('foo~~12312'))

    assert.isTrue(new RegExp(slugMatcher).test('333'))
  })
})

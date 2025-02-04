import { REFLECT_ROUTES_KEY } from '../constants.js'

/**
 * Decorator for applying middleware to a route in AdonisJS v6
 * @param pattern The route pattern
 * @param prefix Optional prefix for the controller
 * @returns A decorator function
 * @example
 * // In an AdonisJS v6 controller:
 * @Controller('/users')
 * export default class UserController {
 *  @Get('/list')
 *  async index({ response }: HttpContext) {
 *    // Handle GET request for /users/list
 *  }
 * }
 */
export const Controller = (pattern: string, prefix?: string) => {
  return (target: any) => {
    const routes = Reflect.getMetadata(REFLECT_ROUTES_KEY, target) || {}

    for (const key in routes) {
      routes[key] = {
        ...routes[key],
        pattern: `${pattern}${routes[key].pattern}`,
        name: routes[key].name && prefix ? `${prefix}.${routes[key].name}` : routes[key].name,
      }
    }

    Reflect.defineMetadata(REFLECT_ROUTES_KEY, routes, target)
  }
}

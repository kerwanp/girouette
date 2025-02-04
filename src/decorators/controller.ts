import { REFLECT_ROUTES_KEY } from '../constants.js'

/**
 * Decorator for applying route to a controller in AdonisJS v6
 * @param pattern The route pattern
 * @param prefix Optional name prefix for the controller
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
export const Group = (pattern: string, prefix?: string) => {
  return (target: any) => {
    const routes = Reflect.getMetadata(REFLECT_ROUTES_KEY, target) || {}

    for (const key in routes) {
      routes[key].pattern = `${pattern}${routes[key].pattern}`
      if (routes[key].name && prefix) routes[key].name = `${prefix}.${routes[key].name}`
    }

    Reflect.defineMetadata(REFLECT_ROUTES_KEY, routes, target)
  }
}

import { REFLECT_GROUP_KEY } from '../constants.js'
import { REFLECT_GROUP_DOMAIN_KEY } from '../constants.js'

/**
 * The Group decorator allows you to define a name prefix for all routes within
 * a controller.
 *
 * @param name Optional name prefix for all routes
 *
 * @example
 * ```ts
 * // With name prefix
 * @Group('admin')
 * export default class AdminController {
 *   @Get('/admin/dashboard')
 *   @Name('dashboard')
 *   index() {
 *     // Route name will be: admin.dashboard
 *   }
 * }
 *
 * // Without name prefix
 * @Group()
 * export default class AdminController {
 *   @Get('/admin/dashboard')
 *   @Name('dashboard')
 *   index() {
 *     // Route name will be: dashboard
 *   }
 * }
 * ```
 */
export const Group = (name?: string) => {
  return (target: any) => {
    Reflect.defineMetadata(REFLECT_GROUP_KEY, { name }, target)
  }
}

/**
 * The GroupDomain decorator allows you to restrict all routes within a controller
 * to a specific domain.
 *
 * @param domain Domain to restrict routes to
 *
 * @example
 * ```ts
 * @GroupDomain('admin.example.com')
 * export default class AdminController {
 *   @Get('/admin/dashboard')
 *   index() {
 *     // Only accessible via admin.example.com
 *   }
 * }
 * ```
 */
export const GroupDomain = (domain: string) => {
  return (target: any) => {
    Reflect.defineMetadata(REFLECT_GROUP_DOMAIN_KEY, domain, target)
  }
}

import { REFLECT_GROUP_KEY } from '../constants.js'
import { REFLECT_GROUP_DOMAIN_KEY } from '../constants.js'

/**
 * The Group decorator allows you to configure route groups with names and prefixes.
 *
 * @param options Configuration object for the group
 *
 * @example
 * ```ts
 * // Using name and prefix
 * @Group({ name: 'admin', prefix: '/admin' })
 * export default class AdminController {}
 *
 * // Using just a name
 * @Group({ name: 'admin' })
 * export default class AdminController {}
 *
 * // Using just a prefix
 * @Group({ prefix: '/admin' })
 * export default class AdminController {}
 * ```
 */
export const Group = (options: { name?: string; prefix?: string }) => {
  return (target: any) => {
    Reflect.defineMetadata(REFLECT_GROUP_KEY, options, target)
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

import { REFLECT_RESOURCE_API_ONLY_KEY } from '../constants.js'

/**
 * The `@ApiOnly` decorator removes the routes which aren't needed for an API resource.
 * (i.e. `create`, `edit`)
 *
 * @example
 * ```ts
 * @Resource('/posts', 'blog.posts')
 * @ApiOnly()
 * export default class PostsController {
 *   // Generates routes:
 *   // GET    /posts          (blog.posts.index)
 *   // POST   /posts          (blog.posts.store)
 *   // GET    /posts/:id      (blog.posts.show)
 *   // PUT    /posts/:id      (blog.posts.update)
 *   // DELETE /posts/:id      (blog.posts.destroy)
 * }
 * ```
 */
export const ApiOnly = () => {
  return (target: any) => {
    Reflect.defineMetadata(REFLECT_RESOURCE_API_ONLY_KEY, true, target)
  }
}

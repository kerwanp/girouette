import {
  REFLECT_RESOURCE_KEY,
  REFLECT_RESOURCE_NAME_KEY,
  REFLECT_RESOURCE_PARAMS_KEY,
} from '../constants.js'

type ResourceOptions =
  | {
      pattern: string
      name?: string
      params?: { [resource: string]: string }
    }
  | string

/**
 * The Resource decorator automatically defines RESTful routes for a controller.
 *
 * @param options - The options for the resource routes.
 * @param options.pattern - The base URL pattern for the resource.
 * @param options.name - The name of the resource, used for route naming.
 * @param options.params - The parameters to rename in the resource routes.
 *
 * @example
 * ```ts
 * @Resource({pattern: '/posts', name: 'blog.posts', params: { posts: 'postId' }})
 * export default class PostsController {
 *   // Generates routes:
 *   // GET    /posts               (blog.posts.index)
 *   // GET    /posts/create        (blog.posts.create)
 *   // POST   /posts               (blog.posts.store)
 *   // GET    /posts/:postId       (blog.posts.show)
 *   // GET    /posts/:postId/edit  (blog.posts.edit)
 *   // PUT    /posts/:postId       (blog.posts.update)
 *   // DELETE /posts/:postId       (blog.posts.destroy)
 * }
 * ```
 * @example
 * ```ts
 * @Resource('/posts')
 * export default class PostsController {
 *   // Generates routes:
 *   // GET    /posts               (posts.index)
 *   // GET    /posts/create        (posts.create)
 *   // POST   /posts               (posts.store)
 *   // GET    /posts/:id           (posts.show)
 *   // GET    /posts/:id/edit      (posts.edit)
 *   // PUT    /posts/:id           (posts.update)
 *   // DELETE /posts/:id           (posts.destroy)
 * }
 * ```
 */
export const Resource = (options: ResourceOptions) => {
  return (target: any) => {
    if (typeof options === 'string') {
      options = { pattern: options }
    }
    Reflect.defineMetadata(REFLECT_RESOURCE_KEY, options.pattern, target)
    if (options.name) {
      Reflect.defineMetadata(REFLECT_RESOURCE_NAME_KEY, options.name, target)
    }
    if (options.params) {
      Reflect.defineMetadata(REFLECT_RESOURCE_PARAMS_KEY, options.params, target)
    }
  }
}

<div align="center">
  <a href="https://discord.gg/UvcuprRbTC">
    <img src="https://dcbadge.vercel.app/api/server/UvcuprRbTC)](https://discord.gg/UvcuprRbTC">
  </a>
</div>

# Girouette

> Elegant decorator-based routing for AdonisJS v6

## Introduction

Girouette provides a beautiful, fluent API for defining your AdonisJS routes using decorators. By bringing route definitions closer to your controller methods, Girouette makes your application's routing more intuitive and maintainable.

## Installation

You can install Girouette via the AdonisJS CLI:

```bash
node ace add @softwarecitadel/girouette
```

## Basic Routing

After installation, you can start using decorators to define your routes. Import the decorators you need in your controller:

```typescript
import {
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Any,
  Middleware,
  ResourceMiddleware,
  GroupMiddleware,
  Resource,
  Where,
  Group,
  GroupDomain,
} from '@softwarecitadel/girouette'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  @Get('/users')
  async index({ response }: HttpContext) {
    // Handle GET request
  }

  @Post('/users')
  async store({ request }: HttpContext) {
    // Handle POST request
  }
}
```

## Route Groups

Girouette provides several decorators for grouping routes:

```typescript
import { Group, GroupMiddleware, GroupDomain } from '@softwarecitadel/girouette'
import { middleware } from '#start/kernel'

@Group('admin') // Name prefix for routes
@GroupMiddleware([middleware.auth()]) // Shared middleware
@GroupDomain('admin.example.com') // Domain restriction
export default class AdminController {
  @Get('/admin/dashboard')
  @Name('dashboard')
  async index() {
    // Route name: admin.dashboard
    // Protected by auth middleware
    // Only accessible via admin.example.com
  }
}
```

Each group decorator can be used independently:

```typescript
// Only name prefix
@Group('api')
export class ApiController {}

// Only middleware
@GroupMiddleware([middleware.auth()])
export class SecureController {}

// Only domain restriction
@GroupDomain('api.example.com')
export class ApiController {}
```

## Route Middleware

You can protect your routes using middleware through the `Middleware` decorator:

```typescript
import { Get, Middleware } from '@softwarecitadel/girouette'
import { middleware } from '#start/kernel'

export default class UsersController {
  @Get('/profile')
  @Middleware([middleware.auth()])
  async show({ auth }: HttpContext) {
    // Only authenticated users can access this route
  }
}
```

## Resource Controllers

For RESTful resources, Girouette provides a `Resource` decorator that automatically defines conventional routes:

```typescript
import { Resource } from '@softwarecitadel/girouette'

@Resource('/posts', 'posts')
export default class PostsController {
  async index() {} // GET /posts
  async create() {} // GET /posts/create
  async store() {} // POST /posts
  async show() {} // GET /posts/:id
  async edit() {} // GET /posts/:id/edit
  async update() {} // PUT/PATCH /posts/:id
  async destroy() {} // DELETE /posts/:id
}
```

## Route Constraints

Use the `Where` decorator to add constraints to your route parameters:

```typescript
import { Get, Where } from '@softwarecitadel/girouette'

export default class PostsController {
  @Get('/posts/:slug')
  @Where('slug', /^[a-z0-9-]+$/)
  async show({ params }: HttpContext) {
    // Only matches if slug contains lowercase letters, numbers, and hyphens
  }
}
```

## Available Decorators

### HTTP Methods

- `@Get(pattern: string, name?: string)`
- `@Post(pattern: string, name?: string)`
- `@Put(pattern: string, name?: string)`
- `@Patch(pattern: string, name?: string)`
- `@Delete(pattern: string, name?: string)`
- `@Any(pattern: string, name?: string)`

### Route Configuration

- `@Group(name?: string)` - Define optional route name prefix
- `@GroupDomain(domain: string)` - Restrict routes to a specific domain
- `@GroupMiddleware(middleware: Middleware[])` - Apply middleware to all routes
- `@Middleware(middleware: Middleware[])` - Apply middleware to a single route
- `@Resource(pattern: string, name?: string)` - Create RESTful resource routes
- `@ResourceMiddleware(actions: string | string[], middleware: Middleware[])` - Apply middleware to resource actions
- `@Where(param: string, matcher: string | RegExp | Function)` - Add route parameter constraints

## Advanced Usage

### Combining Multiple Decorators

Decorators can be combined to create sophisticated routing configurations:

```typescript
import { Get, Middleware, Where } from '@softwarecitadel/girouette'
import { middleware } from '#start/kernel'

@Group('/api')
export default class ArticlesController {
  @Get('/articles/:id')
  @Middleware([middleware.auth()])
  @Where('id', /^\d+$/)
  async show({ params }: HttpContext) {
    // Protected route with parameter validation
  }
}
```

### Resource Middleware

Apply middleware to specific resource actions:

```typescript
import { Resource, ResourceMiddleware } from '@softwarecitadel/girouette'
import { middleware } from '#start/kernel'

@Resource('/admin/posts', 'admin.posts')
@ResourceMiddleware(['store', 'update', 'destroy'], [middleware.auth()])
export default class AdminPostsController {
  // Only store, update, and destroy methods are protected
}
```

## License

Girouette is open-sourced software licensed under the [MIT license](./LICENSE.md).

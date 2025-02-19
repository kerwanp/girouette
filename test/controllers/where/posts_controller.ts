import { Get, Where } from '../../../index.js'

export default class PostsController {
  @Get('/posts/:slug')
  @Where('slug', /^[a-z0-9-]+$/)
  async show() {}
}

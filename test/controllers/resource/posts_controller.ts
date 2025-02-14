import { Resource } from '../../../index.js'
import { HttpContext } from '@adonisjs/core/http'

@Resource('posts', 'posts')
export default class PostsController {
  async index({}: HttpContext) {}

  async store({}: HttpContext) {}

  async show({}: HttpContext) {}

  async update({}: HttpContext) {}

  async destroy({}: HttpContext) {}
}

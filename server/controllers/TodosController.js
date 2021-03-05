import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { todosService } from '../services/TodosService'

export class TodosController extends BaseController {
  constructor() {
    super('api/todos')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
      .put('/:id', this.edit)
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await todosService.edit(req.params.id, req.userInfo.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await todosService.delete(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      res.send(await todosService.find())
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(await todosService.create(req.body))
    } catch (error) {
      next(error)
    }
  }
}

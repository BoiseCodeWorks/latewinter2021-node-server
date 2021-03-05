import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TodosService {
  async edit(id, userId, body) {
    const todo = await dbContext.Todos.findOneAndUpdate({ _id: id, creatorId: userId }, body, { new: true })
    if (!todo) {
      throw new BadRequest('You are not the creator, or that is not the correct todo Id')
    }
    return todo
  }

  async delete(id, userId) {
    const todo = await dbContext.Todos.findOneAndDelete({ _id: id, creatorId: userId })
    if (!todo) {
      throw new BadRequest('You are not the creator, or that is not the correct todo Id')
    }
    return todo
  }

  async find(query = {}) {
    const todos = await dbContext.Todos.find(query).populate('creator', 'name picture')
    return todos
  }

  async findById(id) {
    const todo = await dbContext.Todos.findById(id).populate('creator')
    if (!todo) {
      throw new BadRequest('Invalid Id')
    }
    return todo
  }

  async create(body) {
    return await dbContext.Todos.create(body)
  }
}

export const todosService = new TodosService()

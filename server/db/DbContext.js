import mongoose from 'mongoose'
import TodoSchema from '../models/Todo'
import AccountSchema from '../models/Account'

class DbContext {
  Todos = mongoose.model('Todo', TodoSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()

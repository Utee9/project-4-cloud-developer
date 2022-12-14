// import { TodosAccess } from './todosAcess'
// import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import { APIGatewayProxyEvent } from 'aws-lambda'
// import { getUserId } from '../lambda/utils'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createTodo, getTodoById } from '../dataLayer/todosAcess'
import { TodoUpdate } from '../models/TodoUpdate'
// import * as createError from 'http-errors'

const logger = createLogger('todos')

// // TODO: Implement businessLogic
export async function todoBuilder(todoRequest: CreateTodoRequest, userId: string): Promise<TodoItem>
{
    const todoId = uuid.v4()
    const todo = {
      todoId: todoId,
      userId,
      createdAt: new Date().toISOString(),
      ...todoRequest,
    }
    return await createTodo(todo as TodoItem)
}

export async function updateTodo(todoId: string, todo: UpdateTodoRequest): Promise<TodoUpdate> {

  logger.info('todo was updated', todoId)
  await getTodoById(todoId)

  return todo as TodoUpdate
}

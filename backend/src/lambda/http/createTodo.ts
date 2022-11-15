import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
// import { createTodo } from '../../businessLogic/todos'

// import { createTodo } from '../../dataLayer/todosAcess'
import { todoBuilder } from '../../businessLogic/todos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event)
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item
    const todo = await todoBuilder(newTodo, userId)
    
    return {
      statusCode: 201,
      body: JSON.stringify({
        item:todo
      })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)

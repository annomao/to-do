import TodosAccess  from '../dataLayer/TodosAcess'
import AttachmentUtils  from '../helpers/AttachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'

// TODO: Implement businessLogic
const toDoAccess = new TodosAccess();
const attachment = new AttachmentUtils();
const logger = createLogger('BusinessLogic')

export async function getAllTodos(userId: string): Promise<TodoItem[]>{

    return await toDoAccess.getTodos(userId);
}

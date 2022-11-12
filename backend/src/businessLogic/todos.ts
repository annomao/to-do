import TodosAccess  from '../dataLayer/TodosAcess'
import AttachmentUtils  from '../helpers/AttachmentUtils'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as createError from 'http-errors'

const uuidv4 = require('uuid/v4');
// TODO: Implement businessLogic
const toDoAccess = new TodosAccess();
const attachment = new AttachmentUtils();
const logger = createLogger('BusinessLogic')

export async function getAllTodos(userId: string): Promise<TodoItem[]>{
    logger.info("getting to do items")
    return await toDoAccess.getTodos(userId);
}

export async function createTodoItem(userId: string, todoItem: CreateTodoRequest): Promise<TodoItem>{
    logger.info("creating new item")
    const todoId =  uuidv4();
    const timeStamp = new Date().toISOString()
    const url = attachment.getAttachmentUrl(todoId)

    const newTodo = {
        todoId: todoId,
        userId: userId,
        createdAt: timeStamp,
        done: false,
        attachmentUrl: url,
        ...todoItem
      }
    
    return await toDoAccess.createTodo(newTodo);
}

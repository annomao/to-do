import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

const AWSXRay = require('aws-xray-sdk')

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic
class TodosAccess {
    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly todosTable = process.env.TODOS_TABLE,
        private readonly todosIndex = process.env.TODOS_CREATED_AT_INDEX
    ) {}
    
    async getTodos(userId: string): Promise<TodoItem[]> {
        logger.info('Get all todos for specific user function running')

        const params = {
            TableName: this.todosTable,
            IndexName: this.todosIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
            ':userId': userId
            }
        }
    
        const result = await this.docClient.query(params).promise()
    
        return result.Items as TodoItem[]
    }
    
    async createTodo(todoItem: TodoItem): Promise<TodoItem> {
        logger.info('Create a todo item function running')

        const params = {
            TableName: this.todosTable,
            Item: todoItem
        }
    
        const result = await this.docClient.put(params).promise()
        logger.info('Todo item created', result)
    
        return todoItem as TodoItem
    }
    
    async updateTodo(todoId: string, userId: string, todoUpdate: TodoUpdate): Promise<void> {
        logger.info('Update todo item function running')

        const params = {
            TableName: this.todosTable,
            Key: {
            todoId,
            userId
            },
            UpdateExpression: 'set #name = :name, #dueDate = :dueDate, #done = :done',
            ExpressionAttributeValues: {
            ':name': todoUpdate.name,
            ':dueDate': todoUpdate.dueDate,
            ':done': todoUpdate.done
            },
            ExpressionAttributeNames: {
            '#name': 'name',
            '#dueDate': 'dueDate',
            '#done': 'done'
            },
            ReturnValues: "NONE"
        }
    
        await this.docClient.update(params).promise()
    }
    
    async deleteTodo(todoId: string, userId: string): Promise<void> {
        logger.info('Delete todo item function running')

        const params = {
            TableName: this.todosTable,
            Key: {
            todoId,
            userId
            }
        }
    
        await this.docClient.delete(params).promise()
    }
    
}

export default TodosAccess
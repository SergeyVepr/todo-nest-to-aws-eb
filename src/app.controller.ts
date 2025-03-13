import {
    Body, Controller, Delete, Get, Param, Patch, Post, Put, NotFoundException, BadRequestException
} from '@nestjs/common';
import { AppService, Todo } from './app.service';
import { CreateTodoDto } from './create-todo.dto';

@Controller('/todos')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post()
    createTodo(@Body() createTodoDto: CreateTodoDto): Todo {
        if (!createTodoDto.title || !createTodoDto.description) {
            throw new BadRequestException('Title and description are required');
        }
        return this.appService.createTodo(createTodoDto);
    }

    @Get()
    getAllTodos(): Todo[] {
        return this.appService.getAllTodos();
    }

    @Put(':id')
    updateTodo(@Param('id') id: string, @Body() updateData: Partial<CreateTodoDto>): Todo {
        const result = this.appService.updateTodo(+id, updateData);
        if (!result) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        return result;
    }

    @Patch(':id')
    updateCompleted(@Param('id') id: string, @Body() completed: boolean): Todo {
        const result = this.appService.updateCompleted(+id, completed);
        if (!result) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        return result;
    }

    @Delete(':id')
    deleteCompleted(@Param('id') id: string): { message: string } {
        const success = this.appService.removeTodo(+id);
        if (!success) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }
        return { message: 'Deleted' };
    }
}
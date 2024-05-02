import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async addTask(@Body('name') name: string, @Body('userId') userId: string, @Body('priority') priority: number){
        return await this.taskService.addTask(name, userId, priority);
    }

    @Get('/user/:userId')
    async getUserTasks(@Param('userId') userId: string){
        return await this.taskService.getUserTasks(userId);
    }

    @Get(':name')
    async getTaskByName(@Param('name') name: string){
        return await this.taskService.getTaskByName(name);
    }

    @Delete()
    async resetData(){
        return await this.taskService.resetData();
    }
}

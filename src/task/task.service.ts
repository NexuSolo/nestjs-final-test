import { HttpException, Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { Task } from './task.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
    constructor(        
        @Inject('TASKS_REPOSITORY')
        private tasksRepository: typeof Task,
        private userService: UserService) {}

    async addTask(name: string, userId: number, priority: number): Promise<Task> {
        try {
            if(isNaN(userId) || isNaN(priority)) {
                throw new HttpException('userId ou priority invalide', 400);
            }
            const user = await this.userService.getUserById(userId);
            if(!user || priority < 0 || name === null || name === "" ) {
                throw new HttpException('tache invalide', 400);
            }
            return await this.tasksRepository.create({ name, userId, priority });
        } catch (error) {
            throw new HttpException('Erreur', 400);
        }
    }

    async getTaskByName(name: string): Promise<unknown> {
        try {
            return await this.tasksRepository.findOne({ where: { name } });
        } catch (error) {
            throw new HttpException('Erreur', 400);
        }
    }

    async getUserTasks(userId: number): Promise<Task[]> {
        try {
            if(isNaN(userId)) {
                throw new HttpException('userId est invalide', 400);
            }
            const user = await this.userService.getUserById(userId);
            if(!user){
                throw new HttpException('userId est invalide', 400);
            }
            return await this.tasksRepository.findAll({ where: { userId : Number } });
        } catch (error) {
            throw error;
        }
    }

    async resetData(): Promise<void> {
        try {
            await this.tasksRepository.destroy({ where: {}, truncate: true });
        } catch (error) {
            throw new HttpException('Erreur', 400);
        }
    }
}

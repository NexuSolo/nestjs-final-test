import { HttpException, Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { Task } from './task.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
    constructor(        
        @Inject('TASKS_REPOSITORY')
        private tasksRepository: typeof Task,
        private userService: UserService) {}

    async addTask(name: string, userId: string, priority: number): Promise<void> {
        try {
            const user = await this.userService.getUserById(userId);
            if(!user || priority < 0 || name === "" || name === null){
                throw new HttpException('tache invalide', 400);
            }
            await this.tasksRepository.create({ name, userId, priority });
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

    async getUserTasks(userId: string): Promise<unknown[]> {
        const user = await this.userService.getUserById(userId);
        if(!user){
            throw new HttpException('userId est invalide', 400);
        }
        try {
            return await this.tasksRepository.findAll({ where: { userId } });
        } catch (error) {
            throw new HttpException('Erreur', 400);
        }
    }

    async resetData(): Promise<void> {
        try {
            await this.tasksRepository.destroy({ where: {}, truncate: true });
            console.log("Toutes les tâches ont été supprimées");
        } catch (error) {
            throw new HttpException('Erreur', 400);
        }
    }
}

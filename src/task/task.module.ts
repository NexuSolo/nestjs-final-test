import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { tasksProviders } from './task.providers';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [DatabaseModule, UserModule],
    providers: [TaskService, ...tasksProviders],
    controllers: [TaskController],
})
export class TaskModule {}
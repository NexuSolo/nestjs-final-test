import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from 'src/task/task.model';
import { User } from 'src/user/user.model';

@Module({
    imports: [SequelizeModule.forFeature([User, Task])],
    exports: [SequelizeModule],
})
export class DatabaseModule {}

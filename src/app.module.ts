import { SequelizeModule } from '@nestjs/sequelize';
import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { Task } from './task/task.model';
import { User } from './user/user.model';

@Module({
    imports: [AppRoutingModule, ConfigurationModule, DatabaseModule,
        SequelizeModule.forRoot({
        dialect: 'postgres',
        host: 'postgres',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        models: [User, Task],
      }),
    ],
})
export class AppModule {}

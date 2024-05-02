import { SequelizeModule } from '@nestjs/sequelize';
import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
    imports: [AppRoutingModule, DatabaseModule, UserModule, TaskModule, ConfigurationModule],
    providers: [DatabaseModule],
    exports: [DatabaseModule],
})
export class AppModule {}

import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/user/user.entity';
import { Task } from 'src/task/task.entity';


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 24000,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
      });
      sequelize.addModels([User, Task]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
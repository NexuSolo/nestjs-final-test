import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { ValidationError } from 'sequelize';

@Injectable()
export class UserService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof User,
    ) { }

    async addUser(email: string): Promise<User> {
        try {
            const user = await this.getUser(email);
            if (user) {
                throw new HttpException('L\'utilisateur existe déjà', 409);
            }
            return await this.usersRepository.create({ email });
        } catch (err) {
            if (err instanceof ValidationError) {
                throw new HttpException('Email invalide', HttpStatus.BAD_REQUEST);
            }
            throw err;
        }
    }

    async getUser(email: string): Promise<User | null> {
        try {
            const user = await this.usersRepository.findOne({ where: { email } });
            if (!user) {
                return null;
            }
            return user;
        } catch (err) {
            throw err;
        }
    }

    async resetData(): Promise<void> {
        try {
            await this.usersRepository.destroy({ where: {}, truncate: true });
        } catch (err) {
            throw err;
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            return await this.usersRepository.findOne({ where: { id } });
        } catch (err) {
            throw err;
        }
    }
}

import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof User,
    ) {}

    async addUser(email: string): Promise<User> {
        try {
            const user = await this.getUser(email);
            if (user) {
                throw new HttpException('L\'utilisateur existe déjà', 409);
            }
        } catch (err) {
            throw err;
        }
        try {
            return await this.usersRepository.create({ email });
        } catch (err) {
            throw new HttpException('Email invalide', HttpStatus.BAD_REQUEST);
        }
    }

    async getUser(email: string): Promise<User | null> {
        try {
            const user = await this.usersRepository.findOne({ where: { email } });
            if (!user) {
                console.log("L'utilisateur: " + email + " n'existe pas");
                return null;
            }
            console.log("L'utilisateur " + user.email + " existe avec l'id: " + user.id);
            return user;
        } catch (err) {
            throw err;
        }
    }

    async resetData(): Promise<void> {
        try {
            await this.usersRepository.destroy({ where: {}, truncate: true });
            console.log("Tous les utilisateurs ont été supprimés");
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

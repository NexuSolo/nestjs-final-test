import { Injectable, ConflictException, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) {}

    async addUser(email: string): Promise<void> {
        try {
            await this.userModel.create({ email });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getUser(email: string): Promise<User> {
        try {
            const user = await this.userModel.findOne({ where: { email } });
            return user;
        } catch (err) {
            throw err;
        }
    }

    async resetData(): Promise<void> {
        return null;
    }
}

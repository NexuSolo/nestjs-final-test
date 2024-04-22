import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async addUser(@Body('email') email: string): Promise<void> {
        try {
            await this.userService.addUser(email);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}

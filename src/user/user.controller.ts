import { Controller, Post, Body, BadRequestException, Get, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async addUser(@Body('email') email: string) {
        return await this.userService.addUser(email);
    }

    @Get(':email')
    async getUser(@Param('email') email: string) {
        return await this.userService.getUser(email);
    }

    @Delete()
    async resetData() {
        return await this.userService.resetData();
    }
}

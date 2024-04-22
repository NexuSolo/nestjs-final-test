import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class UserService {
    private users: string[] = [];

    async addUser(email: string): Promise<void> {
        if (!this.isValidEmail(email)) {
            throw new BadRequestException('Invalid email format');
        }
        
        if (this.users.includes(email)) {
            throw new ConflictException('User already exists');
        }
        this.users.push(email);
    }

    private isValidEmail(email: string): boolean {
        // Expression régulière pour vérifier le format de l'email
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async getUser(email: string): Promise<string> {
        const user = this.users.find(u => u === email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async resetData(): Promise<void> {
        this.users = [];
    }
}

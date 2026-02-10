import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, SafeUser } from './entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async register(email: string, password: string): Promise<SafeUser> {
        const passwordHash = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            email,
            passwordHash,
        })

        const savedUser = await this.userRepository.save(user);

        return {
            id: savedUser.id,
            email: savedUser.email,
            createdAt: savedUser.createdAt,
        }
    }

    async login(email: string, password: string): Promise<SafeUser> {
        const user = await this.userRepository.findOne({ where : { email }});

        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if(!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
        }
    }
}

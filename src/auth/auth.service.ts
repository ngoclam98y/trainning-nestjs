import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { ResponseLogin } from './dto/responseLogin.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }
    async validateUser({ email, password }: AuthDto): Promise<User> {
        const user = await this.userService.findByEmail({ email });
        if (!user) {
            throw new UnauthorizedException('Username or password is incorrect');
        }
        const compareResult = await compare(password, user.password);

        if (!compareResult) {
            throw new UnauthorizedException('Username or password is incorrect');
        }

        return user;
    }

    async login(loginDto: AuthDto): Promise<ResponseLogin> {
        try {
            const user = await this.validateUser(loginDto);

            const payload = {
                email: user.email,
                userName: user.userName,
                id: user.id,
                roles: user.roles,
                permissions: user.permissions
            };

            const token = await this.jwtService.signAsync(payload, {
                expiresIn: this.configService.get<string>('jwtExpiresIn'),
            });

            return {
                access_token: token,
                user,
            };
        } catch (error) {
            throw new HttpException(
                'Wrong credentials provided',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}

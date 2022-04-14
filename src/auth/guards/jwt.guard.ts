import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VerifyToken implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers.authorization;
        if (accessToken) {
            const isAccessToken =
                accessToken.split('Bearer ') && accessToken.split('Bearer ')[1];
            if (isAccessToken) {
                try {
                    const user = await this.jwtService.verifyAsync(
                        isAccessToken,
                        this.configService.get('jwtSecret'),
                    );
                    request.user = user;
                    return request;
                } catch (error) {
                    return error;
                }
            }
        }
        return false;
    }
}
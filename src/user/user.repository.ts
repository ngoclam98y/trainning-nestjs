import { EntityRepository, Repository } from 'typeorm';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async getResetPassword(resetPasswordToken: string): Promise<User> {
        const result = await this.createQueryBuilder('user')
            .where("user.resetPasswordToken = :resetPasswordToken", { resetPasswordToken })
            .andWhere("user.resetPasswordExpires > :dateNow", { dateNow: new Date() })
            .select(['user.id', 'user.userName', 'user.email', 'user.resetPasswordToken', 'user.resetPasswordExpires'])
            .getOne();

        return result;
    }


    async updatePassword(token: string, resetPasswordDto: ResetPasswordDto): Promise<boolean> {
        const { id, password } = resetPasswordDto;
        const user = await this.getResetPassword(token);
        if (!user)
            return !!user;
        const result = await this.createQueryBuilder('user')
            .update(User)
            .set({ password })
            .where("id = :id", { id })
            .execute();

        return !!result;
    }

}
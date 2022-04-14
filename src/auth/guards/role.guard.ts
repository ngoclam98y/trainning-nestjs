import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Roles } from 'src/user/interfaces/Permission';

const RoleGuard = (role: Roles): Type<CanActivate> => {
    class RoleGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            return user?.roles.includes(role);
        }
    }

    return mixin(RoleGuardMixin);
};

export default RoleGuard;
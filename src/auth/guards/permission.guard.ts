import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Permission } from 'src/user/interfaces/Permission';

const PermissionGuard = (permission: Permission): Type<CanActivate> => {
    class PermissionGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            console.log(user);

            return user?.permissions.includes(permission);
        }
    }

    return mixin(PermissionGuardMixin);
};

export default PermissionGuard;
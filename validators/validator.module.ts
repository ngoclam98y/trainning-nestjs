import { Global, Module } from '@nestjs/common';
import { UserHttpModule } from '../src/user/user-http.module';
import { UniqueEmaillValidator } from './unique-email.validator';

@Global()
@Module({
    imports: [
        UserHttpModule
    ],
    providers: [
        UniqueEmaillValidator,
    ],
    exports: [
        UniqueEmaillValidator,
    ],
})
export class ValidatorModule {
}
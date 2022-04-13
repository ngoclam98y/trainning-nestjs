import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    UpdateEvent
} from 'typeorm';
import { User } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    private readonly bcryptSalt: number;

    constructor(
        connection: Connection,
        private readonly configService: ConfigService,
    ) {
        connection.subscribers.push(this);
        this.bcryptSalt = this.configService.get<number>('bcryptSalt');
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-types
    listenTo(): string | Function {
        return User;
    }

    async beforeInsert(event: InsertEvent<User>): Promise<void> {
        const { password } = event.entity;
        event.entity.password = await bcrypt.hash(password, this.bcryptSalt);
    }

    async beforeUpdate(event: UpdateEvent<User>): Promise<void> {
        const { password } = event.entity;
        if (password) {
            event.entity.password = await bcrypt.hash(password, this.bcryptSalt);
        }
    }
}
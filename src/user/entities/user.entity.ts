import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Permission, Roles } from '../interfaces/Permission';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userName: string

    @Column()
    @Unique(['email'])
    email: string

    @Column()
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column()
    picture: string;

    @Column({
        nullable: true
    })
    googleId?: string;


    @Column({
        nullable: true
    })
    githubId?: string;


    @Column({
        nullable: true
    })
    @Exclude({ toPlainOnly: true })
    resetPasswordToken: string;


    @Column({
        nullable: true
    })
    @Exclude({ toPlainOnly: true })
    resetPasswordExpires: Date;

    @Column({
        type: 'enum',
        enum: Roles,
        default: [Roles.User]
    })
    @Exclude({ toPlainOnly: true })
    roles: Roles;

    @Column({
        type: 'set',
        enum: Permission,
        default: []
    })
    @Exclude({ toPlainOnly: true })
    permissions: Permission[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date

    constructor(partial: Partial<User>) {
        super()
        Object.assign(this, partial)
    }
}

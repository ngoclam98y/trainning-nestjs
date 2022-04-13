import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { Permission, Roles } from "../interfaces/Permission";

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    userName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsOptional()
    picture: string;

    @ApiProperty()
    @IsOptional()
    googleId: string;

    @ApiProperty()
    @IsOptional()
    githubId: string;

    @ApiProperty({
        enum: Roles,
        isArray: true,
        example: [Roles.Admin, Roles.User],
    })
    @IsOptional()
    roles: Roles;

    @ApiProperty({
        enum: Permission,
        isArray: true,
        example: [Permission.ActiveUser, Permission.DeleteUser, Permission.InactiveUser, Permission.UpdateUser],
    })
    @IsOptional()
    permissions: Permission[];

}

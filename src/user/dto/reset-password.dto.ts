import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    password: string;
}
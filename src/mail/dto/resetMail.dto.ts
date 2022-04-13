import { ApiProperty } from "@nestjs/swagger";

export class ResetMailDto {

    @ApiProperty()
    email: string;
}
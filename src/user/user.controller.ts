import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get()
  @ApiResponse({ status: 200, description: 'The record has been successfully get.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })

  async index(): Promise<User[]> {
    return this.userService.index();
  }

  @Get("/reset-password/:token")
  async getResetPassword(@Param('token') token: string): Promise<User> {
    return this.userService.getResetPassword(token);
  }


  @Patch("/reset-password/:token")
  async updatePassword(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDto): Promise<boolean> {
    return this.userService.updatePassword(token, resetPasswordDto);
  }


  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() userData: CreateUserDto): Promise<User> {
    const createdUser = await this.userService.store(userData);
    return plainToClass(User, createdUser);
  }

  @Patch("/:id")
  @ApiParam({ name: 'id', required: true, description: 'update folow id user', schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] } })
  async update(@Body() userData: UpdateUserDto, @Param() id: number): Promise<User> {
    const createdUser = await this.userService.update(id, userData);
    return plainToClass(User, createdUser);
  }


  @Delete("/:id")
  @ApiParam({ name: 'id', required: true, description: 'delete folow id user', schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] } })
  async delete(@Param() id: number): Promise<User> {
    const createdUser = await this.userService.delete(id);
    return plainToClass(User, createdUser);
  }
}

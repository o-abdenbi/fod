import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterResponse } from './types/user.types';
import { RegisterDto } from './dto/user.dto';

@Resolver('User')
//@UseFilters(new ValidationPipe())
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
  ): Promise<RegisterResponse> {
    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('Please fill all fields');
    }

    const user = await this.userService.register(registerDto);
    return { user };
  }
}

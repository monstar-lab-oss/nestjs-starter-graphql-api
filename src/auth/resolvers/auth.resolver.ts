import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { RegisterInput } from '../dtos/auth-register-input.dto';
import { RegisterOutput } from '../dtos/auth-register-output.dto';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => RegisterOutput, {
    name: 'register',
  })
  async registerLocal(
    @Args('input') input: RegisterInput,
  ): Promise<RegisterOutput> {
    return await this.authService.register(input);
  }
}

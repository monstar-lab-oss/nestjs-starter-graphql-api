import { registerEnumType } from '@nestjs/graphql';

export enum ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(ROLE, {
  name: 'ROLE',
});

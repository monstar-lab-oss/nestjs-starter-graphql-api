import { Expose } from 'class-transformer';

import { ROLE } from '../../auth/constants/role.constant';

export class UserOutput {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  username: string;

  @Expose()
  roles: ROLE[];

  @Expose()
  email: string;

  @Expose()
  isAccountDisabled: boolean;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}

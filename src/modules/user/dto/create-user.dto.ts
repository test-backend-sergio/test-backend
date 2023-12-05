import { Person } from '@prisma/client';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  persons?: Person[];
  createdAt: Date;
  updatedAt: Date;
}

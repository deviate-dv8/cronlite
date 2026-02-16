import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userExist = await this.users.findOneBy({
      email: createUserDto.email,
    });
    if (userExist) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await argon2.hash(createUserDto.password);
    const newUser = this.users.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.users.save(newUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

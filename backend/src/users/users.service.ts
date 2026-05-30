

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validateEmail, validateName } from '../utils/validations';

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: 1,
            name: 'Juan Pérez',
            email: 'juan@test.com',
            role: 'admin',
        },
        {
            id: 2,
            name: 'María Soto',
            email: 'maria@test.com',
            role: 'user',
        },
    ];

    findAll(role?: string): User[] {
        if (role) {
            return this.users.filter((user) => user.role === role);
        }

        return this.users;
    }

    findOne(id: number): User {
        const user = this.users.find((user) => user.id === id);

        if (!user) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }

        return user;
    }

    create(createUserDto: CreateUserDto): User {

        if( !validateEmail(createUserDto.email) ) {
            throw new BadRequestException('El formato del correo electrónico no es válido');
        }

        if( !validateName(createUserDto.name) ) {
            throw new BadRequestException('El formato del nombre no es válido');
        }

        const newUser: User = {
            id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
            ...createUserDto,
        };

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto): User {
        const user = this.findOne(id);

        const updatedUser = { ...user, ...updateUserDto };

        this.users = this.users.map((item) =>
            item.id === id ? updatedUser : item,
        );

        return updatedUser;
    }

    remove(id: number): { message: string } {
        const userExists = this.users.some((user) => user.id === id);

        if (!userExists) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }

        this.users = this.users.filter((user) => user.id !== id);

        return {
            message: `Usuario con id ${id} eliminado correctamente`,
        };
    }
}

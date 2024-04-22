import { AllowNull, Column, IsEmail, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
    @AllowNull(false)
    @IsEmail
    @Column
    email: string;
}
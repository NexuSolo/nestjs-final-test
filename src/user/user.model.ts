import { AllowNull, Column, IsEmail, Model, Table, Unique } from 'sequelize-typescript';


@Table
export class User extends Model {
    @AllowNull(false)
    @Unique(true)
    @IsEmail
    @Column
    email: string;
}
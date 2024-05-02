import { AllowNull, AutoIncrement, Column, IsEmail, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';


@Table
export class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Unique(true)
    @Column
    id: number;

    @AllowNull(false)
    @Unique(true)
    @IsEmail
    @Column
    email: string;
}
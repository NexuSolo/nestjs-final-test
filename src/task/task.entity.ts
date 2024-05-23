import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table
export class Task extends Model {
    @AllowNull(false)
    @Column
    userId: number;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    priority: number;
}
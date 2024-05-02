import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table
export class Task extends Model {
    @AllowNull(false)
    @Column
    userId: string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    priority: number;
}
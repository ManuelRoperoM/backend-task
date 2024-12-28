import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TasksEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    title: string;
    @Column({nullable: true})
    description: string;
    @Column()
    completed: boolean;
    @Column({type: Date})
    createdAt: Date;

}
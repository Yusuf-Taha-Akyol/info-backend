import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export enum FileType {
  PDF = 'pdf',
  IMAGE = 'image',
  TEXT = 'text',
  LINK = 'link',
}

@Entity('files')
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ownerId: number;

    @Column({
        type: 'enum',
        enum: FileType,
    })
    type: FileType;

    @Column()
    size: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column('simple-array', { nullable: true})
    tags?: string[];
}
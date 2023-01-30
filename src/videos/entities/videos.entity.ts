import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Videos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  url: string;

  @Column()
  @IsString()
  title: string;
}

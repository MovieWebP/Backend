import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  url: string;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsNumber()
  movieId: number;
}

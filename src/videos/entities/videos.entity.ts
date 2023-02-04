import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @ApiProperty({
    type: String,
    // url = http://127.0.0.1:3005/video/movie/ + movieId + / + title
    description: 'url of movie video',
  })
  url: string;

  @Column()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'title of movie video',
  })
  title: string;

  @Column()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'id of movie video',
  })
  movieId: number;

  @Column()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'image path of movie video',
  })
  backdrop_path: string;
}

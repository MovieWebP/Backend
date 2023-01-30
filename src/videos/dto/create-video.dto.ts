import { IsNumber, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dto/core.dto';
import { Video } from '../entities/videos.entity';

export class CreateVideoInput {
  @IsString()
  url: string;

  @IsString()
  title: string;

  @IsNumber()
  movieId: number;
}

export class CreateVideoOutput extends CoreOutput {
  video?: Video;
}

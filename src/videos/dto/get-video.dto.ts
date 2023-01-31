import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dto/core.dto';
import { Video } from '../entities/videos.entity';

export class GetVideoInput {
  @IsNumber()
  @ApiProperty({ type: Number })
  movieId: number;
}

export class GetVideoOutput extends CoreOutput {
  @IsString()
  @ApiProperty({ type: String })
  message?: string;

  @ApiProperty({ type: Video })
  video?: Video;
}

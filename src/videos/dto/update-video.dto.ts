import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dto/core.dto';
import { Video } from '../entities/videos.entity';
import { CreateVideoInput } from './create-videos.dto';

export class UpdateVideoInput extends PartialType(CreateVideoInput) {
  @ApiProperty({ type: Number })
  @IsNumber()
  videoId: number;
}

export class UpdateVideoOutput extends CoreOutput {
  video?: Video;
}

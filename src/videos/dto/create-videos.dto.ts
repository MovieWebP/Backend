import { OmitType, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dto/core.dto';
import { Video } from '../entities/videos.entity';

export class CreateVideoInput extends PartialType(
  OmitType(Video, ['id'] as const),
) {}

export class CreateVideoOutput extends CoreOutput {
  video?: Video;
}

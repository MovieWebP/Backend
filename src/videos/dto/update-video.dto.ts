import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dto/core.dto';
import { Video } from '../entities/videos.entity';

export class UpdateVideoInput extends PickType(Video, ['id']) {}

export class UpdateVideoOutput extends CoreOutput {
  video?: Video;
}

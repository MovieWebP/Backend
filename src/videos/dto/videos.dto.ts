import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/core.dto';
import { Video } from '../entities/videos.entity';

export class VideosInput {
  @ApiProperty({ type: Number, default: 1 })
  page: number;
}

export class VideosOutput extends CoreOutput {
  totalPages?: number;
  totalResults?: number;
  results?: Video[];
}

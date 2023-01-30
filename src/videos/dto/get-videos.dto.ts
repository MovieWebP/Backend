import { CoreOutput } from 'src/common/dto/core.dto';
import { Video } from '../entities/videos.entity';

export class GetVideosOutput extends CoreOutput {
  videos?: Video[];
}

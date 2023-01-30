import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Video } from './entities/videos.entity';
import { Repository } from 'typeorm';
import { CreateVideoInput, CreateVideoOutput } from './dto/create-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video) private readonly videos: Repository<Video>,
  ) {}

  async createVideo(
    createVideoInput: CreateVideoInput,
  ): Promise<CreateVideoOutput> {
    const exits = await this.videos.findOne({
      where: { movieId: createVideoInput.movieId },
    });
    if (exits) {
      return {
        ok: false,
        error: 'Already exists',
      };
    }
    const video = await this.videos.save(this.videos.create(createVideoInput));
    return {
      ok: true,
      video: video,
    };
  }
}

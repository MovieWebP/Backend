import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Video } from './entities/videos.entity';
import { Repository } from 'typeorm';
import { CreateVideoInput, CreateVideoOutput } from './dto/create-videos.dto';
import { GetVideosOutput } from './dto/get-videos.dto';
import { GetVideoInput, GetVideoOutput } from './dto/get-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video) private readonly videos: Repository<Video>,
  ) {}

  async createVideo({
    title,
    url,
    movieId,
  }: CreateVideoInput): Promise<CreateVideoOutput> {
    try {
      const exits = await this.videos.findOne({
        where: { movieId: movieId },
      });
      if (exits) {
        return {
          ok: false,
          error: 'Already exists',
        };
      }
      const video = await this.videos.save(
        this.videos.create({ title, url, movieId }),
      );
      return {
        ok: true,
        video: video,
      };
    } catch (err) {
      console.log(err);
      return {
        ok: false,
        error: "Can't create video",
      };
    }
  }

  async findAll(): Promise<GetVideosOutput> {
    try {
      const videos = await this.videos.find();
      return {
        // ok: true,
        videos: videos,
      };
    } catch (err) {
      console.log(err);
      return {
        ok: false,
        error: 'Could not get videos',
      };
    }
  }

  async getVideo({ movieId }: GetVideoInput): Promise<GetVideoOutput> {
    try {
      const video = await this.videos.findOne({
        where: { movieId: movieId },
      });
      if (!video) {
        return {
          ok: false,
          error: 'No video found',
        };
      }
      const message = video.title;
      return {
        ok: true,
        message: message,
        video: video,
      };
    } catch (err) {
      console.log(err);
      return {
        ok: false,
        error: 'Could not get video',
      };
    }
  }
}

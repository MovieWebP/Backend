import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Video } from './entities/videos.entity';
import { Repository } from 'typeorm';
import { CreateVideoInput, CreateVideoOutput } from './dto/create-videos.dto';
import { VideosOutput } from './dto/videos.dto';
import { VideoInput, VideoOutput } from './dto/video.dto';
import { UpdateVideoInput, UpdateVideoOutput } from './dto/update-video.dto';
import { DeleteVideoInput, DeleteVideoOutput } from './dto/delete-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video) private readonly videos: Repository<Video>,
  ) {}

  async createVideo(
    createVideoInput: CreateVideoInput,
  ): Promise<CreateVideoOutput> {
    try {
      const exits = await this.videos.findOne({
        where: { movieId: createVideoInput.movieId },
      });
      if (exits) {
        return {
          ok: false,
          error: 'Already exists',
        };
      }
      const video = await this.videos.save(
        this.videos.create(createVideoInput),
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

  async getVideo({ videoId }: VideoInput): Promise<VideoOutput> {
    try {
      const video = await this.videos.findOne({
        where: { id: videoId },
      });
      if (!video) {
        return {
          ok: false,
          error: 'Video not found',
        };
      }

      return {
        ok: true,
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

  async updateVideo(
    updateVideoInput: UpdateVideoInput,
  ): Promise<UpdateVideoOutput> {
    try {
      const video = await this.videos.findOne({
        where: { id: updateVideoInput.videoId },
      });
      if (!video) {
        return {
          ok: false,
          error: 'Video not found',
        };
      }
      await this.videos.save([
        {
          id: updateVideoInput.videoId, // 여기에 videoId를 안넣어주면 새로운 id가 생성됨
          ...updateVideoInput, // 해석하면
        },
      ]);
      return {
        ok: true,
      };
    } catch (err) {
      console.log(err);
      return {
        ok: false,
        error: 'Could not update video',
      };
    }
  }

  async deleteVideo({ videoId }: DeleteVideoInput): Promise<DeleteVideoOutput> {
    try {
      const video = await this.videos.findOne({
        where: { id: videoId },
      });
      if (!video) {
        return {
          ok: false,
          error: 'Video not found',
        };
      }
      await this.videos.delete(videoId);
      return {
        ok: true,
      };
    } catch (err) {
      console.log(err);
      return {
        ok: false,
        error: 'Could not delete video',
      };
    }
  }

  async getVideos(page: number): Promise<VideosOutput> {
    try {
      const [videos, totalResults] = await this.videos.findAndCount({
        take: 25,
        skip: (page - 1) * 25,
      });
      return {
        ok: true,
        results: videos,
        totalResults: totalResults,
        totalPages: Math.ceil(totalResults / 25),
      };
    } catch (err) {
      console.log(err);
      return {
        ok: false,
        error: 'Could not get videos',
      };
    }
  }
}

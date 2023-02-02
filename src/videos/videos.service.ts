import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Video } from './entities/videos.entity';
import { Repository } from 'typeorm';
import { CreateVideoInput, CreateVideoOutput } from './dto/create-videos.dto';
import { GetVideosOutput } from './dto/get-videos.dto';
import { GetVideoInput, GetVideoOutput } from './dto/get-video.dto';
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

  async getVideo({ videoId }: GetVideoInput): Promise<GetVideoOutput> {
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
          ...updateVideoInput,
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

  async findAll(): Promise<GetVideosOutput> {
    try {
      const videos = await this.videos.find();
      return {
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
}

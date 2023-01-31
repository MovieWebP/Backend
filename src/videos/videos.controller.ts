import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { CreateVideoInput, CreateVideoOutput } from './dto/create-videos.dto';
import { GetVideosOutput } from './dto/get-videos.dto';
import { Video } from './entities/videos.entity';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}
  @Get('/all')
  findAll(): Promise<GetVideosOutput> {
    return this.videosService.findAll();
  }

  @Post('/create')
  create(
    @Body() createVideoInput: CreateVideoInput,
  ): Promise<CreateVideoOutput> {
    // return 'This action adds a new video';
    return this.videosService.createVideo(createVideoInput);
  }

  @Get()
  @Render('index') // 해석하면
  getVideo() {
    return { message: 'intern' };
  }
}

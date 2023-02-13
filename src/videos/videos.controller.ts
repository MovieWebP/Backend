import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateVideoInput, CreateVideoOutput } from './dto/create-videos.dto';
import { DeleteVideoInput, DeleteVideoOutput } from './dto/delete-video.dto';
import { UpdateVideoInput, UpdateVideoOutput } from './dto/update-video.dto';
import { VideoInput, VideoOutput } from './dto/video.dto';
import { VideosOutput } from './dto/videos.dto';
import { VideosService } from './videos.service';

@Controller('video')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('/all/:page')
  async getVideos(@Param('page') page: number): Promise<VideosOutput> {
    return this.videosService.getVideos(page);
  }

  @Post('/create')
  create(
    @Body() createVideoInput: CreateVideoInput,
  ): Promise<CreateVideoOutput> {
    // return 'This action adds a new video';
    return this.videosService.createVideo(createVideoInput);
  }

  @Post('/update')
  update(
    @Body() updateVideoInput: UpdateVideoInput,
  ): Promise<UpdateVideoOutput> {
    // return 'This action adds a new video';
    return this.videosService.updateVideo(updateVideoInput);
  }

  @Post('/delete')
  delete(
    @Body() deleteVideoInput: DeleteVideoInput,
  ): Promise<DeleteVideoOutput> {
    return this.videosService.deleteVideo(deleteVideoInput);
  }

  @Post('/get')
  async getVideo(
    @Body() videoInput: VideoInput,
    // @Res() res: Response,
  ): Promise<VideoOutput> {
    // const reply = await ;
    // if (reply.title !== undefined && reply.movieId !== undefined) {
    //   return res.redirect(`/video/movie/${reply.title}/${reply.movieId}`);
    // } else {
    //   return res.redirect(`/video/error/`);
    // }
    return this.videosService.getVideo(videoInput);
  }

  // @Get('/movie/:title/:id')
  // @Render('index')
  // playVideo(@Param('title') title: string, @Param('id') id: number) {
  //   // console.log(typeof id)
  //   return { title: title, id: id };
  // }
  // @Get('/error')
  // error() {
  //   return {
  //     ok: false,
  //     error: 'No video found',
  //   };
  // }
}

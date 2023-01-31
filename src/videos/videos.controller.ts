import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateVideoInput, CreateVideoOutput } from './dto/create-videos.dto';
import { GetVideoInput, GetVideoOutput } from './dto/get-video.dto';
import { GetVideosOutput } from './dto/get-videos.dto';
import { Video } from './entities/videos.entity';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) { }
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

  // @Post(':id/edit')
  // @Render(ViewsPath.ReplyEdit)
  // @UseGuards(new UserGuard())
  // async update(
  //  @Param('id') id: string,
  //  @Body() update: UpdateDto,
  //  @Res() res: Response,
  // ) {
  //  const reply = await this.replyService.update(id, update);
  //  res.redirect(`/topic/${reply.topic_id}#${reply.id}`);
  // }

  @Post('/get')
  async getVideo(@Body() getVideoInput: GetVideoInput, @Res() res: Response) {
    const reply = await this.videosService.getVideo(getVideoInput);
    return res.redirect(`/videos/${reply.title}/${reply.movieId}`);
  }

  @Get('/:title/:id')
  @Render('index')
  playVideo(@Param('title') title: string, @Param('id') id: number) {
    // this.videosService.playVideo();
    return { title: 'jeungei', id: 843794 };
  }
}

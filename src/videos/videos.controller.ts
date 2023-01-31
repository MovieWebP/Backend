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

@Controller('video')
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
    if (reply.title !== undefined && reply.movieId !== undefined) {
      return res.redirect(`/video/movie/${reply.title}/${reply.movieId}`);
    } else {
      return res.redirect(`/video/error/`);
    }
  }

  @Get('/movie/:title/:id')
  @Render('index')
  playVideo(@Param('title') title: string, @Param('id') id: number) {
    // console.log(typeof id)
    return { title: title, id: id };
  }

  @Get('/error')
  error() {
    return {
      ok: false,
      error: 'No video found',
    };
  }
}

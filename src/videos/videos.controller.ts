import { Controller, Get, Post } from '@nestjs/common';

@Controller('videos')
export class VideosController {
  @Get()
  findAll() {
    return 'This action returns all videos';
  }

  @Post('/sad')
  create() {
    return 'This action adds a new video';
  }
}

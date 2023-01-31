import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return 'Hello World!';
  }

  @Get('/hello')
  @Render('index')
  playVideo() {
    // this.videosService.playVideo();
    return { title: 'jeungei', id: 843794 };
  }
}

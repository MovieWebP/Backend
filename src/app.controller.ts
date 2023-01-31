import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    // console.log('Hello World!');
    return 'Hello World!';
  }

  @Get('/hello')
  @Render('index')
  playVideo() {
    // this.videosService.playVideo();
    return { title: 'jeungei', id: 843794 };
  }
}

import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return 'Hello World!';
  }

  @Get('hello')
  @Render('index')
  getHello2() {
    return { message: 'jeungei' };
    // return 'Hello World!';
  }
}

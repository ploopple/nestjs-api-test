import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {
  @Get('/')
  getHello() {
    const msg = `${process.env.MSG}`;
    return { msg };
  }
}

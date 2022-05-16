import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {
  @Get('/api')
  getHello() {
    const msg = `${process.env.MSG}`;
    return { msg };
  }
}

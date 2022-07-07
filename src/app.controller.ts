import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {
  @Get('/')
  getHello() {
    const msg = `${process.env.MSG}`;
    return `
    <html>
    <head>
    <title>one</title>
    </head>
    <body><h1>Hello</h1></body>
    </html>
    `;
  }
}

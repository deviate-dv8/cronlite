import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string } {
    return { message: 'Cronlite API v1.0.0 by DV8' };
  }
}

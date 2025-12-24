import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return {message: "Cronlite API v1.0.0 by DV8}', () => {
      expect(appController.getHello()).toStrictEqual({
        message: 'Cronlite API v1.0.0 by DV8',
      });
    });
  });
});

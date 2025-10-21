import { Test, TestingModule } from '@nestjs/testing';
import { GooglePayController } from './google-pay.controller';

describe('GooglePayController', () => {
  let controller: GooglePayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GooglePayController],
    }).compile();

    controller = module.get<GooglePayController>(GooglePayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

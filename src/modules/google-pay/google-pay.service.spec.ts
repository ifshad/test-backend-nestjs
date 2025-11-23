import { Test, TestingModule } from '@nestjs/testing';
import { GooglePayService } from './google-pay.service';

describe('GooglePayService', () => {
  let service: GooglePayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GooglePayService],
    }).compile();

    service = module.get<GooglePayService>(GooglePayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

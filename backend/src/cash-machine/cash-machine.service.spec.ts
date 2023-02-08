import { Test, TestingModule } from '@nestjs/testing';
import { CashMachineService } from './cash-machine.service';

describe('CashMachineService', () => {
  let service: CashMachineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashMachineService],
    }).compile();

    service = module.get<CashMachineService>(CashMachineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

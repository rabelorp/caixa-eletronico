import { Test, TestingModule } from '@nestjs/testing';
import { CashMachineController } from './cash-machine.controller';
import { CashMachineService } from './cash-machine.service';

describe('CashMachineController', () => {
  let controller: CashMachineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashMachineController],
      providers: [CashMachineService],
    }).compile();

    controller = module.get<CashMachineController>(CashMachineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

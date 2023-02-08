import { Module } from '@nestjs/common';
import { CashMachineService } from './cash-machine.service';
import { CashMachineController } from './cash-machine.controller';

@Module({
  controllers: [CashMachineController],
  providers: [CashMachineService],
})
export class CashMachineModule {}

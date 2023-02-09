import { Module } from '@nestjs/common';
import { CashMachineService } from './cash-machine.service';
import { CashMachineController } from './cash-machine.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CashMachineSchema } from './schemas/balance.schema';

@Module({
  controllers: [CashMachineController],
  providers: [CashMachineService],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Balance',
        schema: CashMachineSchema,
      },
      {
        name: 'Note',
        schema: CashMachineSchema,
      },
      ,
      {
        name: 'CashMachine',
        schema: CashMachineSchema,
      },
    ]),
  ],
})
export class CashMachineModule {}

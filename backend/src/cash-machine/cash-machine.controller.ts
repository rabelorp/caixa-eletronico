import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CashMachineService } from './cash-machine.service';
import { WithdrawDto } from './dto/withdraw.dto';

@Controller('cash-machine')
export class CashMachineController {
  constructor(private readonly cashMachineService: CashMachineService) {}

  @Get('balance/:id')
  balance(@Param('id') id: string) {
    return this.cashMachineService.balance(id);
  }

  @Post('withdraw/')
  withdraw(@Body() withdrawDto: WithdrawDto) {
    return this.cashMachineService.withdraw(withdrawDto);
  }
}

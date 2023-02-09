import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { CashMachineService } from './cash-machine.service';
import { WithdrawDto } from './dto/widthdraw.dto';
import { DepositDto } from './dto/deposit.dto';
import { BalanceDto } from './dto/balance.dto';
// import { DepositCashMachineDto } from './dto/deposit-cashmachine.dto';

@Controller('cash-machine')
export class CashMachineController {
  constructor(private readonly cashMachineService: CashMachineService) {}
  @Post('balance/user/')
  async balance(@Res() response, @Body() balanceDto: BalanceDto) {
    try {
      const balance = await this.cashMachineService.balance(balanceDto);
      return response.status(HttpStatus.OK).json({
        message: 'Saldo em conta',
        balance,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('withdraw/user/')
  async withdraw(@Res() response, @Body() withdrawDto: WithdrawDto) {
    try {
      const withdraw = await this.cashMachineService.withdraw(withdrawDto);
      return response.status(HttpStatus.OK).json({
        message: 'Saque concluído',
        withdraw,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('deposit/user/')
  async depositForUser(@Res() response, @Body() depositDto: DepositDto) {
    try {
      const deposit = await this.cashMachineService.depositForUser(depositDto);
      return response.status(HttpStatus.OK).json({
        message: 'Deposito concluído',
        deposit,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // @Post('deposit/cash-machine')
  // async depositForCashMachine(
  //   @Res() response,
  //   @Body() depositCashMachineDto: DepositCashMachineDto,
  // ) {
  //   try {
  //     const depositCashMachine =
  //       await this.cashMachineService.depositForCashMachine(
  //         depositCashMachineDto,
  //       );
  //     return response.status(HttpStatus.OK).json({
  //       message: 'Deposito concluído',
  //       depositCashMachine,
  //     });
  //   } catch (err) {
  //     return response.status(err.status).json(err.response);
  //   }
  // }
}
